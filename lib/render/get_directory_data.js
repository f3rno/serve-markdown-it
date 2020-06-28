const path = require('path')
const { promises: fs } = require('fs')
const _keys = require('lodash/keys')
const _filter = require('lodash/filter')
const _sortBy = require('lodash/sortBy')
const PI = require('p-iteration')
const perms = require('perms')
const userid = require('userid')
const mime = require('mime-types')
const byteman = require('byteman')
const { getGitIgnore } = require('serve-markdown-it-lib')

/**
 * @private
 */
const getDirectoryData = async (srcPath, config) => {
  const { excludeGitIgnore } = config
  const ig = await getGitIgnore(config)
  const nodes = {}

  const allNodes = await fs.readdir(srcPath, { withFileTypes: true })

  allNodes
    .filter(n => n.isFile() || n.isDirectory())
    .forEach((n) => { nodes[n.name] = n })

  const visibleNodes = excludeGitIgnore
    ? ig.filter(_keys(nodes)).map(n => nodes[n])
    : _keys(nodes).map(n => nodes[n])

  const nodeData = await PI.map(visibleNodes, async (node) => {
    const { name } = node
    const info = await fs.stat(path.join(srcPath, name))
    const { size: sizeBytes, uid, gid, mode } = info
    const size = byteman(sizeBytes, 2, true)

    return {
      isDirectory: node.isDirectory(),
      mode: perms.toString(mode),
      user: userid.username(uid) || uid,
      group: userid.groupname(gid) || gid,
      type: mime.lookup(name) || 'text/plain',
      sizeBytes,
      size,
      name
    }
  })

  const directories = _filter(nodeData, { isDirectory: true })
  const files = _filter(nodeData, { isDirectory: false })

  return [
    ..._sortBy(directories, ['name']),
    ..._sortBy(files, ['name'])
  ]
}

module.exports = getDirectoryData

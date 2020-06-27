const path = require('path')
const Nunjucks = require('nunjucks')

const INCLUDE_PATH = path.join(__dirname, '../../res/templates')
const nunjucks = Nunjucks.configure(INCLUDE_PATH, {})

module.exports = nunjucks

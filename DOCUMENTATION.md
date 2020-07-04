## Modules

<dl>
<dt><a href="#module_serve-markdown-it">serve-markdown-it</a></dt>
<dd><h1 id="sermit---serve-markdown-it">sermit - <code>serve-markdown-it</code>.</h1>
<p>Description TODO.</p>
<blockquote>
<p>Configurable static file server with markdown-it for parsing Markdown.</p>
</blockquote>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getConfig">getConfig(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Resolve the runtime configuration, loading the first user config file found.
Searches directories up the path for any of the following files:</p>
<ul>
<li><code>.sermitrc</code></li>
<li><code>.sermitrc.js</code></li>
<li><code>.sermitrc.json</code></li>
<li><code>.sermitrc.yaml</code></li>
<li><code>.sermitrc.yml</code></li>
</ul>
<p>Any discovered user config file is merged with the default
<a href="#Sermit..DefaultConfig">DefaultConfig</a> object.</p>
</dd>
<dt><a href="#mergeConfig">mergeConfig(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Overrides the default configuration with a user config object. Deep options
are replaced, shallow ones merged (i.e. <code>markdown-it</code> constructor defaults).</p>
</dd>
<dt><a href="#createServer">createServer(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Starts an HTTP server on the configured port, and serves static files out of
the specified <code>basePath</code>. If the <code>basePath</code> is a file, only that file will
be rendered, excluding any resolved assets.</p>
<p>Files provided by the configured template are rendered from disk. Any URLs
ending in <code>/raw</code> have the suffix removed and cause any matching file in
<code>basePath</code> to be rendered like an asset. This allows file contents to be
rendered with a link to the file itself.</p>
<p>If a URL is not an asset or raw file, it is checked against the
<code>matchMarkdownFileNames</code> regex on the provided <a href="Config">Config</a> object. Files
that match are passed through <code>markdown-it</code>.</p>
<p>Any remaining URLs are assumed to map to the <code>basePath</code>; if they are files,
they are rendered as source within markdown code fences. Directories trigger
the file explorer if allowed by the configuration.</p>
</dd>
</dl>

<a name="module_serve-markdown-it"></a>

## serve-markdown-it
# sermit - `serve-markdown-it`.

Description TODO.

> Configurable static file server with markdown-it for parsing Markdown.

**License**: MIT  
**Example** *(sermit help)*  
```js
sermit [path] [options]

Serve local files

Commands:
  sermit print-config            Log the merged configuration to the console
  sermit gen-config              Generate a new configuration file
  sermit render                  Render local files to static HTML
  sermit serve [path] [options]  Serve local files                     [default]

Options:
  --log-level, -l  Log level, increase to debug
         [string] [choices: 'error', 'info', 'warn', 'debug'] [default: 'error']
  --path, -p       Root directory
    [string] [required] [default: '/home/user/code/personal/serve-markdown-it']
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --port           Port number to spawn HTTP server on
                                             [number] [required] [default: 8960]

Examples:
  sermit gen-config > .sermitrc.json  Generate basic configuration
```
**Example** *(sermit)*  
```js
[cli] › ★  star      read config from /.sermitrc.json
[cli] › ★  star      using template default
[cli] › ★  star      using md plugin markdown-it-smartarrows
[cli] › ★  star      using md plugin markdown-it-anchor
[cli] › ★  star      using md plugin markdown-it-highlightjs
[cli] › ★  star      serving content from /home/user/code/personal/serve-markdown-it
[cli] › ★  star      listening at http://localhost:8960
```
**Example** *(sermit gen-config &gt; .sermitrc.json)*  
```js
{
  minify: true,
  excludeGitIgnore: true,
  template: {
    name: 'serve-markdown-it-template-default',
    config: {
      maxWidth: '960px',
      sections: {
        contentHeader: true,
        settings: true,
        debug: true,
        content: true,
        order: [
          'settings',
          'content',
          'debug'
        ]
      },
      explorer: {
        icons: true,
        columns: [
          'name',
          'user',
          'group',
          'mode',
          'type',
          'size'
        ],
        dataTable: {
          searchable: true,
          sortable: true,
          perPage: 25,
          perPageSelect: [
            10,
            25,
            50,
            100
          ],
          fixedHeight: false,
          layout: {
            top: '{select}{search}',
            bottom: '{pager}'
          }
        }
      },
      headerBar: false,
      settingsBar: false,
      dataTable: false
    }
  },
  md: {
    typographer: true,
    linkify: true,
    html: true,
    plugins: [
      {
        name: 'markdown-it-smartarrows',
        init: 'after',
        config: {
          auto: true,
          code: true
        }
      },
      {
        name: 'markdown-it-anchor',
        config: {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '§'
        },
        init: 'after'
      },
      {
        name: 'markdown-it-highlightjs',
        config: {
          auto: true,
          code: true
        },
        init: 'after'
      }
    ]
  }
}
```
<a name="getConfig"></a>

## getConfig(params) ⇒ <code>Promise</code>
Resolve the runtime configuration, loading the first user config file found.
Searches directories up the path for any of the following files:

- `.sermitrc`
- `.sermitrc.js`
- `.sermitrc.json`
- `.sermitrc.yaml`
- `.sermitrc.yml`

Any discovered user config file is merged with the default
[DefaultConfig](#Sermit..DefaultConfig) object.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves with the final [Config](Config) object.  
**Todo**

- [ ] consider including `basePath` in search


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | params. |
| [params.basePath] | <code>string</code> | <code>&quot;cwd&quot;</code> | path to start searching in. |
| [params.configPath] | <code>string</code> |  | path to pre-loaded user config file,   required if `config` is provided. |
| [params.config] | <code>object</code> |  | user config file if already found, search   is skipped if provided. |

**Example**  
```js
const config = await getConfig({ basePath: basePath })
const { state } = config
const { md, configPath, template } = state

if (configPath) {
  l.star('read config from %s', colors.bgGreen.black(configPath))
}

if (_isEmpty(command) || command === 'serve' || command === 'render') {
  l.star('using template %s', colors.cyan(template.name))

  md.pluginNames.forEach((name) => {
    l.star('using md plugin %s', colors.yellow(name))
  })
}
```
<a name="mergeConfig"></a>

## mergeConfig(params) ⇒ <code>Promise</code>
Overrides the default configuration with a user config object. Deep options
are replaced, shallow ones merged (i.e. `markdown-it` constructor defaults).

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves with final config object.  
**See**: [getConfig](#getConfig)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Array</code> | `[userConfig, userConfigPath, basePath]` |

**Example** *(usage within getConfig)*  
```js
const getConfig = ({ basePath, configPath, config: userConfig }) => (
  (userConfig
    ? Bluebird.resolve({ config: userConfig, filepath: configPath })
    : EXPLORER.search(basePath))
    .then(({ config, filepath }) => [config, filepath, basePath])
    .catch(() => [DEFAULT_CONFIG, null, basePath])
    .then(mergeConfig)
    .then(normalizeConfig)
    .then(validateConfig)
    .then(loadTemplate)
)
```
<a name="createServer"></a>

## createServer(params) ⇒ <code>Promise</code>
Starts an HTTP server on the configured port, and serves static files out of
the specified `basePath`. If the `basePath` is a file, only that file will
be rendered, excluding any resolved assets.

Files provided by the configured template are rendered from disk. Any URLs
ending in `/raw` have the suffix removed and cause any matching file in
`basePath` to be rendered like an asset. This allows file contents to be
rendered with a link to the file itself.

If a URL is not an asset or raw file, it is checked against the
`matchMarkdownFileNames` regex on the provided [Config](Config) object. Files
that match are passed through `markdown-it`.

Any remaining URLs are assumed to map to the `basePath`; if they are files,
they are rendered as source within markdown code fences. Directories trigger
the file explorer if allowed by the configuration.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to [koa](https://github.com/koajs/koa) instance.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params. |
| params.basePath | <code>string</code> | absolute path to the root content   directory. |
| params.config | <code>Config</code> | config data. |

**Example**  
```js
const SERVE_HANDLER = async (argv) => {
  const { l, port, config, path } = argv
  const server = await createServer({ basePath: path, config })

  server.listen(port)

  l.star('serving content from %s', colors.underline(path))
  l.star(
    '%s',
    colors.cyan.underline(
      `listening at ${colors.bold(`http://localhost:${port}`)}`
    )
  )
}
```

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

## Constants

<dl>
<dt><a href="#DefaultMDPlugins">DefaultMDPlugins</a> : <code>object</code></dt>
<dd><p>Default <a href="https://github.com/markdown-it/markdown-it">markdown-it</a> plugin configuration.</p>
</dd>
<dt><a href="#DefaultConfig">DefaultConfig</a> : <code>object</code></dt>
<dd><p>Default configuration data; any loaded user configuration is applied on top
of the default values, using <a href="https://github.com/davidtheclark/cosmiconfig">cosmiconfig</a>.</p>
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
<a href="#DefaultConfig">DefaultConfig</a> object.</p>
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
<code>matchMarkdownFileNames</code> regex on the provided <a href="#Config">Config</a> object. Files
that match are passed through <code>markdown-it</code>.</p>
<p>Any remaining URLs are assumed to map to the <code>basePath</code>; if they are files,
they are rendered as source within markdown code fences. Directories trigger
the file explorer if allowed by the configuration.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PluginConfig">PluginConfig</a> : <code>object</code></dt>
<dd><p>Plugin configuration data.</p>
</dd>
<dt><a href="#PluginDefinition">PluginDefinition</a> : <code>string</code> | <code><a href="#PluginConfig">PluginConfig</a></code></dt>
<dd><p>Plugin definition, either a raw module name or config object.</p>
</dd>
<dt><a href="#Config">Config</a> : <code>object</code></dt>
<dd><p>Configuration data.</p>
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
  markdownIt: {
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
<a name="DefaultMDPlugins"></a>

## DefaultMDPlugins : <code>object</code>
Default [markdown-it](https://github.com/markdown-it/markdown-it) plugin configuration.

**Kind**: global constant  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| 0 | <code>object</code> |  | [markdown-it-highlightjs](https://github.com/valeriangalliat/markdown-it-highlightjs) plugin, used   to generate highlighted code blocks with [highlightjs](https://github.com/highlightjs/highlight.js). |
| ['0.name'] | <code>string</code> | <code>&quot;&#x27;markdown-it-highlightjs&#x27;&quot;</code> | module name. |
| ['0.init'] | <code>string</code> | <code>&quot;&#x27;after&#x27;&quot;</code> | module init method. |
| '0.config' | <code>object</code> |  | module config. |
| ['0.config.auto'] | <code>boolean</code> | <code>true</code> | enables automatic language   detection |
| ['0.config.code'] | <code>boolean</code> | <code>true</code> | wraps inner markup in   `<code>/<code>` tags. |

<a name="DefaultConfig"></a>

## DefaultConfig : <code>object</code>
Default configuration data; any loaded user configuration is applied on top
of the default values, using [cosmiconfig](https://github.com/davidtheclark/cosmiconfig).

**Kind**: global constant  
**Read only**: true  
**See**: [DefaultMDPlugins](#DefaultMDPlugins)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [minify] | <code>boolean</code> | <code>true</code> | enables HTML minification for the server   and when rendering, uses `html-minifier`. |
| [excludeGitIgnore] | <code>boolean</code> | <code>true</code> | if true, any `.gitignore` file   in the target path is loaded and used to filter directory listings. |
| [matchMarkdownFileNames] | <code>RegExp</code> | <code>/\.(md|wiki|markdown)$/u</code> | regular expression used to detect files with Markdown-formatted content. |
| template | <code>object</code> |  | template configuration. |
| [template.name] | <code>string</code> | <code>&quot;&#x27;serve-markdown-it-template-default&#x27;&quot;</code> | default template; @see [serve-markdown-it-template-default](https://github.com/f3rno/serve-markdown-it-template-default) |
| template.config | <code>object</code> |  | configuration options passed to the   template on initialisation |
| markdownIt | <code>object</code> |  | [markdown-it](https://github.com/markdown-it/markdown-it) parser   configuration options. |
| [markdownIt.typographer] | <code>boolean</code> | <code>true</code> | enables conversion of   quotes beautification (smartquotes). |
| [markdownIt.linkify] | <code>boolean</code> | <code>true</code> | enables automatic conversion   of text links to `<a>` tags. |
| [markdownIt.html] | <code>boolean</code> | <code>true</code> | allows HTML tags in markdown   source. |
| [markdownIt.plugins] | [<code>Array.&lt;PluginDefinition&gt;</code>](#PluginDefinition) | <code>DefaultMDPLugins</code> | array   of plugins for [markdown-it](https://github.com/markdown-it/markdown-it) to be loaded. |

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
[DefaultConfig](#DefaultConfig) object.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves with the final [Config](#Config) object.  

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
`matchMarkdownFileNames` regex on the provided [Config](#Config) object. Files
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
| params.config | [<code>Config</code>](#Config) | config data. |

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
<a name="PluginConfig"></a>

## PluginConfig : <code>object</code>
Plugin configuration data.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | module name. |
| [init] | <code>string</code> | <code>&quot;&#x27;after&#x27;&quot;</code> | controls how the plugin is initialized,   if 'after' the config is passed after it to `markdown-it`. If 'call' the   module's default export is called with the config data, and the result   passed to `markdown-it`. |
| [config] | <code>object</code> |  | config data passed to the plugin on   initialisation. |

<a name="PluginDefinition"></a>

## PluginDefinition : <code>string</code> \| [<code>PluginConfig</code>](#PluginConfig)
Plugin definition, either a raw module name or config object.

**Kind**: global typedef  
<a name="Config"></a>

## Config : <code>object</code>
Configuration data.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [minify] | <code>boolean</code> | enables HTML minification for the server and   when rendering, uses `html-minifier`. |
| [excludeGitIgnore] | <code>boolean</code> | if true, any `.gitignore` file in   the target path is loaded and used to filter directory listings. |
| [matchMarkdownFileNames] | <code>RegExp</code> | regular expression used to   detect files with Markdown-formatted content. |
| [template] | <code>object</code> | template configuration. |
| [template.name] | <code>string</code> | template module name. |
| [template.config] | <code>object</code> | configuration options passed to the   template on initialisation. |
| [markdownIt] | <code>object</code> | [markdown-it](https://github.com/markdown-it/markdown-it) parser   configuration options. All keys besides `plugins` are passed to   the [markdown-it](https://github.com/markdown-it/markdown-it) constructor. |
| [markdownIt.plugins] | [<code>Array.&lt;PluginDefinition&gt;</code>](#PluginDefinition) | array of plugins for   [markdown-it](https://github.com/markdown-it/markdown-it) to be loaded. |


// eslint-why docs
/* eslint-disable max-len */

const lib = require('./lib')

/**
 * # sermit - `serve-markdown-it`.
 *
 * Description TODO.
 *
 * > Configurable static file server with markdown-it for parsing Markdown.
 *
 * @module serve-markdown-it
 * @license MIT
 * @example <caption>sermit help</caption>
 * sermit [path] [options]
 *
 * Serve local files
 *
 * Commands:
 *   sermit print-config            Log the merged configuration to the console
 *   sermit gen-config              Generate a new configuration file
 *   sermit render                  Render local files to static HTML
 *   sermit serve [path] [options]  Serve local files                     [default]
 *
 * Options:
 *   --log-level, -l  Log level, increase to debug
 *          [string] [choices: 'error', 'info', 'warn', 'debug'] [default: 'error']
 *   --path, -p       Root directory
 *     [string] [required] [default: '/home/user/code/personal/serve-markdown-it']
 *   --help           Show help                                           [boolean]
 *   --version        Show version number                                 [boolean]
 *   --port           Port number to spawn HTTP server on
 *                                              [number] [required] [default: 8960]
 *
 * Examples:
 *   sermit gen-config > .sermitrc.json  Generate basic configuration
 *
 * @example <caption>sermit</caption>
 * [cli] › ★  star      read config from /.sermitrc.json
 * [cli] › ★  star      using template default
 * [cli] › ★  star      using md plugin markdown-it-smartarrows
 * [cli] › ★  star      using md plugin markdown-it-anchor
 * [cli] › ★  star      using md plugin markdown-it-highlightjs
 * [cli] › ★  star      serving content from /home/user/code/personal/serve-markdown-it
 * [cli] › ★  star      listening at http://localhost:8960
 *
 * @example <caption>sermit gen-config > .sermitrc.json</caption>
 * {
 *   minify: true,
 *   excludeGitIgnore: true,
 *   template: {
 *     name: 'serve-markdown-it-template-default',
 *     config: {
 *       maxWidth: '960px',
 *       sections: {
 *         contentHeader: true,
 *         settings: true,
 *         debug: true,
 *         content: true,
 *         order: [
 *           'settings',
 *           'content',
 *           'debug'
 *         ]
 *       },
 *       explorer: {
 *         icons: true,
 *         columns: [
 *           'name',
 *           'user',
 *           'group',
 *           'mode',
 *           'type',
 *           'size'
 *         ],
 *         dataTable: {
 *           searchable: true,
 *           sortable: true,
 *           perPage: 25,
 *           perPageSelect: [
 *             10,
 *             25,
 *             50,
 *             100
 *           ],
 *           fixedHeight: false,
 *           layout: {
 *             top: '{select}{search}',
 *             bottom: '{pager}'
 *           }
 *         }
 *       },
 *       headerBar: false,
 *       settingsBar: false,
 *       dataTable: false
 *     }
 *   },
 *   markdownIt: {
 *     typographer: true,
 *     linkify: true,
 *     html: true,
 *     plugins: [
 *       {
 *         name: 'markdown-it-smartarrows',
 *         init: 'after',
 *         config: {
 *           auto: true,
 *           code: true
 *         }
 *       },
 *       {
 *         name: 'markdown-it-anchor',
 *         config: {
 *           permalink: true,
 *           permalinkBefore: true,
 *           permalinkSymbol: '§'
 *         },
 *         init: 'after'
 *       },
 *       {
 *         name: 'markdown-it-highlightjs',
 *         config: {
 *           auto: true,
 *           code: true
 *         },
 *         init: 'after'
 *       }
 *     ]
 *   }
 * }
 */

/**
 * @external serve-markdown-it-template-default
 * @see https://github.com/f3rno/serve-markdown-it-template-default
 */

/**
 * @external markdown-it
 * @see https://github.com/markdown-it/markdown-it
 */

/**
 * @external cosmiconfig
 * @see https://github.com/davidtheclark/cosmiconfig
 */

/**
 * @external markdown-it-highlightjs
 * @see https://github.com/valeriangalliat/markdown-it-highlightjs
 */

/**
 * @external highlightjs
 * @see https://github.com/highlightjs/highlight.js
 */

module.exports = lib

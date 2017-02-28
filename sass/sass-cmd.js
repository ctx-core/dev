#!/usr/bin/env node
/**
 * list project sass entries {file,script} based on ./sass.json
 * @module ctx-core/sass/sass-cmd
 * @example
 * #!/bin/bash
 * sass-cmd.js -t build-1
 * # build-1 build file list
 * sass-cmd.js -t browser
 * # browser build file list
 */
console.info($sass__cmd())
module.exports = $sass__cmd
function $sass__cmd() {
  const minimist = require('minimist')
      , argv = minimist(process.argv.slice(2), {
          '--': true,
          alias: {c: 'config', t: 'target', w: 'watch'}
        })
      , config_file =
          argv.config
          || process.env.SASS_JSON
          || './sass.json'
      , target =
          argv.target
          || 'browser'
      , watch = argv.watch
      , suffix = (argv['--'] || []).join(' ')
      , fs = require('fs')
      , json__config = fs.readFileSync(config_file, 'utf8')
      , config = JSON.parse(json__config)
      , cmds = config[target] || []
      , $$ = []
  for (let i=0; i < cmds.length; i++) {
    const cmd = cmds[i]
        , params = cmd.params || ''
        , input = cmd.input
        , output = cmd.output
    if (!input) throw `input required:\n${JSON.stringify(cmd)}`
    $$.push($cmd(params, input, output, suffix))
  }
  return $$.join('\n')
  function $cmd(params, input, output, suffix) {
    const params$ =
          watch
          ? `${params} --watch`
          : params
    let $ = `node-sass ${params$} ${input}`
    if (output) $ = `${$} > ${output}`
    if (suffix) {
      $ = `${$} ${suffix}`
    }
    return $
  }
}
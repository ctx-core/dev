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
console.info(_sass__cmd())
module.exports = _sass__cmd
function _sass__cmd() {
  const minimist = require('minimist')
      , argv =
          minimist(process.argv.slice(2), {
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
      , array__sass__cmd = []
  for (let i=0; i < cmds.length; i++) {
    const cmd = cmds[i]
        , params = cmd.params || ''
        , input = cmd.input
        , output = cmd.output
    if (!input) throw `input required:\n${JSON.stringify(cmd)}`
    array__sass__cmd.push(_cmd(params, input, output, suffix))
  }
  return array__sass__cmd.join('\n')
  function _cmd(params, input, output, suffix) {
    const params__ =
          watch
          ? `${params} --watch`
          : params
    let cmd = `node-sass ${params__} ${input}`
    if (output) cmd = `${cmd} ${output}`
    if (suffix) {
      cmd = `${cmd} ${suffix}`
    }
    return cmd
  }
}
#!/usr/bin/env node
/**
 * list project rollup entries {file,script} based on ./rollup.json
 * @module ctx-core/rollup/rollup-cmd
 * @example
 * #!/bin/bash
 * rollup-cmd.js -t http
 * # http build file list
 * rollup-cmd.js -t browser
 * # browser build file list
 */
const fs = require('fs')
require('ctx-core/package/lib').verify__version__node()
console.info($rollup__cmd())
module.exports = $rollup__cmd
function $rollup__cmd() {
  const minimist = require('minimist')
      , argv = minimist(process.argv.slice(2), {
          '--': true,
          alias: {c: 'config', h: 'help', t: 'target'}
        })
      , {help} = argv
  if (help) return help__msg()
  const suffix = (argv['--'] || []).join(' ')
      , config_file =
          argv.config
          || process.env.ROLLUP_JSON
          || './rollup.json'
      , {target = 'browser'} = argv
      , code__tmux = $code__tmux()
  return code__tmux
  function $code__tmux() {
    const config__json = fs.readFileSync(config_file, 'utf8')
        , config = JSON.parse(config__json)
        , cmds__target__config = config[target] || []
        , cmds__windows = []
        , cmds__send_keys = []
        , {length} = cmds__target__config
    for (let i=0; i < length; i++) {
      const cmd__target = cmds__target__config[i]
      let cmd = ''
      if (/^\$/.test(cmd__target)) {
        console.info(cmd__target)
        cmd += cmd__target.replace(/^\$/, '')
      } else {
        cmd += `rollup -c '${cmd__target}'`
      }
      if (suffix) {
        cmd += (' ' + suffix)
      }
      if (i) {
        cmds__windows.push(`tmux split-window`)
      }
      cmds__send_keys.push(`tmux send-keys -t ${target}:window.${i} "direnv reload" C-m`)
      cmds__send_keys.push(`tmux send-keys -t ${target}:window.${i} "${cmd}" C-m`)
    }
    const code__tmux = [
            `tmux new-session -s ${target} -n window -d`,
            ...cmds__windows,
            'tmux select-layout even-vertical',
            ...cmds__send_keys,
            `tmux attach -t ${target}`
          ].join('\n')
    return code__tmux
  }
}
function help__msg() {
    return `
Usage: rollup-cmd.js [-c <config-file>] [-t <target>]

Options:

-c, --config Use config file (defaults to './rollup.json')
-t, --target Use build target defined in config file (defaults to 'browser')
-h, --help   This help message
    `.trim()
}
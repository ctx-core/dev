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
require('ctx-core/package/lib.js').verify__version__node()
console.info($rollup__cmd())
module.exports = $rollup__cmd
function $rollup__cmd() {
  const minimist = require('minimist')
      , argv = minimist(process.argv.slice(2), {
          '--': true,
          alias: {c: 'config', h: 'help', t: 'target', w: 'watch'}
        })
      , {help} = argv
  if (help) return help__msg()
  const suffix = (argv['--'] || []).join(' ')
      , config_file =
          argv.config
          || process.env.ROLLUP_JSON
          || './rollup.json'
      , { target = 'browser'
        , watch
        } = argv
      , json__config = fs.readFileSync(config_file, 'utf8')
      , config = JSON.parse(json__config)
      , cmds__target__config = config[target] || []
      , {length} = cmds__target__config
      , code =
          watch
          ? $code__watch()
          : $code__cmds()
  return code
  function $code__cmds() {
    const cmds = []
    for (let i=0; i < length; i++) {
      const cmd__target = cmds__target__config[i]
      let cmd = ''
      if (/^\$/.test(cmd__target)) {
        cmd += cmd__target.replace(/^\$/, '')
      } else {
        cmd += `rollup -c '${cmd__target}'`
      }
      if (suffix) {
        cmd += (' ' + suffix)
      }
      cmds.push(cmd)
    }
    return cmds.join('\n')
  }
  function $code__watch() {
    const cmds__windows = []
        , cmds__send_keys = []
    for (let i=0; i < length; i++) {
      const cmd__target = cmds__target__config[i]
      let cmd = ''
      if (/^\$/.test(cmd__target)) {
        cmd += cmd__target.replace(/^\$/, '')
      } else {
        cmd += `rollup -c '${cmd__target}'`
      }
      if (watch) {
        cmd += ' --watch'
      }
      if (suffix) {
        cmd += ` ${suffix}`
      }
      if (i) {
        cmds__windows.push(`tmux split-window`)
      }
      const cmds__tmux =
        [ '[ -f ~/.bashrc ] && . ~/.bashrc || [ -f ~/.bash_profile ] && . ~/.bash_profile',
          'direnv reload',
          cmd]
      for (let j=0; j < cmds__tmux.length; j++) {
        const cmd__tmux = cmds__tmux[j]
        cmds__send_keys.push(
          `tmux send-keys -t ${target}:window.${i} "${cmd__tmux}" C-m`)
      }
    }
    const code__watch = [
            `tmux new-session -s ${target} -n window -y 1000 -d`,
            ...cmds__windows,
            'tmux select-layout even-vertical',
            ...cmds__send_keys,
            `tmux attach -t ${target}`
          ].join('\n')
    return code__watch
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
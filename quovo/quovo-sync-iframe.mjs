import {tag__assign} from 'ctx-core/riot/tag'
import {agent__iframe__quovo} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-sync-iframe'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  agent__iframe__quovo(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__iframe__quovo
      .on('change', on$change__quovo__iframe)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__iframe__quovo
      .off('change', on$change__quovo__iframe)
  }
  function on$change__quovo__iframe() {
    log(`${logPrefix}|on$change__quovo__iframe`)
    tag.update()
  }
}
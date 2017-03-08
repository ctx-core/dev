import {tag__assign} from 'ctx-core/riot/tag'
import {quovo__iframe__agent} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-sync-iframe'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  quovo__iframe__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.quovo__iframe__agent.pick__on({on$change__quovo__iframe})
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.quovo__iframe__agent.pick__off({on$change__quovo__iframe})
  }
  function on$change__quovo__iframe() {
    log(`${logPrefix}|on$change__quovo__iframe`)
    tag.update()
  }
}
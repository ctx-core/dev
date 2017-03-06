import {tag__assign} from 'ctx-core/riot/tag'
import {users__quovo__agent} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-users-nav'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  let {ctx} = tag
  users__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.users__quovo__agent.pick__on({on$change__users__quovo})
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.users__quovo__agent.pick__off({on$change__users__quovo})
  }
  function on$change__users__quovo() {
    log(`${logPrefix}|on$change__users__quovo`)
    tag.update__ctx()
  }
}
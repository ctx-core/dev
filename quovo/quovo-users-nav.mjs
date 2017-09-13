import {tag__assign} from 'ctx-core/riot/tag'
import {users__quovo__agent} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-users-nav'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  users__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.users__quovo__agent
      .on('change', on$change__users__quovo)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.users__quovo__agent
      .off('change', on$change__users__quovo)
  }
  function on$change__users__quovo() {
    log(`${logPrefix}|on$change__users__quovo`)
    tag.update()
  }
}
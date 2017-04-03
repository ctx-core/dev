import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {user__quovo__agent} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-details'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency,
    registerElement: [
      'quovo-user-id',
      'quovo-user-username',
      'quovo-user-email',
      'quovo-user-value',
      'x-value'] })
  const {ctx} = tag
  user__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.user__quovo__agent.pick__on({on$change__user__quovo})
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.user__quovo__agent.pick__off({on$change__user__quovo})
  }
  function on$change__user__quovo() {
    log(`${logPrefix}|on$change__user__quovo`)
    tag.update()
  }
}
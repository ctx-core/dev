import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {users__quovo__agent
      , user_id__quovo__agent} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/dom'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-users'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    $value,
    format__currency,
    registerElement: [
      'quovo-user',
      'quovo-user-id',
      'quovo-user-username',
      'quovo-user-email',
      'quovo-user-value']})
  const {ctx} = tag
  mount__currency(tag)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    users__quovo__agent(ctx)
    user_id__quovo__agent(ctx)
    ctx.users__quovo__agent.on('change', on$change__users__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.users__quovo__agent.off('change', on$change__users__quovo)
  }
  function $value(value) {
    log(`${logPrefix}|$value`)
    return format__currency(value || 0)
  }
  function on$change__users__quovo() {
    log(`${logPrefix}|on$change__users__quovo`)
    tag.update()
  }
}
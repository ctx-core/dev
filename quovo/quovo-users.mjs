import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {agent__users__quovo
      , agent__user_id__quovo} from 'ctx-core/quovo/agent'
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
    agent__users__quovo(ctx)
    agent__user_id__quovo(ctx)
    ctx.agent__users__quovo.on('change', on$change__users__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__users__quovo.off('change', on$change__users__quovo)
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
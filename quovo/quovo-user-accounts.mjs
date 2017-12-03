import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {agent__account__user__quovos
      , agent__account_id__quovo} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/dom'
import {path__account__user__quovo} from 'ctx-core/quovo/path'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-accounts'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency,
    path__account__user__quovo,
    registerElement: [
      'quovo-account',
      'x-brokerage-name',
      'quovo-account-value']
  })
  const {ctx} = tag
  mount__currency(tag)
  agent__account__user__quovos(ctx)
  agent__account_id__quovo(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__account__user__quovos
      .on('change', on$change__account__user__quovos)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__account__user__quovos
      .off('change', on$change__account__user__quovos)
  }
  function on$change__account__user__quovos() {
    log(`${logPrefix}|on$change__account__user__quovos`)
    tag.update()
  }
}
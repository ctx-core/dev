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
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__account__user__quovos
      .on('change', onchange__account__user__quovos)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__account__user__quovos
      .off('change', onchange__account__user__quovos)
  }
  function onchange__account__user__quovos() {
    log(`${logPrefix}|onchange__account__user__quovos`)
    tag.update()
  }
}
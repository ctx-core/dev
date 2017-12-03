import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {agent__account__user__quovo} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/dom'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-account-details'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency,
    registerElement: [
      'x-brokerage-name',
      'quovo-account-value',
      'quovo-account-nickname',
      'quovo-account-opened',
      'x-value'
    ]})
  const {ctx} = tag
  mount__currency(tag)
  agent__account__user__quovo(ctx)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__account__user__quovo
      .on('change', onchange__account__user__quovo)
    tag.update()
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__account__user__quovo
      .off('change', onchange__account__user__quovo)
  }
  function onchange__account__user__quovo() {
    log(`${logPrefix}|onchange__account__user__quovo`)
    tag.update()
  }
}
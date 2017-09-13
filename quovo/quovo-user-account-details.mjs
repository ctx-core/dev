import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {account__user__quovo__agent} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/tag'
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
  account__user__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.account__user__quovo__agent
      .on('change', on$change__account__user__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.account__user__quovo__agent
      .off('change', on$change__account__user__quovo)
  }
  function on$change__account__user__quovo() {
    log(`${logPrefix}|on$change__account__user__quovo`)
    tag.update()
  }
}
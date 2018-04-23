import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {format__currency} from 'ctx-core/currency/lib.mjs'
import {agent__account__user__quovos} from 'ctx-core/quovo/agent.mjs'
import {mount__currency} from 'ctx-core/currency/dom.mjs'
import {path__account__user__quovo} from 'ctx-core/quovo/path.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-user-accounts.mjs'
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
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    agent__account__user__quovos(ctx)
      .on('change', __change__agent__account__user__quovos)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    agent__account__user__quovos(ctx)
      .off('change', __change__agent__account__user__quovos)
  }
  function __change__agent__account__user__quovos() {
    log(`${logPrefix}|__change__agent__account__user__quovos`)
    tag.update()
  }
}
import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {format__currency} from 'ctx-core/currency/lib.mjs'
import {agent__user__quovo} from 'ctx-core/quovo/agent.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-user-details.mjs'
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
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    agent__user__quovo(ctx)
      .on('change', __change__agent__user__quovo)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    agent__user__quovo(ctx)
      .off('change', __change__agent__user__quovo)
  }
  function __change__agent__user__quovo() {
    log(`${logPrefix}|__change__agent__user__quovo`)
    tag.update()
  }
}
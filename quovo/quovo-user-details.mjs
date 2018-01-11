import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {agent__user__quovo} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
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
  agent__user__quovo(ctx)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__user__quovo
      .on('change', __change__agent__user__quovo)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__user__quovo
      .off('change', __change__agent__user__quovo)
  }
  function __change__agent__user__quovo() {
    log(`${logPrefix}|__change__agent__user__quovo`)
    tag.update()
  }
}
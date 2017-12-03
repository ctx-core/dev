import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {agent__user__quovo} from 'ctx-core/quovo/agent'
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
  agent__user__quovo(ctx)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__user__quovo
      .on('change', onchange__user__quovo)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__user__quovo
      .off('change', onchange__user__quovo)
  }
  function onchange__user__quovo() {
    log(`${logPrefix}|onchange__user__quovo`)
    tag.update()
  }
}
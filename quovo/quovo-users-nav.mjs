import {tag__assign} from 'ctx-core/riot/tag'
import {agent__users__quovo} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-users-nav'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  agent__users__quovo(ctx)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__users__quovo
      .on('change', onchange__users__quovo)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__users__quovo
      .off('change', onchange__users__quovo)
  }
  function onchange__users__quovo() {
    log(`${logPrefix}|onchange__users__quovo`)
    tag.update()
  }
}
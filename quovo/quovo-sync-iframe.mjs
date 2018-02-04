import {tag__assign} from 'ctx-core/riot/tag'
import {agent__iframe__quovo} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-sync-iframe.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    agent__iframe__quovo(ctx)
      .on('change', __change__agent__iframe__quovo)
    tag.update()
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    agent__iframe__quovo(ctx)
      .off('change', __change__agent__iframe__quovo)
  }
  function __change__agent__iframe__quovo() {
    log(`${logPrefix}|__change__agent__iframe__quovo`)
    tag.update()
  }
}
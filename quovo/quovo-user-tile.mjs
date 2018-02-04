import {tag__assign} from 'ctx-core/riot/tag'
import {agent__route} from 'ctx-core/route/agent'
import {agent__user__quovo} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-tile.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    agent__route(ctx).on('change', __change__agent__route)
    agent__user__quovo(ctx)
      .on('change', __change__agent__user__quovo)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    agent__route(ctx).off('change', __change__agent__route)
    agent__user__quovo(ctx)
      .off('change', __change__agent__user__quovo)
  }
  function __change__agent__route() {
    log(`${logPrefix}|__change__agent__route`)
    tag.update()
  }
  function __change__agent__user__quovo() {
    log(`${logPrefix}|__change__agent__user__quovo`)
    tag.update()
  }
}
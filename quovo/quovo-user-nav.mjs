import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {mount__currency} from 'ctx-core/currency/dom'
import {agent__route} from 'ctx-core/route/agent'
import {agent__user__quovo} from 'ctx-core/quovo/agent'
import {path__user__quovo
      , path__sync__user__quovo} from 'ctx-core/quovo/path'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-nav'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency,
    path__user__quovo,
    path__sync__user__quovo,
    registerElement: [
      'quovo-user',
      'quovo-user-id',
      'quovo-user-username',
      'quovo-user-email',
      'quovo-user-value']})
  const {ctx} = tag
  mount__currency(tag)
  agent__route(ctx)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    agent__user__quovo(ctx)
    ctx.agent__route.on('change', __change__agent__route)
    ctx.agent__user__quovo
      .on('change', __change__agent__user__quovo)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__route.off('change', __change__agent__route)
    ctx.agent__user__quovo
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
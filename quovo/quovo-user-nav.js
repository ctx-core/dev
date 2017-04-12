import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {mount__currency} from 'ctx-core/currency/tag'
import {mount__route} from 'ctx-core/route/tag'
import {user__quovo__agent} from 'ctx-core/quovo/agent'
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
  mount__route(tag, {
    on$change__route: on$change__route
  })
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    user__quovo__agent(ctx)
    ctx.user__quovo__agent
      .on('change', on$change__user__quovo)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.user__quovo__agent
      .off('change', on$change__user__quovo)
  }
  function on$change__route() {
    log(`${logPrefix}|on$change__route`)
    tag.update()
  }
  function on$change__user__quovo() {
    log(`${logPrefix}|on$change__user__quovo`)
    tag.update()
  }
}
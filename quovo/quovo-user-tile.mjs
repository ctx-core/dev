import {tag__assign} from 'ctx-core/riot/tag'
import {route__agent} from 'ctx-core/route/agent'
import {user__quovo__agent} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-tile'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  user__quovo__agent(ctx)
  route__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.route__agent.on('change', on$change__route)
    ctx.user__quovo__agent
      .on('change', on$change__user__quovo)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.route__agent.off('change', on$change__route)
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
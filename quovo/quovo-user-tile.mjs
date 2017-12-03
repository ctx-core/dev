import {tag__assign} from 'ctx-core/riot/tag'
import {agent__route} from 'ctx-core/route/agent'
import {agent__user__quovo} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-tile'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  agent__user__quovo(ctx)
  agent__route(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__route.on('change', on$change__route)
    ctx.agent__user__quovo
      .on('change', on$change__user__quovo)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__route.off('change', on$change__route)
    ctx.agent__user__quovo
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
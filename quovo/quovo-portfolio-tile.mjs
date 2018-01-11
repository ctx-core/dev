import {tag__assign} from 'ctx-core/riot/tag'
import {agent__route} from 'ctx-core/route/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-tile.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  agent__route(ctx)
  ctx.agent__route.on('change', __change__agent__route)
  function __change__agent__route() {
    log(`${logPrefix}|__change__agent__route`)
    tag.update()
  }
}
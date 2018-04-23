import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {agent__route} from 'ctx-core/route/agent.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-user-account-tile.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  agent__route(ctx).on('change',
    __change__agent__route)
  function __change__agent__route() {
    log(`${logPrefix}|__change__agent__route`)
    tag.update()
  }
}
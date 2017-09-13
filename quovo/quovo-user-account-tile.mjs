import {tag__assign} from 'ctx-core/riot/tag'
import {route__agent} from 'ctx-core/route/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-account-tile'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  route__agent(ctx)
  ctx.route__agent.on('change', on$change__route)
  function on$change__route() {
    log(`${logPrefix}|on$change__route`)
    tag.update()
  }
}
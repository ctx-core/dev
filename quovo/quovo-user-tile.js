import {tag__assign} from 'ctx-core/riot/tag'
import {mount__route} from 'ctx-core/route/tag'
import {user__quovo__agent} from 'ctx-core/quovo/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-tile'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  let {ctx} = tag
  user__quovo__agent(ctx)
  mount__route(tag, {
    on$change__route
  })
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.user__quovo__agent.pick__on({on$change__user__quovo})
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.user__quovo__agent.pick__off({on$change__user__quovo})
  }
  function on$change__route() {
    log(`${logPrefix}|on$change__route`)
    tag.update__ctx()
  }
  function on$change__user__quovo() {
    log(`${logPrefix}|on$change__user__quovo`)
    tag.update__ctx()
  }
}
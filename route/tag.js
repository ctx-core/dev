import {clone} from 'ctx-core/object/lib'
import {
  route__agent,
  route$query__agent} from 'ctx-core/route/agent'
import riot$route from 'riot-route'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/route/tag'
export function mount__route(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__route`)
  let {ctx} = tag
  const ctx__mount = clone(...ctx__mount$$)
  route$query__agent(ctx)
  route__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|mount__route|on$mount`)
    ctx.route$query__agent.pick__on(ctx__mount)
    ctx.route__agent.pick__on(ctx__mount)
    tag.schedule__update()
  }
  function on$unmount() {
    log(`${logPrefix}|mount__route|on$unmount`)
    ctx.route$query__agent.pick__off(ctx__mount)
    ctx.route__agent.pick__off(ctx__mount)
  }
  function on$change__route() {
    log(`${logPrefix}|mount__router|on$change__route`)
    tag.update()
  }
}
export function mount__router(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__router`)
  let {ctx} = tag
  const ctx__mount = clone(...ctx__mount$$)
      , {assign__routes} = ctx__mount
  mount__route(tag, ...ctx__mount$$)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|mount__router|on$mount`)
    if (assign__routes) assign__routes(ctx)
    riot$route.exec()
  }
  function on$unmount() {
    log(`${logPrefix}|mount__router|on$unmount`)
    riot$route.stop()
  }
}
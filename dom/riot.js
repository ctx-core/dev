import {$url$anchor} from 'ctx-core/dom/lib'
import {change__agents} from 'ctx-core/agent/lib'
import riot$route from 'riot-route'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/riot'
export function riot$route$url$anchor(route__fn) {
  log(`${logPrefix}|riot$route$url$anchor`)
  const route = riot$route.create()
  route('*', anchor => {
    try {
      log(`${logPrefix}|riot$route$url$anchor|route|*`, anchor)
      if (route__fn) $url$anchor__route__fn$(route__fn)
    } catch (e) {
      error(e)
      throw e
    }
  })
  return route
}
export function $url$anchor__route__fn$(route__fn) {
  log(`${logPrefix}|$url$anchor__route__fn`)
  route__fn($url$anchor())
}
export function route$url$anchor__fn(ctx) {
  log(`${logPrefix}|route$url$anchor__fn`)
  return (anchor$ctx) => {
    log(`${logPrefix}|route$url$anchor__fn|fn`, ctx, anchor$ctx)
    change__agents(ctx, anchor$ctx)
  }
}
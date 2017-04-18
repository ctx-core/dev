import {$anchor__url} from 'ctx-core/dom/lib'
import {change__agents} from 'ctx-core/agent/lib'
import riot$route from 'riot-route'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/riot'
export function riot$route$anchor__url(route__fn) {
  log(`${logPrefix}|riot$route$anchor__url`)
  const route = riot$route.create()
  route('*', anchor => {
    try {
      log(`${logPrefix}|riot$route$anchor__url|route|*`, anchor)
      if (route__fn) $anchor__url__route__fn$(route__fn)
    } catch (e) {
      error(e)
      throw e
    }
  })
  return route
}
export function $anchor__url__route__fn$(route__fn) {
  log(`${logPrefix}|$anchor__url__route__fn`)
  route__fn($anchor__url())
}
export function route$anchor__url__fn(ctx) {
  log(`${logPrefix}|route$anchor__url__fn`)
  return (anchor$ctx) => {
    log(`${logPrefix}|route$anchor__url__fn|fn`, ctx, anchor$ctx)
    change__agents(ctx, anchor$ctx)
  }
}
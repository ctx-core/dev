import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/env'
import {$version} from 'ctx-core/version__app/node'
import {$versioned__js as _$versioned__js} from 'ctx-core/html/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/html/node.mjs'
export function $versioned__js(src__script, opts={}) {
  return _$versioned__js(env, src__script, opts)
}
/**
 * versioned file
 * @param {string} url
 * @returns {string}
 */
export function $versioned(url) {
  return `${url}?${$query__version()}`
}
/**
 * version query param
 * @returns {string}
 */
export function $query__version() {
  return `v=${encodeURIComponent($version())}`
}
/**
 * Returns a new ctx__html
 * @typedef {function} $ctx__html
 * @returns {module:ctx-core/html/lib~ctx__html}
 */
/**
 * push array__ctx__html functions onto env
 * @param {...module:ctx-core/html/lib#$ctx__html} return values compose ctx__html
 */
export function compose__$ctx__html(...array__ctx__html) {
  log(`${logPrefix}|compose__$ctx__html`)
  list__compose__$ctx__html().push(...array__ctx__html)
  return env
}
export function list__compose__$ctx__html() {
  log(`${logPrefix}|list__compose__$ctx__html`)
  let {list__compose__$ctx__html = []} = env
  env.list__compose__$ctx__html = list__compose__$ctx__html
  return list__compose__$ctx__html
}
/**
 * Returns a new ctx__html
 * @param ctx
 * @param array__ctx__html
 * @returns {{}}
 */
export function $ctx__html(ctx, ...array__ctx__html) {
  log(`${logPrefix}|$ctx__html`)
  return assign({
    CACHE_VERSION: $version(),
    VERSION: ctx.VERSION
  }, ...array__ctx__html)
}
export const $ctx__html__core = $ctx__html

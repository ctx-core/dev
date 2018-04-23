import {assign} from 'ctx-core/object/lib.mjs'
import env from 'ctx-core/env.mjs'
import {$version} from 'ctx-core/version__app/node.mjs'
import {$versioned__js as $versioned__js__} from 'ctx-core/html/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/html/node.mjs'
export function $versioned__js(src__script, opts={}) {
  return $versioned__js__(env, src__script, opts)
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

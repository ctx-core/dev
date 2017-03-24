import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/env'
import {$version} from 'ctx-core/version/node'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/html/node'
export function $versioned__js(script$src, opts={}) {
  const extName = (!opts.debug && env.minify) ? '.min.js' : '.js'
  return $versioned(`${script$src}${extName}`)
}
/**
 * versioned file
 * @param {string} url
 * @returns {string}
 */
export function $versioned(url) {
  return `${url}?${$version$query()}`
}
/**
 * version query param
 * @returns {string}
 */
export function $version$query() {
  return `v=${encodeURIComponent($version())}`
}
/**
 * Returns a new html$ctx
 * @typedef {function} $html$ctx
 * @returns {module:ctx-core/html/lib~html$ctx}
 */
/**
 * push $html$ctx$$ functions onto env
 * @param {...module:ctx-core/html/lib#$html$ctx} return values compose html$ctx
 */
export function compose__$html$ctx(...$html$ctx$$) {
  log(`${logPrefix}|compose__$html$ctx`)
  compose$list__$html$ctx().push(...$html$ctx$$)
  return env
}
export function compose$list__$html$ctx() {
  log(`${logPrefix}|compose$list__$html$ctx`)
  let {compose$list__$html$ctx = []} = env
  env.compose$list__$html$ctx = compose$list__$html$ctx
  return compose$list__$html$ctx
}
/**
 * Returns a new html$ctx
 * @param ctx
 * @param html$ctx$$
 * @returns {{}}
 */
export function $html$ctx(ctx, ...html$ctx$$) {
  log(`${logPrefix}|$html$ctx`)
  return assign({
    CACHE_VERSION: $version(),
    VERSION: ctx.VERSION
  }, ...html$ctx$$)
}
export const $html$ctx__core = $html$ctx

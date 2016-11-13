/**
 * @module ctx-core/html/lib
 */
import {assign,clone} from 'ctx-core/object/lib'
import env from 'ctx-core/html/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/html/lib'
/**
 * Returns a string of attrs for an html element
 * @param {Object} obj - Key/Value pairs of the attrs
 * @returns {String} The attrs for an html element
 */
export function $attrs(obj) {
  if (!obj) return ''
  let $$ = []
  for (let key in obj) {
    $$.push(`${key}=${$html(obj[key])}`)
  }
  return $$.join(' ')
}
/**
 * Returns a string of escaped html
 * @param {string} unsafe
 * @returns {XML|string} - Escaped HTML
 */
export function $html(unsafe) {
  return unsafe
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;')
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
  return clone(...html$ctx$$)
}
/**
 * html for css link tags
 * @returns {string}
 */
export function $links__html() {
  log(`${logPrefix}|$links__html`)
  const ctx = assign({
            css: [],
            indentation: '',
            indentFirstLine: true
          }, ...arguments)
      , {css, indentation, indentFirstLine} = ctx
  let $ = []
  for (let i=0; i < css.length; i++) {
    const cssFile = css[i]
    $.push(
      `${
        (i || indentFirstLine) ? indentation : ''
      }<link rel="stylesheet" type="text/css" href="${cssFile}">`
    )
  }
  return $.join('\n')
}
/**
 * versioned css file url
 * @param script$src
 */
export function $css$path__versioned(script$src) {
  log(`${logPrefix}|$js$path__versioned`)
  const extName = '.css'
  return versioned(`${script$src}${extName}`)
}
/**
 * html for js script tags
 * @returns {string}
 */
export function html__js() {
  log(`${logPrefix}|html__js`)
  const ctx = assign({js: [], indentation: '', indentFirstLine: true}, ...arguments)
      , {indentation, indentFirstLine} = ctx
      , script = ctx.script || ctx.js
  let html$$ = []
  for (let i = 0; i < script.length; i++) {
    const jsFile = script[i]
    html$$.push(
      `${indentation}<script type="text/javascript" src="${jsFile}"></script>`
    )
  }
  return html$$.join('\n')
}
/**
 * @deprecated
 * @type {html__js}
 */
export const html_js = html__js
export function $js$path__versioned(script$src) {
  log(`${logPrefix}|$js$path__versioned`)
  const extName = env.minify ? '.min.js' : '.js'
  return versioned(`${script$src}${extName}`)
}
/**
 * versioned file
 * @param {string} url
 * @returns {string}
 */
export function versioned(url) {
  log(`${logPrefix}|versioned`)
  return `${url}?${version$query()}`
}
/**
 * version query param
 * @returns {string}
 */
export function version$query() {
  return `v=${encodeURIComponent(env.CACHE_VERSION)}`
}
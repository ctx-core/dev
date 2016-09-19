/**
 * @module ctx-core/html/lib
 */
import {assign} from 'ctx-core/object/lib'
import {concat__array} from 'ctx-core/array/lib'
import env from 'ctx-core/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/html/lib'
let new__html$ctx__store = []
/**
 * Returns a new html$ctx
 * @typedef {function} new__html$ctx
 * @returns {module:ctx-core/html/lib~html$ctx}
 */
/**
 * push new__html$ctx$$ functions onto env
 * @param {...module:ctx-core/html/lib#new__html$ctx} return values compose html$ctx
 */
export function compose__new__html$ctx(...new__html$ctx$$) {
  log(`${logPrefix}|compose__new__html$ctx`)
  compose$list__new__html$ctx().push(...new__html$ctx$$)
  return env
}
export function compose$list__new__html$ctx() {
  log(`${logPrefix}|compose$list__new__html$ctx`)
  let {compose$list__new__html$ctx = []} = env
  env.compose$list__new__html$ctx = compose$list__new__html$ctx
  return compose$list__new__html$ctx
}
/**
 * Returns a new html$ctx
 * @param ctx
 * @param html$ctx$$
 * @returns {{}}
 */
export function new__html$ctx(ctx, ...html$ctx$$) {
  log(`${logPrefix}|new__html$ctx`)
  let html$ctx = {}
    , new__html$ctx
  for (let i = 0; i < new__html$ctx__store.length; i++) {
    new__html$ctx = new__html$ctx__store[i]
    assign(html$ctx, new__html$ctx(ctx, html$ctx))
  }
  assign(html$ctx, ...html$ctx$$)
  return html$ctx
}
/**
 * html for css link tags
 * @returns {string}
 */
export function html_css() {
  log(`${logPrefix}|html_css`)
  const ctx = assign({
            css: [],
            indentation: '',
            indentFirstLine: true
          }, ...arguments)
      , {css, indentation, indentFirstLine} = ctx
  return css.map((cssFile, i) => {
    return `${(i || indentFirstLine) ? indentation : ''}<link rel="stylesheet" type="text/css" href="${cssFile}">`
  }).join('\n')
}
/**
 * versioned css file url
 * @param script$src
 */
export function css$versioned(script$src) {
  log(`${logPrefix}|js$versioned`)
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
      , {js, indentation, indentFirstLine} = ctx
  return concat__array([],
    `${indentFirstLine ? indentation : ''}<script type="text/javascript">`,
    js.map(
      jsFile =>
        `${indentation}  document.write('<scr'+'ipt type="text/javascript" src="${jsFile}"></scr'+'ipt>')`
    ),
    `${indentation}</script>`
  ).join('\n')
}
/**
 * @deprecated
 * @type {html__js}
 */
export const html_js = html__js
export function js$versioned(script$src) {
  log(`${logPrefix}|js$versioned`)
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
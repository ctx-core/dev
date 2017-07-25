/**
 * @module ctx-core/html/lib
 */
import {assign} from 'ctx-core/object/lib'
import {$version} from 'ctx-core/version/lib'
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
 * Returns class html attribute from obj
 * @param {Object} obj - key/value pairs of classes. Truthy values will have key class added. Falsy values will have key class ignored.
 * @returns {string} List of classes
 * @example
 * $class({class_1: true, class_2: false, class_3: true}) // returns 'class_1 class_3'
 */
export function $class(obj) {
  const ar = []
  for (let key in obj) {
    if (obj[key]) ar.push(key)
  }
  return ar.join(' ')
}
/**
 * Assigns additional styles to the style attribute on the HTMLElement el.
 * @param {module:ctx-core/dom/lib~HTMLElement} el - Element to set style on. Existing styles are kept unless overwritten by obj.
 * @param {Object} obj - key/value pairs of the styles
 * @returns {module:ctx-core/dom/lib~HTMLElement}
 */
export function assign__style(el, obj) {
  const style__el = el.getAttribute('style')
      , obj__el = style$obj(style__el)
  el.setAttribute(
    'style',
    $style(assign(obj__el, obj))
  )
  return el
}
/**
 * Returns class style attribute from obj
 * @param {Object} obj - key/value pairs of styles
 * @returns {string} style
 * @example
 * $style({position: 'absolute, left: '5px'}) // returns 'position: absolute; left: 5px;'
 */
export function $style(obj) {
  const ar = []
  for (let key in obj) {
    const value = obj[key]
    if (value) ar.push(`${key}: ${value};`)
  }
  return ar.join(' ')
}
/**
 * Parses a style string & returns an object with each style
 * @param {string} style
 * @returns {Object} key/value pair of styles
 * @example
 * style$obj('position: absolute; left: 5px;') // returns {position: 'absolute, left: '5px'}
 */
export function style$obj(style) {
  const $$style = (style || '').split(/ *; */)
      , obj = {}
  for (let i=0; i < $$style.length; i++) {
    const _style = $$style[i]
        , [key, value] = _style.split(/ *: */)
    obj[key] = value
  }
  return obj
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
 * html for css link tags
 * @returns {string}
 */
export function $html__links() {
  log(`${logPrefix}|$html__links`)
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
 * html for js script tags
 * @returns {string}
 */
export function $html__js() {
  log(`${logPrefix}|$html__js`)
  const ctx = assign({js: [], indentation: '', indentFirstLine: true}, ...arguments)
      , {indentation} = ctx
      , script = ctx.script || ctx.js
  let $$ = []
  for (let i = 0; i < script.length; i++) {
    const jsFile = script[i]
    $$.push(
      `${indentation}<script type="text/javascript" src="${jsFile}"></script>`
    )
  }
  return $$.join('\n')
}
/**
 * versioned css file url
 * @param script$src
 */
export function $css$path__$versioned(script$src) {
  log(`${logPrefix}|$js$path__versioned`)
  const extName = '.css'
  return $versioned(`${script$src}${extName}`)
}
/**
 * @deprecated
 * @type {$html__js}
 */
export const html_js = $html__js
/**
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param src__script
 * @param opts
 * @returns {string}
 */
export function $versioned__js(ctx, src__script, opts={}) {
  const extName = (!opts.debug && ctx.minify) ? '.min.js' : '.js'
  return $versioned(ctx, `${src__script}${extName}`)
}
/**
 * versioned file
 * @param {module:ctx-core/object/lib~ctx}
 * @param {string} url
 * @returns {string}
 */
export function $versioned(ctx, url) {
  log(`${logPrefix}|versioned`)
  return `${url}?${$query__version(ctx)}`
}
/**
 * $versioned with ctx
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string}
 */
export function $$versioned(ctx) {
  log(`${logPrefix}|$$versioned`)
  return function $versioned__$$versioned() {
    return $versioned(ctx, ...arguments)
  }
}
/**
 * version query param
 * @returns {string}
 */
export function $query__version(ctx) {
  return `v=${encodeURIComponent($version(ctx))}`
}
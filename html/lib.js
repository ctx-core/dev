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
 * Returns class style attribute from obj
 * @param {Object} obj - key/value pairs of styles
 * @returns {string} List of classes
 * @example
 * $class({position: 'absolute, left: '5px'}) // returns 'position: absolute; left: 5px;'
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
 * versioned file
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
/**
 * @module ctx-core/html/lib
 */
import {assign} from 'ctx-core/object/lib.mjs'
import {_version} from 'ctx-core/version__app/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/html/lib.mjs'
/**
 * Returns a string of attrs for an html element
 * @param {Object} obj - Key/Value pairs of the attrs
 * @returns {String} The attrs for an html element
 */
export function _attrs(obj) {
  if (!obj) return ''
  let attrs = []
  for (let key in obj) {
    attrs.push(`${key}=${$html(obj[key])}`)
  }
  return attrs.join(' ')
}
export const $attrs = _attrs
/**
 * Returns class html attribute from obj
 * @param {Object} obj - key/value pairs of classes. Truthy values will have key class added. Falsy values will have key class ignored.
 * @returns {string} List of classes
 * @example
 * _class({class_1: true, class_2: false, class_3: true}) // returns 'class_1 class_3'
 */
export function _class(obj, ...array__classes) {
  const ar = [...array__classes]
  for (let key in obj) {
    if (obj[key]) ar.push(key)
  }
  return ar.join(' ')
}
export const $class = _class
/**
 * Assigns additional styles to the style attribute on the HTMLElement el.
 * @param {module:ctx-core/dom/lib~HTMLElement} el - Element to set style on. Existing styles are kept unless overwritten by obj.
 * @param {Object} styles - key/value pairs of the styles
 * @returns {module:ctx-core/dom/lib~HTMLElement}
 */
export function assign__style(el, styles) {
  const style__el = el.getAttribute('style')
      , styles__el = $styles__obj(style__el)
  el.setAttribute(
    'style',
    _style(assign(styles__el, styles))
  )
  return el
}
/**
 * Returns class style attribute from obj
 * @param {Object} obj - key/value pairs of styles
 * @returns {string} style
 * @example
 * _style({position: 'absolute, left: '5px'}) // returns 'position: absolute; left: 5px;'
 */
export function _style(obj) {
  const ar = []
  for (let key in obj) {
    const value = obj[key]
    ar.push(`${key}: ${value};`)
  }
  return ar.join(' ')
}
export const $style = _style
/**
 * Parses a style string & returns an object with each style
 * @param {string} styles__strings
 * @returns {Object} key/value pair of styles
 * @example
 * $styles__obj('position: absolute; left: 5px;') // returns {position: 'absolute, left: '5px'}
 */
export function _styles__obj(styles__strings) {
  const style__strings = (styles__strings || '').split(/ *; */)
      , styles = {}
  for (let i=0; i < style__strings.length; i++) {
    const style__string = style__strings[i]
        , [ name__style
          , value__style
          ] = style__string.split(/ *: */)
    styles[name__style] = value__style
  }
  return styles
}
export const $styles__obj = _styles__obj
/**
 * Returns a string of escaped html
 * @param {string} unsafe
 * @returns {XML|string} - Escaped HTML
 */
export function _html(unsafe) {
  return unsafe
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;')
}
export const $html = _html
/**
 * html for css link tags
 * @returns {string}
 */
export function _html__links() {
  log(`${logPrefix}|$html__links`)
  const ctx = assign({
            css: [],
            indentation: '',
            indentFirstLine: true
          }, ...arguments)
      , { css
        , indentation
        , indentFirstLine
        } = ctx
  let array__html__links = []
  for (let i=0; i < css.length; i++) {
    const cssFile = css[i]
    array__html__links.push(
      `${
        (i || indentFirstLine) ? indentation : ''
      }<link rel="stylesheet" type="text/css" href="${cssFile}">`
    )
  }
  return array__html__links.join('\n')
}
export const $html__links = _html__links
/**
 * html for js script tags
 * @returns {string}
 */
export function _html__js() {
  log(`${logPrefix}|_html__js`)
  const ctx =
          assign(
            { js: [],
              indentation: '',
              indentFirstLine: true},
            ...arguments)
      , {indentation} = ctx
      , script = ctx.script || ctx.js
  let array__html__js = []
  for (let i = 0; i < script.length; i++) {
    const jsFile = script[i]
    array__html__js.push(
      `${indentation}<script type="text/javascript" src="${jsFile}"></script>`
    )
  }
  return array__html__js.join('\n')
}
export const $html__js = _html__js
/**
 * versioned css file url
 * @param src__script
 */
export function _css__path__versioned(src__script) {
  log(`${logPrefix}|$js$path__versioned`)
  const extName = '.css'
  return _versioned(`${src__script}${extName}`)
}
export const $css__path__versioned = _css__path__versioned
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
export function _versioned__js(ctx, src__script, opts={}) {
  const extName = (!opts.debug && ctx.minify) ? '.min.js' : '.js'
  return _versioned(ctx, `${src__script}${extName}`)
}
export const $versioned__js = _versioned__js
/**
 * versioned file
 * @param {module:ctx-core/object/lib~ctx}
 * @param {string} url
 * @returns {string}
 */
export function _versioned(ctx, url) {
  log(`${logPrefix}|versioned`)
  return `${url}?${_query__version(ctx)}`
}
export const $versioned = _versioned
/**
 * _versioned with ctx
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string}
 */
export function __versioned(ctx) {
  log(`${logPrefix}|$$versioned`)
  return function _versioned__versioned() {
    return _versioned(ctx, ...arguments)
  }
}
export const $$versioned = __versioned
/**
 * version query param
 * @returns {string}
 */
export function _query__version(ctx) {
  return `v=${encodeURIComponent(_version(ctx))}`
}
export const $query__version = _query__version
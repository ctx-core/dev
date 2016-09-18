/**
 * number library
 * @module ctx-core/agent/lib
 */
/**
 * DOM HTMLElement
 * @typedef HTMLElement
 */
/**
 * DOM NodeList
 * @typedef NodeList
 */
import {assign,clone,keys} from 'ctx-core/object/lib'
import {string$url$anchor} from 'ctx-core/string/lib'
import {throw__invalid_argument} from 'ctx-core/error/lib'
import classes__dom from 'dom-classes'
import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/lib'
/**
 * The first matching HTMLElement from the selector
 * @param {string} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {module:ctx-core/dom/lib~HTMLElement} the first HTMLElement matching the selector
 */
export function $dom(selector, parent) {
  return (parent || document).querySelector(selector)
}
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function $dom$$(selector, ctx) {
  return (ctx || document).querySelectorAll(selector)
}
/**
 * Is the HTMLElement hidden?
 * @param {module:ctx-core/dom/lib~HTMLElement} el
 * @returns {boolean} true if `el` is hidden
 */
export function dom$hidden(el) {
  return !(el.offsetParent)
}
/**
 * Is the HTMLElement visible?
 * @param {module:ctx-core/dom/lib~HTMLElement} el
 * @returns {boolean} true if `el` is visible
 */
export function dom$visible(el) {
  return !!(el.offsetParent)
}
/**
 * Calls document.registerElement if the element is not already registered
 * @param {string} element$name
 * @returns {function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function registerElement(element$name) {
  log(`${logPrefix}|registerElement`)
  let constructor = element$constructor(element$name)
  if (document.registerElement && !constructor) {
    constructor = document.registerElement(...arguments)
  }
  return constructor
}
/**
 * Sets classes on the $dom element
 * @param {module:ctx-core/dom/lib~HTMLElement} el
 * @param {...Object.<string,boolean>} classes__css - add or remove `class__css` on `el`
 * @example
 * set__class(el, {
 *   show: should__show,
 *   compact: should__compact
 * })
 */
export function set__class(el, ...classes__css) {
  let ctx
  if (classes__css.length === 2) {
    ctx = {}
    ctx[classes__css[0]] = classes__css[1]
  } else {
    ctx = classes__css[0]
  }
  for (let className in ctx) {
    const op = ctx[className] ? 'add' : 'remove'
    classes__dom[op](el, className)
  }
}
/**
 * Is element$name registered in the DOM?
 * @param {string} element$name
 * @returns {boolean} true if element$name is registered in the dom
 */
export function element$isRegistered(element$name) {
  log(`${logPrefix}|element$isRegistered`)
  return element$constructor(element$name) !== HTMLElement
}
/**
 * The constructor for DOM element element$name
 * @param {string} element$name
 * @returns {Function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function element$constructor(element$name) {
  log(`${logPrefix}|element$constructor`)
  return document.createElement(element$name).constructor
}
/**
 * The ctx from the query params in `window.location.anchor` formatted as a url
 * @typedef {module:ctx-core/object/lib~ctx} anchor$ctx
 */
/**
 * Returns an anchor$ctx
 * @param {Object.<string,function>} transform$ctx- Transform Functions for the `window.location.anchor` query params
 * @returns {module:ctx-core/dom/lib~anchor$ctx}
 * @example
 * new__url$anchor({
 *   id: parseInt
 * })
 */
export function new__url$anchor(transform$ctx) {
  log(`${logPrefix}|new__url$anchor`)
  transform$ctx = assign({
    row_id: (value, key) => parseFloat(value)
  }, transform$ctx)
  const string$url$anchor$ = string$url$anchor(window.location.href)
      , string$url$anchor$decodeURIComponent = decodeURIComponent(string$url$anchor$)
  let anchor$ctx = {}
  if (string$url$anchor$decodeURIComponent) {
    anchor$ctx = string$url$anchor$decodeURIComponent
      .split('&')
      .map(decodeURIComponent)
      .map(uriComponent => uriComponent.split('='))
      .reduce(
        (memo, uriPart$$) => {
          const key = uriPart$$[0]
              , value = uriPart$$[1]
              , transform = transform$ctx[key]
              , value_transform =
                  transform
                  ? transform(value, key)
                  : value
          memo[key] = value_transform
          return memo
        }, {}
      )
  }
  return anchor$ctx
}
/**
 * assign the query params from `window.location.anchor` to the `ctx`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/object/lib~ctx} ctx$rest - The rest of the assigned `ctx`
 */
export function assign__url$anchor() {
  log(`${logPrefix}|assign__url$anchor`)
  let ctx = assign__url$anchor({}, new__url$anchor(), ...arguments)
  const ctx$location$hash = keys(ctx)
        .map(
          key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(ctx[key])}`)
        .join('&')
  window.location.hash = ctx$location$hash
  return ctx
}
/**
 * The ctx for fit functions
 * @typedef {module:ctx-core/object/lib~ctx} fit$ctx
 * @property {module:ctx-core/dom/lib~HTMLElement} container$dom - The container HTMLElement
 * @property {module:ctx-core/dom/lib~HTMLElement} el$dom - The el HTMLElement
 * @property {float} [step=0.1] - delta for each `fontSize` step
 * @property {int} [max_iterations=100] - maximum number of iterations. warning if exceeded
 */
/**
 * Fit `fit$ctx.el$dom` inside of ``
 * @param {...module:ctx-core/object/lib~ctx} ctx$clone
 */
export function fit__downscale__fontSize(ctx) {
  log(`${logPrefix}|fit__downscale__fontSize`)
  const ctx$clone = clone(...arguments)
      , { container$dom
        , el$dom
        , step = 0.1
        , max_iterations = 100} = ctx$clone
  if (!container$dom) throw__invalid_argument(ctx$clone, {key: 'container$dom'})
  if (!el$dom) throw__invalid_argument(ctx$clone, {key: 'el$dom'})
  let {fontSize} = ctx$clone
  set__fontSize(fontSize)
  el$dom.style.color = 'transparent'
  let width = el$dom.style.width
  try {
    el$dom.style.width = 'auto'
    let iteration = 0
    while (el$dom.clientWidth > container$dom.clientWidth) {
      iteration++
      if (iteration > max_iterations) {
        warn(`${logPrefix}|fit__downscale__fontSize|iterations`)
        break
      }
      set__fontSize(fontSize - Math.abs(step))
    }
  } finally {
    el$dom.style.color = ''
    el$dom.style.width = width
  }
  assign(ctx, {
    container$dom,
    el$dom,
    step,
    max_iterations,
    fontSize
  })
  return ctx
  function set__fontSize(fontSize$rem = fontSize) {
    fontSize = fontSize$rem
    el$dom.style.fontSize = `${fontSize}rem`
  }
}
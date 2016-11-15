/**
 * number library
 * @module ctx-core/agent/lib
 */
/**
 * DOM Node
 * @typedef Node
 */
/**
 * DOM HTMLElement
 * @typedef {module:ctx-core/dom/lib~Node} HTMLElement
 */
/**
 * DOM NodeList
 * @typedef NodeList
 */
import {assign,clone} from 'ctx-core/object/lib'
import {string$url$anchor} from 'ctx-core/string/lib'
import {throw__invalid_argument} from 'ctx-core/error/lib'
import classes__dom from 'dom-classes'
import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/lib'
export function has$dom() {
  log(`${logPrefix}|has$dom`)
  return typeof window === 'object'
}
export function no$dom() {
  log(`${logPrefix}|no$dom`)
  return typeof window === 'undefined'
}
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
export function $$dom(selector, ctx) {
  return (ctx || document).querySelectorAll(selector)
}
/**
 * Returns the first matching dom element in el -> ...parent
 * @param {module:ctx-core/dom/lib~HTMLElement} element
 * @param {string} selector
 * @param {boolean} check__self
 * @returns {*|Node}
 */
export function closest(element, selector, check__self) {
  log(`${logPrefix}|closest`)
  let $ = check__self
      ? element
      : element.parentNode
  while ($ && $ !== document) {
    if (matches($, selector)) return $
    $ = $.parentNode
  }
}
/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
function matches(el, selector) {
  const vendor = $vendor__matches()
  if (vendor) return vendor.call(el, selector)
  const {parentNode} = el
  if (!parentNode) return
  const nodes = $$dom(selector, parentNode)
  for (let i=0; i < nodes.length; i++) {
    if (nodes[i] == el) return true
  }
}
let proto
function $vendor__matches() {
  if (!proto) {
    if (typeof Element === 'undefined') return
    proto = Element.prototype
  }
  return  proto.matchesSelector
          || proto.webkitMatchesSelector
          || proto.mozMatchesSelector
          || proto.msMatchesSelector
          || proto.oMatchesSelector
}
export function offset(el) {
  log(`${logPrefix}|offset`);
  let top = 0
    , left = 0
  do {
    top += el.offsetTop  || 0
    left += el.offsetLeft || 0
    el = el.offsetParent
  } while(el)

  return  {
            top: top,
            left: left
          }
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
 * @param {string} name__element
 * @returns {function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function registerElement(ctx, name__element) {
  log(`${logPrefix}|registerElement`)
  let constructor = element$constructor(name__element)
  if (document.registerElement && !constructor) {
    constructor = document.registerElement(...arguments)
  }
  ensure__registeredElements(ctx)
  ctx.registeredElements.push(name__element)
  return constructor
}
/**
 * Ensures `ctx.registerElements` is defined
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function ensure__registeredElements(ctx) {
  if (!ctx.registeredElements) assign(ctx, {registeredElements: []})
  return ctx
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
  return el
}
/**
 * Is name__element registered in the DOM?
 * @param {string} name__element
 * @returns {boolean} true if name__element is registered in the dom
 */
export function element$isRegistered(name__element) {
  log(`${logPrefix}|element$isRegistered`)
  return element$constructor(name__element) !== HTMLElement
}
/**
 * The constructor for DOM element name__element
 * @param {string} name__element
 * @returns {Function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function element$constructor(name__element) {
  log(`${logPrefix}|element$constructor`)
  return document.createElement(name__element).constructor
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
 * $url$anchor({
 *   id: parseInt
 * })
 */
export function $url$anchor(transform$ctx) {
  log(`${logPrefix}|$url$anchor`)
  transform$ctx = assign({
    row_id: (value, key) => parseFloat(value)
  }, transform$ctx)
  const string$url$anchor$ = string$url$anchor(window.location.href)
      , decodeURIComponent__string$url$anchor$ =
          decodeURIComponent(string$url$anchor$)
  let anchor$ctx = {}, $anchor$ctx
  if (decodeURIComponent__string$url$anchor$) {
    $anchor$ctx = decodeURIComponent__string$url$anchor$.split('&')
    $decodeURIComponent()
    $split__uriComponent()
    reduce($anchor$ctx)
  }
  return anchor$ctx
  function $decodeURIComponent() {
    let $$anchor$ctx = []
    for (let i=0; i < $anchor$ctx.length; i++) {
      $$anchor$ctx.push(decodeURIComponent($anchor$ctx[i]))
    }
    $anchor$ctx = $$anchor$ctx
    return $$anchor$ctx
  }
  function $split__uriComponent() {
    let $$anchor$ctx = []
    for (let i=0; i < $anchor$ctx.length; i++) {
      const uriComponent = $anchor$ctx[i]
      $$anchor$ctx.push(uriComponent.split('='))
    }
    $anchor$ctx = $$anchor$ctx
    return $$anchor$ctx
  }
  function reduce($anchor$ctx) {
    for (let i=0; i < $anchor$ctx.length; i++) {
      const uriPart$$ = $anchor$ctx[i]
          , key = uriPart$$[0]
          , value = uriPart$$[1]
          , transform = transform$ctx[key]
          , value_transform =
              transform
              ? transform(value, key)
              : value
      anchor$ctx[key] = value_transform
    }
    return anchor$ctx
  }
}
/**
 * assign the query params from `window.location.anchor` to the `ctx`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/object/lib~ctx} ctx$rest - The rest of the assigned `ctx`
 */
export function assign__url$anchor() {
  log(`${logPrefix}|assign__url$anchor`)
  if (no$dom()) return ctx
  let ctx = assign__url$anchor({}, $url$anchor(), ...arguments)
    , ctx$location$hash$$ = []
  for (let key in ctx) {
    ctx$location$hash$$.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(ctx[key])}`)
  }
  const ctx$location$hash = ctx$location$hash$$.join('&')
  window.location.hash = ctx$location$hash
  return ctx
}
/**
 * The ctx for fit functions
 * @typedef {module:ctx-core/object/lib~ctx} fit$ctx
 * @property {module:ctx-core/dom/lib~HTMLElement} container - The container HTMLElement
 * @property {module:ctx-core/dom/lib~HTMLElement} el - The el HTMLElement
 * @property {float} [step=0.1] - delta for each `fontSize` step
 * @property {integer} [max_iterations=100] - maximum number of iterations. warning if exceeded
 */
/**
 * Fit `fit$ctx.el` inside of ``
 * @param {...module:ctx-core/object/lib~ctx} ctx$clone
 */
export function fit__downscale__fontSize(ctx) {
  if (no$dom()) return ctx
  ensure__px$em(ctx)
  const ctx$clone = clone(...arguments)
      , { container
        , el
        , step = 0.1
        , max_iterations = 100} = ctx$clone
      , step$ = Math.abs(step)
  if (!container) throw__invalid_argument(ctx$clone, {key: 'container'})
  if (!el) throw__invalid_argument(ctx$clone, {key: 'el'})
  let fontSize =
        ctx$clone.fontSize
        || parseFloat(getComputedStyle(el).getPropertyValue('font-size'))
           / ctx.px$rem
        || 1.0
  set__fontSize(fontSize)
  el.style.color = 'transparent'
  let {width} = el.style
  try {
    el.style.width = 'auto'
    let iteration = 0
    const computedStyle__container = getComputedStyle(container)
        , paddingLeft =
            parseInt(computedStyle__container.getPropertyValue('padding-left'))
            || 0
        , paddingRight =
            parseInt(computedStyle__container.getPropertyValue('padding-right'))
            || 0
        , padding = paddingLeft + paddingRight
    while ((el.scrollWidth + padding) > container.offsetWidth) {
      iteration++
      if (iteration > max_iterations) {
        warn(`${logPrefix}|fit__downscale__fontSize|iterations`)
        break
      }
      const fontSize$ = fontSize - step$
      if (!fontSize$ || fontSize$ <= step$) break
      set__fontSize(fontSize$)
    }
  } finally {
    el.style.color = ''
    el.style.width = width
  }
  assign(ctx, {
    container,
    el,
    step,
    max_iterations,
    fontSize
  })
  return ctx
  function set__fontSize(fontSize$rem = fontSize) {
    fontSize = fontSize$rem
    el.style.fontSize = `${fontSize}rem`
  }
}
export function ensure__px$em(ctx) {
  if (!ctx.px$rem) assign__px$rem(ctx)
  return ctx
}
export function assign__px$rem(ctx) {
  log(`${logPrefix}|assign__px$rem`)
  if (no$dom()) return ctx
  let div = document.createElement('div')
  div.innerHTML = '&nbsp;'
  assign(div.style, {
    display: 'block',
    visibility: 'none',
    fontSize: '1em',
    margin: 0,
    padding:0,
    height: 'auto',
    lineHeight: 1,
    border:0
  })
  let px$rem
  try {
    document.body.appendChild(div)
    px$rem = div.offsetHeight
  } finally {
    div.remove()
  }
  assign(ctx, {px$rem})
  return ctx
}
export function scrollTop(el, scrollWindow = true) {
  log(`${logPrefix}|scrollTop`)
  if (no$dom()) return el
  if (scrollWindow) window.scrollTo(0, 0)
  el.scrollTop = 0
  const {parentElement} = el
  if (parentElement) scrollTop(parentElement, false)
  return el
}
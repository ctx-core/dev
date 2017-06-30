/**
 * dom library
 * @module ctx-core/dom/lib
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
import {assign} from 'ctx-core/object/lib'
import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/lib'
export function has__dom() {
  return typeof window === 'object'
}
export function no__dom() {
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
 * The first matching HTMLElement from the selector
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {module:ctx-core/dom/lib~HTMLElement} the first HTMLElement matching the selector
 */
export function $dom2(selector) {
  if (typeof selector === 'object') return selector
  return $dom(...arguments)
}
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function $$dom(selector, ctx) {
  if (typeof selector === 'object') return selector
  return (ctx || document).querySelectorAll(selector)
}
/**
 * All matching HTMLElements from the selector.
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function $$dom2(selector) {
  if (typeof selector === 'object') return selector
  return $$dom(...arguments)
}
/**
 * Returns true if it is a DOM node
 * @param {object} obj
 * @returns {boolean}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
function isNode(obj) {
  return (
    typeof Node === "object" ? obj instanceof Node :
    obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
  )
}
/**
 * Returns true if it is a DOM element
 * @param {object} obj
 * @returns {*}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
function isElement(obj) {
  return (
    typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
    obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string"
)
}/**
 * Returns the first matching dom element in el -> ...parent
 * @param {module:ctx-core/dom/lib~HTMLElement} element
 * @param {string} selector
 * @param {boolean} check__self
 * @returns {*|Node}
 */
export function closest(selector, element, check__self) {
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
  log(`${logPrefix}|offset`)
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
  let constructor = constructor__element(name__element)
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
  if (!ctx.registeredElements) ctx.registeredElements = []
  return ctx
}
/**
 * Is name__element registered in the DOM?
 * @param {string} name__element
 * @returns {boolean} true if name__element is registered in the dom
 */
export function isRegistered__element(name__element) {
  log(`${logPrefix}|isRegistered__element`)
  return constructor__element(name__element) !== HTMLElement
}
/**
 * The constructor for DOM element name__element
 * @param {string} name__element
 * @returns {Function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function constructor__element(name__element) {
  log(`${logPrefix}|constructor__element`)
  return document.createElement(name__element).constructor
}
/**
 * The ctx from the query params in `window.location.hash` formatted as a url
 * @typedef {module:ctx-core/object/lib~ctx} query__hash__location
 */
/**
 * Returns an query__hash__location
 * @param {Object.<string,function>} ctx__transform- Transform Functions for the `window.location.anchor` query params
 * @returns {module:ctx-core/dom/lib~query__hash__location}
 * @example
 * $query__hash__location({
 *   id: parseInt
 * })
 */
export function $query__hash__location(ctx__transform) {
  log(`${logPrefix}|$query__hash__location`)
  ctx__transform = assign({
    row_id: (value, key) => parseFloat(value)
  }, ctx__transform)
  const hash__url__string = $hash__url__string(window.location.href)
      , decodeURIComponent__hash__url__string =
          decodeURIComponent(hash__url__string)
  let query__hash__location = {}, _query__hash__location
  if (decodeURIComponent__hash__url__string) {
    _query__hash__location = decodeURIComponent__hash__url__string.split('&')
    $decodeURIComponent()
    $split__uriComponent()
    reduce(_query__hash__location)
  }
  return query__hash__location
  function $decodeURIComponent() {
    let __query__hash__location = []
    for (let i=0; i < _query__hash__location.length; i++) {
      __query__hash__location.push(decodeURIComponent(_query__hash__location[i]))
    }
    _query__hash__location = __query__hash__location
    return __query__hash__location
  }
  function $split__uriComponent() {
    let __query__hash__location = []
    for (let i=0; i < _query__hash__location.length; i++) {
      const uriComponent = _query__hash__location[i]
      __query__hash__location.push(uriComponent.split('='))
    }
    _query__hash__location = __query__hash__location
    return __query__hash__location
  }
  function reduce(_query__hash__location) {
    for (let i=0; i < _query__hash__location.length; i++) {
      const uriPart$$ = _query__hash__location[i]
          , key = uriPart$$[0]
          , value = uriPart$$[1]
          , transform = ctx__transform[key]
          , value_transform =
              transform
              ? transform(value, key)
              : value
      query__hash__location[key] = value_transform
    }
    return query__hash__location
  }
}
/**
 * assign the query params from `window.location.hash` to the `ctx`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/object/lib~ctx} opts - The rest of the assigned `ctx`
 */
export function assign__query__hash__location() {
  log(`${logPrefix}|assign__query__hash__location`)
  if (no__dom()) return {}
  let ctx = assign__query__hash__location({}, $query__hash__location(), ...arguments)
    , $$hash = []
  for (let key in ctx) {
    $$hash.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(ctx[key])}`)
  }
  const hash = $$hash.join('&')
  window.location.hash = hash
  return ctx
}
/**
 * Scroll to the top of the parentElement
 * @param {module:ctx-core/dom/lib~Node} el
 * @param {boolean} [scrollWindow=true]
 * @returns {module:ctx-core/dom/lib~Node}
 */
export function scrollTop(el, scrollWindow = true) {
  log(`${logPrefix}|scrollTop`)
  if (no__dom()) return el
  if (scrollWindow) window.scrollTo(0, 0)
  el.scrollTop = 0
  const {parentElement} = el
  if (parentElement) scrollTop(parentElement, false)
  return el
}
/**
 * Remove hash from `window.location.href` without refreshing the page
 */
export function empty__window$location() {
  log(`${logPrefix}|empty__window$location`)
  window.location.replace('#')
  if (typeof window.history.replaceState == 'function') {
    history.replaceState({}, '', window.location.href.slice(0, -1))
  }
}
export function contains__class(el, class_name) {
  return el.classList.contains(class_name)
}
export const has__class = contains__class
export function set__class(el, class_name, value) {
  let op = value ? 'add' : 'remove'
  return el.classList[op](class_name)
}
export function add__class(el, class_name) {
  return el.classList.add(class_name)
}
export function toggle__class(el, class_name) {
  return el.classList.toggle(class_name)
}
export function remove__class(el, class_name) {
  return el.classList.remove(class_name)
}
export function check__element(el) {
  log(`${logPrefix}|check__element`)
  const {checked} = el
  if (!checked) {
    el.checked = true
  }
  const click__event = document.createEvent('HTMLEvents')
  click__event.initEvent('click', true, false)
  el.dispatchEvent(click__event)
  if (!checked) {
    const change__event = document.createEvent('HTMLEvents')
    change__event.initEvent('change', true, false)
    el.dispatchEvent(change__event)
  }
  return el
}
export function $hash__url__string(url) {
  const index__hash = url.indexOf('#')
  return index__hash != -1 ? url.substring(index__hash+1) : ''
}
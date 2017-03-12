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
import {string$url$anchor} from 'ctx-core/string/lib'
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
function isNode(obj){
  return (
    typeof Node === "object" ? obj instanceof Node :
    obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
  );
}
/**
 * Returns true if it is a DOM element
 * @param {object} obj
 * @returns {*}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
function isElement(obj){
  return (
    typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
    obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string"
);
}/**
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
  if (!ctx.registeredElements) assign(ctx, {registeredElements: []})
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
 * Scroll to the top of the parentElement
 * @param {module:ctx-core/dom/lib~Node} el
 * @param {boolean} [scrollWindow=true]
 * @returns {module:ctx-core/dom/lib~Node}
 */
export function scrollTop(el, scrollWindow = true) {
  log(`${logPrefix}|scrollTop`)
  if (no$dom()) return el
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
export function set__class(el, class$, value) {
  let op = value ? 'add' : 'remove'
  return el.classList[op](class$)
}
export function add__class(el, class$) {
  return el.classList.add(class$)
}
export function contains__class(el, class$) {
  return el.classList.contains(class$)
}
export const has__class = contains__class
export function toggle__class(el, class$) {
  return set(el, class$, !(contains(el, class$)))
}
export function remove__class(el, class$) {
  return el.classList.remove(class$)
}
export function check__element(el) {
  log(`${logPrefix}|check__element`)
  const {checked} = el
  if (!checked) {
    el.checked = true
  }
  const click__event = document.createEvent('HTMLEvents');
  click__event.initEvent('click', true, false);
  el.dispatchEvent(click__event);
  if (!checked) {
    const change__event = document.createEvent('HTMLEvents');
    change__event.initEvent('change', true, false);
    el.dispatchEvent(change__event);
  }
  return el
}
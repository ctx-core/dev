import {assign,clone} from 'ctx-core/object/lib'
import {no__dom} from 'ctx-core/dom/lib'
import {throw__invalid_argument} from 'ctx-core/error/lib'
import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/font/dom'
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
 * @param {...module:ctx-core/object/lib~ctx} ctx__clone
 */
export function fit__downscale__fontSize(ctx) {
  if (no__dom()) return ctx
  ensure__px__em(ctx)
  const ctx__clone = clone(...arguments)
      , { container
        , el
        , step = 0.1
        , max_iterations = 100} = ctx__clone
      , step$ = Math.abs(step)
  if (!container) throw__invalid_argument(ctx__clone, {key: 'container'})
  if (!el) throw__invalid_argument(ctx__clone, {key: 'el'})
  let fontSize =
        ctx__clone.fontSize
        || parseFloat(getComputedStyle(el).getPropertyValue('font-size'))
           / ctx.px__rem
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
export function ensure__px__em(ctx) {
  if (!ctx.px__rem) assign__px__rem(ctx)
  return ctx
}
export function assign__px__rem(ctx) {
  log(`${logPrefix}|assign__px__rem`)
  if (no__dom()) return ctx
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
  let px__rem
  try {
    document.body.appendChild(div)
    px__rem = div.offsetHeight
  } finally {
    div.remove()
  }
  assign(ctx, {px__rem})
  return ctx
}

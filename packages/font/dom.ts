import { assign, clone } from '@ctx-core/object'
import { _no__dom } from '@ctx-core/dom'
import { throw__invalid_argument } from '@ctx-core/error'
import { warn } from '@ctx-core/logger'
const logPrefix = '@ctx-core/font/dom.js'
/**
 * The ctx for fit functions
 * @typedef {module:ctx-core/object/lib~ctx} ctx
 * @property {module:ctx-core/dom/lib~HTMLElement} container - The container HTMLElement
 * @property {module:ctx-core/dom/lib~HTMLElement} el - The el HTMLElement
 * @property {float} [step=0.1] - delta for each `fontSize` step
 * @property {integer} [max_iterations=100] - maximum number of iterations. warning if exceeded
 */
/**
 * Fit `ctx.el` inside of ``
 * @param {...module:ctx-core/object/lib~ctx} ctx__clone
 */
export function fit__downscale__fontSize(ctx) {
	if (_no__dom()) return ctx
	const ctx__clone = clone(...arguments)
	const {
		container,
		el,
		step = 0.1,
		max_iterations = 100
	} = ctx__clone
	const step__ = Math.abs(step)
	if (!container) throw__invalid_argument(ctx__clone, { key: 'container' })
	if (!el) throw__invalid_argument(ctx__clone, { key: 'el' })
	let fontSize =
		ctx__clone.fontSize
		|| parseFloat(
		getComputedStyle(el).getPropertyValue('font-size'))
		/ ctx.px__rem
		|| 1.0
	set__fontSize(fontSize)
	el.style.color = 'transparent'
	let { width } = el.style
	try {
		el.style.width = 'auto'
		let iteration = 0
		const computedStyle__container = getComputedStyle(container)
		const paddingLeft =
			parseInt(
				computedStyle__container
					.getPropertyValue('padding-left'))
			|| 0
		const paddingRight =
			parseInt(
				computedStyle__container
					.getPropertyValue('padding-right'))
			|| 0
		const padding = paddingLeft + paddingRight
		while ((el.scrollWidth + padding) > container.offsetWidth) {
			iteration++
			if (iteration > max_iterations) {
				warn(`${logPrefix}|fit__downscale__fontSize|iterations`)
				break
			}
			const fontSize__ = fontSize - step__
			if (!fontSize__ || fontSize__ <= step__) break
			set__fontSize(fontSize__)
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
	function set__fontSize(fontSize__rem = fontSize) {
		fontSize = fontSize__rem
		el.style.fontSize = `${fontSize}rem`
	}
}

import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/dom/element'
/**
 * The constructor for DOM element name__element
 * @param {string} name__element
 * @returns {Function} The {@link HTMLElement} constructor
 */
export function constructor__element(name__element) {
	return document.createElement(name__element).constructor
}
export function check__element(el) {
	log(`${logPrefix}|check__element`)
	const { checked } = el
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

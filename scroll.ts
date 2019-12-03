import { _dom, _no__dom } from './selector'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/dom/scroll'
/**
 * Scroll to the top of the parentElement
 * @param {Node} el
 * @param {boolean=} scrollWindow=true
 * @returns {Node}
 */
export function scrollTop(el, scrollWindow = true) {
	log(`${logPrefix}|scrollTop`)
	if (_no__dom()) return el
	if (scrollWindow) window.scrollTo(0, 0)
	el.scrollTop = 0
	const { parentElement } = el
	if (parentElement) scrollTop(parentElement, false)
	return el
}
export function anchor__scroll(href, root) {
	const target__href = _dom(href, root)
	if (target__href) {
		target__href.scrollIntoView()
		window.location.hash = href
	}
}
export function scrollIntoView__child__collection(parent, child) {
	const { top, height } = parent.getBoundingClientRect()
	const bottom = top + height
	const { top: top__child, height: height__child } = child.getBoundingClientRect()
	const bottom__child = top__child + height__child
	if (top__child < top) {
		child.scrollIntoView(true)
	} else if (bottom__child > bottom) {
		child.scrollIntoView({ block: 'end' })
	}
}
export function __click__anchor__scroll(event, root) {
	log(`${logPrefix}|__click__anchor__scroll`, event)
	event.preventDefault()
	const { currentTarget } = event
	const href = currentTarget.getAttribute('href')
	anchor__scroll(href, root)
}

import { _style } from '@ctx-core/html/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/ripple-effect/lib.js'
export function __click__ripple_effect(event) {
	log(`${logPrefix}|__click__ripple_effect`)
	const {
		currentTarget,
		clientX,
		clientY
	} = event
	const {
		left: left__currentTarget,
		top: top__currentTarget
	} = currentTarget.getBoundingClientRect()
	const div = document.createElement('div')
	const { offsetHeight, offsetWidth } = currentTarget
	const length = Math.min(offsetHeight, offsetWidth)
	const style = {
		height: `${length}px`,
		width: `${length}px`
	}
	const color__ripple = currentTarget.getAttribute('color__ripple')
	style.top = `${(clientY - top__currentTarget) - length / 2}px`
	style.left = `${(clientX - left__currentTarget) - length / 2}px`
	if (color__ripple) {
		style.background = color__ripple
	}
	div.classList.add('ripple-effect')
	div.setAttribute('style', _style(style))
	currentTarget.appendChild(div)
	window.setTimeout(
		() => currentTarget.removeChild(div),
		2000)
}
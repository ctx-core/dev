import { _style } from '@ctx-core/html'
import { log } from '@ctx-core/logger'
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
	const __style = {
		height: `${length}px`,
		width: `${length}px`,
		top: `${(clientY - top__currentTarget) - length / 2}px`,
		left: `${(clientX - left__currentTarget) - length / 2}px`,
		background: undefined,
	}
	const color__ripple = currentTarget.getAttribute('color__ripple')
	if (color__ripple) {
		__style.background = color__ripple
	}
	div.classList.add('ripple-effect')
	div.setAttribute('style', _style(__style))
	currentTarget.appendChild(div)
	setTimeout(()=>{
		div.classList.add('ripple-effect-start')
	}, 0)
	window.setTimeout(
		()=>currentTarget.removeChild(div),
		2000)
}

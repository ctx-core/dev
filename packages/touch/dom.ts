import { add__class } from '@ctx-core/dom'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/touch/dom.js'
export function mount__no_touch() {
	log(`${logPrefix}|mount__no_touch`)
	// modernizer-like touch workaround
	if (!('ontouchstart' in document.documentElement)) {
		add__class(document.documentElement, 'no-touch')
	}
}
export function enable__scrolling__touch(ctx) {
	log(`${logPrefix}|enable__scrolling__touch`)
	let { scrolling__touch } = ctx
	if (!scrolling__touch) {
		document.removeEventListener('touchmove',
			ontouchmove__disable)
		document.addEventListener('touchmove',
			ontouchmove__enable)
	}
}
export function disable__scrolling__touch(ctx) {
	log(`${logPrefix}|disable__scrolling__touch`)
	let { scrolling__touch } = ctx
	if (
		scrolling__touch == null
		|| scrolling__touch
	) {
		document.removeEventListener('touchmove',
			ontouchmove__enable)
		document.addEventListener('touchmove',
			ontouchmove__disable)
	}
}
function ontouchmove__enable() {
	log(`${logPrefix}|ontouchmove__enable`)
	return true
}
function ontouchmove__disable(e) {
	log(`${logPrefix}|ontouchmove__disable`)
	e.preventDefault()
}

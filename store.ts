import { writable } from 'svelte/store'
import { assign } from '@ctx-core/object'
import { _has__dom, _no__dom } from '@ctx-core/dom'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/font/store.js'
export const __px__rem = writable(null)
if (_has__dom()) {
	reload__px__rem()
}
export function reload__px__rem() {
	log(`${logPrefix}|reload__px__rem`)
	if (_no__dom()) return
	const div = document.createElement('div')
	div.innerHTML = '&nbsp;'
	assign(div.style, {
		display: 'block',
		visibility: 'none',
		fontSize: '1em',
		margin: 0,
		padding: 0,
		height: 'auto',
		lineHeight: 1,
		border: 0
	})
	let px__rem
	try {
		document.body.appendChild(div)
		px__rem = div.offsetHeight
	} finally {
		div.remove()
	}
	__px__rem.set(px__rem)
}

import { writable, derive, get } from 'svelte/store'
import { _has__dom } from '@ctx-core/dom'
export const __hostname = writable()
export const __pathname = writable()
const __bound__popstate__reload__location__window = writable()
export const __location__window = writable()
if (_has__dom()) {
	reset__location__window()
}
export function reset__location__window() {
	if (!_has__dom()) return
	if (!get(__bound__popstate__reload__location__window)) {
		__bound__popstate__reload__location__window.set(true)
		window.addEventListener('popstate', reset__location__window)
	}
	__location__window.set(window.location)
}
export const __hostname__location__window =
	derive([__hostname, __location__window],
	([hostname, location__window]) =>
		(location__window && location__window.__hostname) || hostname || '')
export const __pathname__location__window =
	derive([__pathname, __location__window],
	([pathname, location__window]) =>
		(location__window && location__window.pathname) || pathname || ''
)

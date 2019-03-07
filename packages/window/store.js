import { writable } from 'svelte/store.mjs'
import { store__load, derive__load } from '@ctx-core/store/lib.js'
import { _has__dom } from '@ctx-core/dom/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/window/store.js'
export const hostname = writable()
export const pathname = writable()
export const location__window = store__load(writable(), [], async () => {
	if (_has__dom()) {
		window.addEventListener(
			'popstate',
			event => store.reset__location__window())
		location__window.set(window.location)
	}
})
export const hostname__location__window = derive__load([hostname, location__window],
	($hostname, $location__window) =>
		($location__window && $location__window.hostname) || $hostname || '')
export const pathname__location__window = derive__load([pathname, location__window],
	($pathname, $location__window) =>
		($location__window && $location__window.pathname) || $pathname || ''
)

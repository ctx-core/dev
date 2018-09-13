import { mixin } from '@ctx-core/object/lib.mjs'
import { _mixin__store, compute } from '@ctx-core/store/lib.mjs'
import { _has__dom } from '@ctx-core/dom/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/window/store.mjs'
export const __store__location__window = _mixin__store('__store__location__window', async store => {
	mixin(store, {
		reset__location__window() {
			log(`${logPrefix}|__store__location__window|reset__location__window`)
			this.set({
				location__window: _has__dom() && window.location
			})
		}
	})
	if (_has__dom()) {
		window.addEventListener(
			'popstate',
			event => store.reset__location__window())
	}
	compute(store, {
		hostname__location__window: [
			'hostname',
			'location__window',
			(hostname, location__window) =>
				(location__window && location__window.hostname) || hostname || ''
		],
		pathname__location__window: [
			'pathname',
			'location__window',
			(pathname, location__window) =>
				(location__window && location__window.pathname) || pathname || ''
		]
	})
	return store.reset__location__window()
})
export async function reset__location__window(store) {
	await __store__location__window(store)
	store.reset__location__window()
}
import { _mixin__store, compute } from '@ctx-core/store/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/version__app/store.mjs'
export const __store__version__app = _mixin__store('__store__version__app', async store => {
	compute(store, {
		version__app: [
			'CACHE_VERSION',
			'VERSION',
			(CACHE_VERSION, VERSION) => CACHE_VERSION || VERSION || Math.random()
		],
		query__version__app: [
			'version__app',
			version__app => `v=${encodeURIComponent(version__app)}`
		]
	})
})

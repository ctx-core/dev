import { derive } from 'svelte/store.mjs'
import { __CACHE_VERSION, __VERSION } from '@ctx-core/env/store.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/version__app/store.js'
export const __version__app = derive([
		__CACHE_VERSION,
		__VERSION,
	],
	(CACHE_VERSION, VERSION) => CACHE_VERSION || VERSION || Math.random())
export const __query__version__app =
derive([__version__app],
	version__app => `v=${encodeURIComponent(version__app)}`)

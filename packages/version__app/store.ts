import { derived } from 'svelte/store'
import { __CACHE_VERSION, __VERSION } from '@ctx-core/env/store'
export const __version__app = derived([
		__CACHE_VERSION,
		__VERSION,
	],
	([CACHE_VERSION, VERSION])=>
		CACHE_VERSION
		|| VERSION
		|| Math.random())
export const __query__version__app =
	derived(__version__app,
		(version__app:string)=>
			`v=${encodeURIComponent(version__app)}`)

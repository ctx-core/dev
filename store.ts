import { writable, derived } from 'svelte/store'
export const __NODE_ENV = writable(process.env.NODE_ENV)
export const __CACHE_VERSION =
	writable(typeof process === 'object' && process.env.CACHE_VERSION)
export const __VERSION =
	writable(
		(typeof process === 'object' && (
			process.env.VERSION
			|| process.env.HEROKU_SLUG_COMMIT
		))
		|| Math.random())
export const __is__production =
	derived(__NODE_ENV,
		NODE_ENV =>
			NODE_ENV === 'prod'
			|| NODE_ENV === 'production')
export const __is__staging =
	derived(__NODE_ENV, NODE_ENV => NODE_ENV === 'staging')
export const __is__development =
	derived(__NODE_ENV,
		NODE_ENV =>
			NODE_ENV === 'dev'
			|| NODE_ENV === 'development')

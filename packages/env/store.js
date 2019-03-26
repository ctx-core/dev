import { writable, derive } from 'svelte/store'
export const __NODE_ENV = writable(process.env.NODE_ENV)
export const __CACHE_VERSION = writable(process.env.CACHE_VERSION)
export const __VERSION = writable(process.env.HEROKU_SLUG_COMMIT || Math.random())
export const __is__production = derive(__NODE_ENV, NODE_ENV => NODE_ENV === 'production')
export const __is__staging = derive(__NODE_ENV, NODE_ENV => NODE_ENV === 'staging')
export const __is__development = derive(__NODE_ENV, NODE_ENV => NODE_ENV === 'development')

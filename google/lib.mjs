import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/google/lib.mjs'
export function push__dataLayer() {
	log(`${logPrefix}|push__dataLayer`)
	window.dataLayer = window.dataLayer || []
	dataLayer.push(...arguments)
}
export function ga$() {
	log(`${logPrefix}|ga$`)
	ga(...arguments)
}
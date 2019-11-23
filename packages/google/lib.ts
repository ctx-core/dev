import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/google/lib.js'
declare const ga
export function push__dataLayer() {
	log(`${logPrefix}|push__dataLayer`)
	const dataLayer = window['dataLayer'] = window['dataLayer'] || []
	dataLayer.push(...arguments)
}
export function ga$() {
	log(`${logPrefix}|ga$`)
	ga(...arguments)
}

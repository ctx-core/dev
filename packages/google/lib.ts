import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/google/lib.js'
declare const ga
export function push__dataLayer(obj, ...arg_a1:any[]) {
	log(`${logPrefix}|push__dataLayer`)
	const dataLayer = window['dataLayer'] = window['dataLayer'] || []
	dataLayer.push(obj, ...arg_a1)
}
export function ga$() {
	log(`${logPrefix}|ga$`)
	ga(...arguments)
}

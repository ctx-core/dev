import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/drip_marketing/lib.js'
declare const window
export function push__drip(...arg_a1:any[]) {
	log(`${logPrefix}|push__drip`)
	if (typeof window._dcq !== 'undefined') {
		window._dcq.push(...arg_a1)
	}
}

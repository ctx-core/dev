import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/drip_marketing/lib.js'
export function push__drip() {
	log(`${logPrefix}|push__drip`)
	if (typeof window._dcq !== 'undefined') {
		_dcq.push(...arguments)
	}
}
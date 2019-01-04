import { assign } from '@ctx-core/object/lib.js'
import { format__currency, format__money } from './lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/currency/dom.js'
export function mount__currency(tag) {
	log(`${logPrefix}|mount__currency`)
	assign(tag, {
		format__currency,
		format__money
	})
}
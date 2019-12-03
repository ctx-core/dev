import { assign } from '@ctx-core/object'
import { format__currency, format__money } from './lib'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/currency/dom.js'
export function mount__currency(tag) {
	log(`${logPrefix}|mount__currency`)
	assign(tag, {
		format__currency,
		format__money
	})
}

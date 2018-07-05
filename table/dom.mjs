import { clone } from 'ctx-core/object/lib.mjs'
import {
	agent__table,
	agent__row,
	agent__filter__rows__data,
	agent__row_id,
	agent__highlight__rows__data
} from 'ctx-core/table/agent.mjs'
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/table/dom.mjs'
export function mount__table(tag, ...ctx__mount$$) {
	log(`${logPrefix}|mount__table`)
	let { ctx } = tag
	const ctx__mount = clone(...ctx__mount$$)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	return tag
	function onmount() {
		log(`${logPrefix}|onmount`)
		agent__table(ctx).pick__on(ctx__mount)
		agent__row(ctx).pick__on(ctx__mount)
		agent__filter__rows__data(ctx).pick__on(ctx__mount)
		agent__row_id(ctx).pick__on(ctx__mount)
		agent__highlight__rows__data(ctx).pick__on(ctx__mount)
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__table(ctx).pick__off(ctx__mount)
		agent__row(ctx).pick__off(ctx__mount)
		agent__filter__rows__data(ctx).pick__off(ctx__mount)
		agent__row_id(ctx).pick__off(ctx__mount)
		agent__highlight__rows__data(ctx).pick__off(ctx__mount)
	}
}
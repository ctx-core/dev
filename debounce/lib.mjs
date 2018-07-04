import {assign,clone} from 'ctx-core/object/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/debounce/lib.mjs'
export async function debounce(ctx, ...array__opts) {
	log(`${logPrefix}|debounce`)
	const opts = clone(...array__opts)
			, { key, no, yes } = opts
	ensure__table__debounce(ctx)
	const {table__debounce} = ctx
	if (table__debounce[key]) {
		return await no()
	}
	try {
		assign__finish__debounce(ctx, key)
		return await yes()
	} finally {
		finish__debounce(ctx, key)
	}
}
export function ensure__table__debounce(ctx) {
	log(`${logPrefix}|ensure__table__debounce`)
	if (!ctx.table__debounce) {
		assign(ctx, {table__debounce: {}}) }
	return ctx.table__debounce
}
export function assign__finish__debounce(ctx, key) {
	log(`${logPrefix}|assign__finish__debounce`)
	let table__debounce = ensure__table__debounce(ctx)
	table__debounce[key] = _finish__debounce(ctx, key)
	return ctx
}
export function finish__debounce(ctx, key) {
	log(`${logPrefix}|finish__debounce`)
	return ctx.table__debounce[key]()
}
function _finish__debounce(ctx, key) {
	log(`${logPrefix}|$finish__debounce`)
	return () => {
		log(`${logPrefix}|$finish__debounce|setTimeout`)
		ctx.table__debounce[key] = null
	}
}
import { assign } from '@ctx-core/object/lib.js'
import { log, error, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/dom/api.js'
/**
 * The global ctx to be used in the dom.
 * @typedef {module:ctx-core/object/lib~ctx} ctx
 * @external ctx
 */
/**
 * A control api for ctx-core & libraries using ctx-core
 * @typedef {module:ctx-core/object/lib~ctx} $ctx
 * @property {function} mount - Mounts to dom environment.
 * @property {function} assign__ctx - Can be overridden to assign to the ctx.
 * @external $ctx
 */
const $ctx = assign(global.$ctx || {}, {
	mount,
	assign__ctx
})
export default $ctx
//noinspection JSAnnotator
window.$ctx = $ctx
export function mount() {
	log(`${logPrefix}|mount`)
	const ctx__mount = assign(...arguments)
	let { ctx } = ctx__mount
	window.ctx = ctx
	$ctx.assign__ctx(ctx)
	return ctx__mount
}
export function assign__ctx(ctx) {
	log(`${logPrefix}|assign__ctx`)
	return ctx
}
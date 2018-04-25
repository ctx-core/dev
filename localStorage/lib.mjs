import {assign} from 'ctx-core/object/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/localStorage/lib.mjs'
export function load__ctx__localStorage() {
	log(`${logPrefix}|load__ctx__localStorage`)
	const json__ctx__localStorage = localStorage.getItem('ctx')
			, ctx =
					json__ctx__localStorage
					? JSON.parse(json__ctx__localStorage)
					: {}
	return ctx
}
export function assign__ctx__localStorage() {
	log(`${logPrefix}|assign__ctx__localStorage`)
	const ctx = assign(load__ctx__localStorage(), ...arguments)
	set__ctx__localStorage(ctx)
	return ctx
}
export function set__ctx__localStorage(ctx) {
	log(`${logPrefix}|set__ctx__localStorage`)
	localStorage.setItem('ctx', JSON.stringify(ctx))
	return ctx
}
export function remove__ctx__localStorage(...args) {
	log(`${logPrefix}|remove__ctx__localStorage`)
	let ctx = load__ctx__localStorage()
	for (let key in args) {
		ctx[key] = null
	}
	set__ctx__localStorage(ctx)
	return ctx
}
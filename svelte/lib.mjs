import { pick } from 'ctx-core/object/lib.mjs'
import { _assign__offs } from 'ctx-core/observable/lib.mjs'
export function _assign__offs__svelte(C, ...ARR__agents__keys) {
	const assign__offs = _assign__offs(C)
	for (let i = 0; i < ARR__agents__keys.length; i++) {
		const agents__keys = ARR__agents__keys[i]
		let agent, keys
		if (Array.isArray(agents__keys)) {
			[agent, ...keys] = agents__keys
		} else {
			agent = agents__keys
		}
		if (!keys || !keys.length) {
			keys = agent.scope
		}
		assign__offs.change(agent, _proxy__change(C, ...keys))
	}
	return assign__offs
}
export function _proxy__change(C, ...keys) {
	const { store } = C
	return proxy__change
	function proxy__change() {
		C.set(pick(store.get(), ...keys))
	}
}
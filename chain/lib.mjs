/**
 * @module ctx-core/chain/lib
 */
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/chain/lib.mjs'
export const _ctx = _chain
export function __ctx(ctx, or) {
	return (...keys) => (_chain(ctx, ...keys) || or)
}
export function __ctx__or__fn(ctx, fn = () => {}) {
	return __ctx(ctx, fn)
}
export function __ctx__or__a(ctx, a = []) {
	return __ctx(ctx, a)
}
export function _chain(ctx, ...keys) {
	let head = ctx
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		if (typeof key === 'function') {
			head =
				head == null
				? head
				: key.call(head, head)
			continue
		}
		if (typeof key === 'string') {
			walk__key(key)
		}
		if (Array.isArray(key)) {
			const args = key.slice(1)
			key = key[0]
			const ARR__key = key.split('.')
			const key__n1 = ARR__key.slice(0, ARR__key.length - 1).join('.')
			if (key__n1) walk__key(key__n1)
			key = ARR__key[ARR__key.length - 1]
			head = head[key] && head[key](...args)
		}
	}
	return head
	function walk__key(key) {
		const ARR__key = key.split('.')
		for (let i = 0; i < ARR__key.length; i++) {
			head =
				head == null
				? head
				: head[ARR__key[i]]
		}
	}
}
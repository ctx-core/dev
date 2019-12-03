/**
 * @module @ctx-core/chain/lib
 */
export function __chain(ctx, or) {
	return (...keys) => (_chain(ctx, ...keys) || or)
}
export function __chain__or__fn(ctx, fn = () => {}) {
	return __chain(ctx, fn)
}
export function __chain__or__a(ctx, a = []) {
	return __chain(ctx, a)
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
			const a1__key = key.split('.')
			const key__n1 = a1__key.slice(0, a1__key.length - 1).join('.')
			if (key__n1) walk__key(key__n1)
			key = a1__key[a1__key.length - 1]
			head = head[key] && head[key](...args)
		}
	}
	return head
	function walk__key(key) {
		const a1__key = key.split('.')
		for (let i = 0; i < a1__key.length; i++) {
			head =
				head == null
				? head
				: head[a1__key[i]]
		}
	}
}

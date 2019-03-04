import { derive } from 'svelte/store.mjs'
import { get_store_value } from 'svelte/internal.mjs'
import { map } from '@ctx-core/array/lib.js'
const symbol__load = Symbol('load')
export const get = get_store_value
export { get_store_value }
export async function load__ARR__store(ARR__store = []) {
	const ARR__load__store = map(ARR__store, store => store[symbol__load])
	return await Promise.all(ARR__load__store)
}
export function _load__store(store, deps, fn) {
	return async () => {
		if (store.__loaded) return store
		const deps__ = map(deps, dep => dep[symbol__load] || dep)
		await Promise.all(deps__)
		store.__loaded = true
		if (fn) await fn(store)
		return store
	}
}
export function _load__writable(store, deps, fn__writable) {
	return _load__store(store, deps, async store => {
		if (fn__writable) store.set(await fn__writable(store))
	})
}
export function derive__load(deps, fn) {
	const store = derive(deps, fn)
  store[symbol__load] = _load__store(store, deps, fn)
	return store
}
export function writable__load(store, deps, fn__writable) {
  store[symbol__load] = _load__writable(store, deps, fn__writable)
	return store
}
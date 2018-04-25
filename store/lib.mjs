// TODO: Use when https://github.com/sveltejs/svelte-extras/issues/20 is resolved
//import {observe} from 'svelte-extras'
import {observe} from 'svelte-extras/dist/svelte-extras.es.js'
import {Store} from 'svelte/store'
export function _store() {
	const store = new Store(...arguments)
	store.observe = observe
	if (typeof window === 'object') window.store = store
	return store
}
export const $store = _store
export function _mixin__store(name, init) {
	return function mixin__store(store) {
		if (store[name]) return store
		store[name] = {
			store,
			name,
			mixin__store
		}
		init(...arguments)
		return store
	}
}
// TODO: Inline once https://github.com/sveltejs/svelte/issues/1327 is resolved
export function compute(store, name, deps, fn) {
	const values__deps = []
	const state = store.get()
	for (let i=0; i < deps.length; i++) {
		values__deps.push(state[deps[i]])
	}
	const __set = {}
	__set[name] = fn(...values__deps)
	store.set(__set)
	store.compute(name, deps, fn)
	return store
}
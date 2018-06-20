// TODO: Use when https://github.com/sveltejs/svelte-extras/issues/20 is resolved
//import {observe} from 'svelte-extras'
import {setDeep, observe, observeDeep, observeMany} from 'svelte-extras/dist/svelte-extras.es.js'
import {mixin, clone} from 'ctx-core/object/lib.mjs'
import {Store} from 'svelte/store'
export function _store() {
	const store = new Store(...arguments)
	mixin(store, {
		observe,
		observeDeep,
		observeMany,
		setDeep,
		clone__get() {
			return clone(this.get(), ...arguments)
		},
		get store() {return this.get().store},
	})
	store.set({ store })
	store.observe = observe
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

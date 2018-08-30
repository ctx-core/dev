// TODO: Use when https://github.com/sveltejs/svelte-extras/issues/20 is resolved
//import {observe} from 'svelte-extras'
import { setDeep, observe, observeDeep, observeMany } from 'svelte-extras/dist/svelte-extras.es.js'
import { mixin, clone } from '@ctx-core/object/lib.mjs'
import { flatten } from '@ctx-core/array/lib.mjs'
import { Store } from 'svelte/store'
import { log } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/store/lib.mjs'
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
		get g() {return this.get()}
	})
	store.set({ store })
	store.observe = observe
	return store
}
export const $store = _store
export function _mixin__store(name, init) {
	return async function mixin__store(store) {
		if (store[name]) return store
		store[name] = {
			store,
			name,
			mixin__store
		}
		await init(...arguments)
		return store
	}
}
/**
 * Adds computed properties onto a svelte store
 * @param store
 * @param definitions
 * @returns {*}
 * @example
 * compute(store, {
			computed1: [
					'prop1',
					'prop2',
					(prop1, prop2) => prop1 / prop2
			],
			computed2: [
					'computed1',
					'prop3',
					(computed1, prop3) => computed1 * prop3
			]
	})
 */
export function compute(store, definitions) {
	for (let key in definitions) {
		const definition = definitions[key]
		const dependencies = flatten(definition.slice(0, definition.length - 1))
		const fn = definition[definition.length - 1]
		store.compute(key, dependencies, fn)
	}
	return store
}
export function ensure__store(ctx, store) {
	log(`${logPrefix}|ensure__store`)
	if (ctx.store) return ctx
	store = store || _store(ctx)
	ctx.store = store
	return ctx
}

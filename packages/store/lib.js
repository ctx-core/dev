// TODO: Use when https://github.com/sveltejs/svelte-extras/issues/20 is resolved
//import {observe} from 'svelte-extras'
import { setDeep, observe, observeDeep, observeMany } from 'svelte-extras/dist/svelte-extras.es.js'
import { mixin, clone } from '@ctx-core/object/lib.js'
import { flatten } from '@ctx-core/array/lib.js'
import { Store } from 'svelte/store.js'
export { _ctx } from './lib.nodep.js'
import { log } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/store/lib.js'
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
	store.observe = observe
	return store
}
export function _mixin__store(name, init) {
	return async function mixin__store(store) {
		if (store[name]) return store
		store[name] = {
			store,
			name,
		}
		log(`_mixin__store|${name}`)
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
		if (typeof fn !== 'function') {
			console.error({
				key,
				definition,
				dependencies,
				fn,
			})
			throw `compute ${key} must have a function as the last element`
		}
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

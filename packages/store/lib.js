import { get, writable, derived as derived__store } from 'svelte/store'
import { _spread, each, map } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { call, _a1__wrap } from '@ctx-core/function'
import { readable } from 'svelte/store'
const symbol__load = Symbol('load')
const symbol__loaded = Symbol('loaded')
/**
 * @module svelte/store
 * @link svelte/store
 */
/**
 * @typedef store.Readable
 */
/**
 * @typedef store.Writable
 */
/**
 * Asserts fn is a function then creates a derived stores
 * @param {Stores} stores
 * @param {function} fn
 * @returns {store.Readable}
 */
export function derived__assert(stores, fn) {
	if (typeof fn !== 'function') {
		const message__error = 'fn is not a function'
		console.trace(message__error)
		throw message__error
	}
	return derived__store(stores, fn)
}
export const derived = derived__assert
/**
 * Spreads the first argument into the fn.
 * @param {Stores} stores
 * @param {function} fn
 * @returns {store.Readable}
 * @see nowrap__a1
 */
export function derived__spread(stores, fn) {
	return derived(stores, _spread(fn))
}
/**
 * Delegates to store.subscribe
 * @param {store.Readable} store
 * @param {function} fn
 * @returns {Unsubscriber}
 */
export function subscribe(store, fn) {
	return store.subscribe(fn)
}
/**
 * Subscribes the fn to store but does not have the initial call.
 * @param {store.Readable} store
 * @param {function} fn
 * @returns {function: void}
 */
export function subscribe__noinit(store, fn) {
	let beyond_init = false
	return subscribe(store, (...a1__arg) => {
		if (!beyond_init) {
			beyond_init = true
			return
		}
		return fn(...a1__arg)
	})
}
/**
 * Calls the given fn the next time the value of the store changes, then unsubscribes.
 * @param {store.Readable} store
 * @param {function} fn
 * @returns {Unsubscriber}
 */
export function subscribe__change__once(store, fn) {
	const unsubscribe = subscribe__noinit(store, (...a1__arg) => {
		const __ = fn(...a1__arg)
		unsubscribe()
		return __
	})
	return unsubscribe
}
/**
 * Subscribes to multiple stores. The subscriber fn is called when any of the a1__store changes.
 * @param {Readable[]} a1__store
 * @param {function} fn
 * @returns {Unsubscriber}
 */
export function subscribe__multi(a1__store, fn) {
	const a1__unsubscribe =
		map(a1__store,
			(store, i) => subscribe(store,
				$store => invoke($store, i)
			))
	return () => each(a1__unsubscribe, call)
	function invoke($store__i, i) {
		const a1__$store__all =
			map(a1__store,
				(store, j) =>
					(j === i)
					? $store__i
					: get(store)
			)
		fn(a1__$store__all)
	}
}
/**
 * Logs (console.debug) changes to a store
 * @param {store.Readable} store
 * @param {string} label
 * @returns {function(): Unsubscriber}
 */
export function subscribe__debug(store, label) {
	return subscribe(store, value => {
		console.debug(label, value)
	})
}
/**
 * Creates a Readable store that derives it's value from a async function.
 * @param {Stores} stores
 * @param {function:Promise} fn
 * @param initial_value
 * @returns {store.Readable}
 * @see derived__store
 */
export function derived__async(stores, fn, initial_value) {
	const single = !Array.isArray(stores)
	if (single) stores = [stores]
	const auto = fn.length < 2
	let value = {}
	return readable(initial_value, set => {
		let inited = false
		const values = []
		let pending = 0
		const sync = async () => {
			if (pending) return
			const result = await fn(single ? values[0] : values, set)
			if (auto && (value !== (value = result))) set(result)
		}
		const unsubscribers = stores.map((store, i) =>
			subscribe(store,
				value => {
					values[i] = value
					pending &= ~(1 << i)
					if (inited) sync()
				},
				() => {
					pending |= (1 << i)
				})
		)
		inited = true
		sync()
		return function stop() {
			each(unsubscribers, unsubscribe => unsubscribe())
		}
	})
}
/**
 * Sets each nowrap__a1__store with val
 * @param {Stores} stores
 * @param val
 */
export function clear__store(stores, val = null) {
	const a1__store = _a1__wrap(stores)
	each(a1__store, _set__val(val))
}
/**
 * Returns a function that [clear__store](#clear__store).
 * @param {Stores} stores
 * @param value
 * @returns {function(): void}
 */
export function _clear__store(stores, value = null) {
	return () => clear__store(stores, value)
}
const storage = typeof localStorage !== 'undefined' ? localStorage : {
	removeItem: () => {},
}
/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key        - `localStorage` key
 * @param {*} value        - default/initial value (if value is already set in `localStorage`, it will load that value instead)
 * @param {Function} fn        - handed off to `writable`
 * @returns {store.Writable}
 */
export function storable(key, value, fn) {
	key = `cm.store.${key}`
	if (storage[key]) { value = JSON.parse(storage[key]) }
	const store = writable(value, fn)
	subscribe(store, value => {
		if (value === undefined) {
			storage.removeItem(key)
		} else {
			storage[key] = JSON.stringify(value)
		}
	})
	store.remove = () => store.set(undefined)
	return store
}
/**
 * Calls set on the given store with the given val
 * @param {store.Writable} store
 * @param val
 * @returns {void}
 */
export function set(store, val) {
	return store.set(val)
}
/**
 * Returns a function to set it's store argument with the given val
 * @param val
 * @returns {function(store.Writable): void}
 */
export function _set__val(val) {
	return store => set(store, val)
}
/**
 * Returns a function to set the given store using the value returned by `__`.
 * This is useful in conjunction with [subscribe](#subscribe).
 * @param {store.Writable} store
 * @param {Function|*} __ - function return value or value to set the given store
 * @returns {function(...[*]): void}
 */
export function _set__store(store, __ = I) {
	return (...args) =>
		set(store,
			typeof __ === 'function'
			? __(...args)
			: __)
}

import {
	get,
	writable,
	readable,
	derived as derived__store,
	Writable,
	Readable,
} from 'svelte/store'
import { _spread, each, map } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { call, _a1__wrap } from '@ctx-core/function'
declare const Array
/**
 * Asserts fn is a function then creates a derived stores
 * @param {Stores} stores
 * @param {function} fn
 * @returns {Readable}
 */
export function derived__assert(stores, fn, initial_value?) {
	if (typeof fn !== 'function') {
		const message__error = 'fn is not a function'
		console.trace(message__error)
		throw message__error
	}
	return derived__store(stores, fn, initial_value)
}
export const derived = derived__assert
/**
 * Spreads the first argument into the fn.
 * @param {Stores} stores
 * @param {function} fn
 * @returns {Readable}
 * @see nowrap__a1
 */
export function derived__spread(stores:[Readable<any>, ...Readable<any>[]], fn, initial_value?) {
	return derived(stores, _spread(fn), initial_value)
}
/**
 * Delegates to store.subscribe
 * @param {Readable} store
 * @param {function} run
 * @param {function} [invalidate]
 * @returns {Unsubscriber}
 */
export function subscribe(
	store:Readable<any>,
	run:(any)=>void,
	invalidate?:(any)=>void
) {
	return store.subscribe(run, invalidate)
}
/**
 * Subscribes the fn to store but does not have the initial call.
 * @param {Readable} store
 * @param {function} fn
 * @returns {function: void}
 */
export function subscribe__noinit(store, fn) {
	let beyond_init = false
	return subscribe(store, (...a1__arg)=>{
		if (!beyond_init) {
			beyond_init = true
			return
		}
		// @ts-ignore
		return fn(...a1__arg)
	})
}
/**
 * Calls the given fn the next time the value of the store changes, then unsubscribes.
 * @param {Readable} store
 * @param {function} fn
 * @returns {Unsubscriber}
 */
export function subscribe__change__once(store, fn) {
	const unsubscribe = subscribe__noinit(store, (...a1__arg)=>{
		// @ts-ignore
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
			(store, i)=>subscribe(store,
				$store=>invoke($store, i)
			))
	return ()=>each(a1__unsubscribe, call)
	function invoke($store__i, i) {
		const a1__$store__all =
			map(a1__store,
				(store, j)=>
					(j === i)
					? $store__i
					: get(store)
			)
		fn(a1__$store__all)
	}
}
/**
 * Logs (console.debug) changes to a store
 * @param {Readable} store
 * @param {string} label
 * @returns {function(): Unsubscriber}
 */
export function subscribe__debug(store, label) {
	return subscribe(store, value=>{
		console.debug(label, value)
	})
}
/**
 * Creates a Readable store that derives it's value from a async function.
 * @param {Stores} stores
 * @param {function:Promise} fn
 * @param initial_value
 * @returns {Readable}
 * @see derived__store
 */
export function derived__async(stores, fn, initial_value = null) {
	const single = !Array.isArray(stores)
	if (single) stores = [stores]
	const auto = fn.length < 2
	let value = {}
	return readable(initial_value, set=>{
		let inited = false
		const values = []
		let pending = 0
		// @ts-ignore
		async function sync():Promise<void> {
			if (pending) return
			const result = await fn(single ? values[0] : values, set)
			if (auto && (value !== (value = result))) set(result)
		}
		const unsubscribers = stores.map((store, i)=>
			subscribe(
				store,
				value=>{
					values[i] = value
					pending &= ~(1 << i)
					if (inited) sync()
				},
				()=>{
					pending |= (1 << i)
				})
		)
		inited = true
		sync()
		return function stop() {
			each(unsubscribers, unsubscribe=>unsubscribe())
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
	return ()=>clear__store(stores, value)
}
const storage =
	// @ts-ignore
	typeof localStorage !== 'undefined'
		// @ts-ignore
	? localStorage
	: { removeItem: ()=>{}, }
export interface Storable<T> extends Writable<T> {
	remove?():void;
}
/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key        - `localStorage` key
 * @param {*} value        - default/initial value (if value is already set in `localStorage`, it will load that value instead)
 * @param {Function} fn        - handed off to `writable`
 * @returns {Writable}
 */
export function storable(key, value, fn) {
	key = `cm.store.${key}`
	// @ts-ignore
	if (storage[key]) { value = JSON.parse(storage[key]) }
	const store:Storable<any> = writable(value, fn)
	subscribe(store, value=>{
		if (value === undefined) {
			storage.removeItem(key)
		} else {
			// @ts-ignore
			storage[key] = JSON.stringify(value)
		}
	})
	store.remove = ()=>store.set(undefined)
	return store
}
/**
 * Calls set on the given store with the given val
 * @param {Writable} store
 * @param val
 * @returns {void}
 */
export function set(store, val) {
	return store.set(val)
}
/**
 * Returns a function to set it's store argument with the given val
 * @param val
 * @returns {function(Writable): void}
 */
export function _set__val(val) {
	return store=>set(store, val)
}
/**
 * Returns a function to set the given store using the value returned by `__`.
 * This is useful in conjunction with [subscribe](#subscribe).
 * @param {Writable} store
 * @param {Function|*} __ - function return value or value to set the given store
 * @returns {function(...[*]): void}
 */
export function _set__store(store, __ = I) {
	return (...a1__arg)=>
		set(store,
			typeof __ === 'function'
				// @ts-ignore
			? __.apply(__, a1__arg)
			: __)
}
export const ctx__global = {}
/**
 * Returns a function to ensure that a store with a key is defined on a ctx object,
 * otherwise it creates the store using the _store factory function.
 * @param _store
 * @param key
 */
export function _ensure__store<T>(
	_store:(ctx?:any, key?:string|symbol, opts?:any)=>T,
	key:string|symbol=Symbol(),
) {
	return (ctx?, opts?)=>{
		if (!ctx) ctx = ctx__global
		if (!ctx[key]) {
			ctx[key] = _store(ctx, key, opts)
		}
		return ctx[key] as T
	}
}
export function _ensure__store__instance<T>(
	_store:(ctx?:any, key?:string|symbol, opts?:any)=>T,
	key:string|symbol=Symbol(),
):[(ctx?:any, key?:string|symbol, opts?:any)=>T, T] {
  const ensure__store = _ensure__store<T>(_store, key)
	return [ensure__store, ensure__store()]
}

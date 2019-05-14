import { get, writable, derived as derived__store } from 'svelte/store'
import { run_all } from 'svelte/internal.mjs'
import { _spread, each, map } from '@ctx-core/array'
import { readable } from 'svelte/store'
import { concurrent_id, __concurrent_id } from './store'
const symbol__load = Symbol('load')
const symbol__loaded = Symbol('loaded')
export function derived__assert(stores, fn) {
	if (typeof fn !== 'function') {
		const message__error = 'fn is not a function'
		console.trace(message__error)
		throw message__error
	}
	return derived__store(stores, fn)
}
export const derived = derived__assert
export function derived__spread(stores, fn) {
	return derived(stores, _spread(fn))
}
export function subscribe(store, fn) {
	return store.subscribe(fn)
}
export function subscribe__once(store, fn) {
	const unsubscribe = store.subscribe((...a1__arg) => {
		const __ = fn(...a1__arg)
		unsubscribe()
		return __
	})
	return unsubscribe
}
export function subscribe__multi(a1__store, fn) {
	return (
		map(a1__store,
			(store, i) => store.subscribe(
				$store => invoke($store, i)
			))
	)
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
export function subscribe__debug(store, label) {
  return store.subscribe(value => {
  	console.debug(label, value)
	})
}
export function concurrent(...args) {
	const store = writable(...args)
	const values = {}
	store.subscribe($store => values[concurrent_id] = $store)
	__concurrent_id.subscribe(concurrent_id => {
		store.set(values[concurrent_id])
	})
	__concurrent_id__destroy.subscribe(concurrent_id__destroy => delete values[concurrent_id__destroy])
	return store
}
export async function concurrent_safe(promise) {
	const concurrent_id__reset = concurrent_id
	const $$ = await promise
	__concurrent_id.set(concurrent_id__reset)
	return $$
}
/**
 *
 * @param stores
 * @param fn
 * @returns {{subscribe}}
 * @see {@link https://github.com/sveltejs/svelte/blob/master/store.mjs}
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
		const unsubscribers = stores.map((store, i) => store.subscribe(
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
			run_all(unsubscribers)
		}
	})
}
export function _load__store(store, deps, fn) {
	return async (force = false) => {
		if (force || store[symbol__loaded]) return store
		const deps__ = map(deps, dep => dep[symbol__load] || dep)
		const value__deps = await Promise.all(deps__)
		store[symbol__loaded] = true
		return fn && fn(...value__deps)
	}
}
export function _load__writable(store, deps, fn__writable) {
	return _load__store(store, deps, async (...args) => {
		if (fn__writable) store.set(await fn__writable(...args))
	})
}
export function mixin__store__load(store, deps, fn) {
	store[symbol__load] = _load__store(store, deps, fn)
	return store
}
export function mixin__derived__load(deps, fn) {
	const store = derived(deps, fn)
	store[symbol__load] = _load__store(store, deps, fn)
	return store
}
export function mixin__writable__load(store, deps, fn__writable) {
	store[symbol__load] = _load__writable(store, deps, fn__writable)
	return store
}
export async function load__a1__store(a1__store = []) {
	const a1__load__store = map(a1__store, store => store[symbol__load])
	return await Promise.all(a1__load__store)
}
export function load__store(...a1__store) {
	return load__a1__store(a1__store)
}
export async function reload__a1__store(a1__store = []) {
	const a1__promise = map(
		a1__store,
		store => store[symbol__load] && store[symbol__load](true))
	return await Promise.all(a1__promise)
}
export function _reload__a1__store(a1__store = []) {
	return async () => reload__a1__store(a1__store)
}
export async function reload__store(...a1__store) {
	return reload__a1__store(a1__store)
}
export function _reload__store(...a1__store) {
	return async () => reload__a1__store(a1__store)
}
export function clear__a1__store(a1__store = [], value = null) {
	each(a1__store, store => store.set(value))
}
export function _clear__a1__store(a1__store = [], value = null) {
	return () => clear__a1__store(a1__store, value)
}
const storage = typeof localStorage !== 'undefined' ? localStorage : {
	removeItem: () => {},
}
/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key        - `localStorage` key
 * @param {any} value        - default/initial value (if value is already set in `localStorage`, it will load that value instead)
 * @param {Function} fn        - handed off to `writable`
 */
export const storable = (key, value, fn) => {
	key = `cm.store.${key}`
	if (storage[key]) { value = JSON.parse(storage[key]) }
	const store = writable(value, fn)
	store.subscribe(value => {
		if (value === undefined) {
			storage.removeItem(key)
		} else {
			storage[key] = JSON.stringify(value)
		}
	})
	store.remove = () => store.set(undefined)
	return store
}
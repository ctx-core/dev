import { get, writable, derive } from 'svelte/store.mjs'
import { run_all } from 'svelte/internal.mjs'
import { each, map } from '@ctx-core/array/lib.js'
import { readable } from 'svelte/store'
import { concurrent_id, __concurrent_id } from './store.js'
const symbol__load = Symbol('load')
const symbol__loaded = Symbol('loaded')
export function subscribe(store, fn) {
  return store.subscribe(fn)
}
export function subscribe__once(store, fn) {
	const unsubscribe = store.subscribe((...args) => {
		const __ = fn(...args)
		unsubscribe()
		return __
	})
	return unsubscribe
}
export function subscribe__multi(ARR__store, fn) {
	return (
		map(ARR__store,
			store => store.subscribe(
				$store => invoke($store, i)
			))
	)
	function invoke($store__i, i) {
		const ARR__$store__all =
			map(ARR__store,
				(store, j) =>
					(j === i)
					? $store__i
					: get(store)
			)
		fn(ARR__$store__all)
	}
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
export function derive__async(stores, fn) {
	const single = !Array.isArray(stores)
	if (single) stores = [stores]
	const auto = fn.length < 2
	let value = {}
	return readable(set => {
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
export function mixin__derive__load(deps, fn) {
	const store = derive(deps, fn)
	store[symbol__load] = _load__store(store, deps, fn)
	return store
}
export function mixin__writable__load(store, deps, fn__writable) {
	store[symbol__load] = _load__writable(store, deps, fn__writable)
	return store
}
export async function load__ARR__store(ARR__store = []) {
	const ARR__load__store = map(ARR__store, store => store[symbol__load])
	return await Promise.all(ARR__load__store)
}
export function load__store(...ARR__store) {
	return load__ARR__store(ARR__store)
}
export async function reload__ARR__store(ARR__store = []) {
	const ARR__promise = map(
		ARR__store,
		store => store[symbol__load] && store[symbol__load](true))
	return await Promise.all(ARR__promise)
}
export function _reload__ARR__store(ARR__store = []) {
	return async () => reload__ARR__store(ARR__store)
}
export async function reload__store(...ARR__store) {
	return reload__ARR__store(ARR__store)
}
export function _reload__store(...ARR__store) {
	return async () => reload__ARR__store(ARR__store)
}
export function clear__ARR__store(ARR__store=[], value = null) {
  each(ARR__store, store.set(value))
}
export function _clear__ARR__store(ARR__store, value = null) {
	return () => clear__ARR__store(ARR__store, value)
}
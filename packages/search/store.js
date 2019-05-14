import { get } from 'svelte/store'
import { each, _idx__next, _idx__prev } from '@ctx-core/array'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/search/store'
/**
 * @typedef Store
 * Svelte Store
 */
/**
 * Returns a `clear__search` function.
 * @param {Array<Store>} scope
 * @returns {Function}
 */
export function _clear__search({ scope }) {
	return () => {
		log(`${logPrefix}|_clear__search|()`)
		each(scope, __scope => __scope.set(null))
	}
}
/**
 * Returns a `reset__search` function, which sets `__search` based on `_data` given `$__query`
 * @param {Store} __search
 * @param {Store} __query
 * @param {Store} __data
 * @param {Store} _data
 * @param {function} clear
 * @returns {Function}
 */
export function _reset__search({ __search, __query, __data, _data, clear }) {
	return async () => {
		log(`${logPrefix}|_reset__search|()`)
		const query = get(__query)
		if (!query) {
			return clear()
		}
		const search__previous = get(__search)
		const query__previous = search__previous && search__previous.query
		if (query__previous === query) {
			return
		}
		__search.set({
			_loading: true,
			query,
		})
		const data = await _data({ query })
		if (query === get(__query)) {
			__search.set({
				_done: true,
				query,
				data,
			})
			__data.set(data)
		}
	}
}
/**
 * Returns a `reset__item__search` function, which sets `__idx` to 0 & `__item` to the 0th item
 * @param {Store} __search
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export function _reset__item__search({ __search, __item, __idx }) {
	return async () => {
		log(`${logPrefix}|_reset__item__search|()`)
		const index = 0
		const search = get(__search)
		const data = (search && search.data) || []
		const item = data[index]
		__item.set(item)
		__idx.set(index)
	}
}
/**
 * Returns a `up__item__search` function, which sets `__idx` & `__item` to the previous value
 * @param {Store} __search
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export function _up__item__search({ __search, __idx, __item }) {
	return () => {
		log(`${logPrefix}|_up__item__search|()`)
		const search = get(__search)
		const data = (search && search.data) || []
		const index = _idx__prev(data.length, get(__idx) || 0)
		const item = data[index]
		__idx.set(index)
		__item.set(item)
	}
}
/**
 * Returns a `down__item__search` function, which sets `__idx` & `__item` to the next value
 * @param {Store} __search
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export function _down__item__search({ __search, __idx, __item }) {
	return () => {
		log(`${logPrefix}|_down__item__search|()`)
		const search = get(__search)
		const data = (search && search.data) || []
		const index = _idx__next(data.length, get(__idx) || 0)
		const item = data[index]
		__idx.set(index)
		__item.set(item)
	}
}

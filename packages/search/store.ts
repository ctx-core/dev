import { derived, get, Readable } from 'svelte/store'
import { _idx__next, _idx__prev } from '@ctx-core/array'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/search/store.js'
type Opts__store__search_result = {
	__query:Readable<any>
	_data:({ query: any })=>Promise<any>
	clear?:()=>void
}
export function _store__search_result(
	{
		__query,
		_data,
		clear
	}:Opts__store__search_result
) {
	const store__search = derived(
		__query,
		async (
			query,
			set
		)=>{
			if (!query) {
				(clear || (()=>{
					set({ done: true, loading: false, query, data: [] })
				}))()
				return
			}
			const search__previous = get(store__search)
			const query__previous = search__previous && search__previous.query
			if (query__previous === query) {
				return
			}
			set({
				loading: true,
				query,
			})
			const data = await _data({ query })
			if (query === get(__query)) {
				set({
					done: true,
					loading: false,
					query,
					data,
				})
			}
			return store__search
		})
	return store__search
}
/**
 * Returns a `up__item__search` function, which sets `__idx` & `__item` to the previous value
 * @param {Store} __search_result
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export function _up__item__search({ __search_result, __idx, }) {
	return ()=>{
		log(`${logPrefix}|_up__item__search|()`)
		const search_result = get(__search_result)
		const data = (search_result && search_result.data) || []
		const idx = _idx__prev(data.length, get(__idx) || 0)
		__idx.set(idx)
	}
}
/**
 * Returns a `down__item__search` function, which sets `__idx` & `__item` to the next value
 * @param {Store} __search_result
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export function _down__item__search({ __search_result, __idx, }) {
	return ()=>{
		log(`${logPrefix}|_down__item__search|()`)
		const search_result = get(__search_result)
		const data = (search_result && search_result.data) || []
		const idx = _idx__next(data.length, get(__idx) || 0)
		__idx.set(idx)
	}
}

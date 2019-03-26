import { get } from 'svelte/store'
import { concurrent_safe } from '@ctx-core/store'
import { clone } from '@ctx-core/object'
import { throw__invalid_argument } from '@ctx-core/error'
import { log, debug, error } from '@ctx-core/logger'
const logPrefix = '@ctx-core/cache/store'
export const symbol__error__store__cache = Symbol('symbol__error__store__cache')
export function _reload__store__cache(store) {
	return function reload__store__cache() {
		store.set({ data: {}, ARR__promise: {} })
	}
}
export function _ensure__store__cache(store, query) {
	return async function ensure__store__cache(ctx__query, id) {
		const store = get(store)
		const {
			data,
			ARR__promise
		} = store
		if (id == null)
			throw__invalid_argument(
				clone(store),
				{
					key: 'id',
					ctx__query,
				})
		const datum = data[id]
		if (datum == null && datum !== symbol__error__store__cache) {
			if (!ARR__promise[id]) ARR__promise[id] = query.call(store, ctx__query, id)
			try {
				data[id] = await concurrent_safe(ARR__promise[id])
			} catch (e) {
				error(e)
				data[id] = symbol__error__store__cache
			}
		}
		return data[id]
	}
}

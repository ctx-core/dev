import { get } from 'svelte/store'
import { clone } from '@ctx-core/object'
import { throw__invalid_argument } from '@ctx-core/error'
import { error } from '@ctx-core/logger'
export function _reload__store__cache(store) {
	return function reload__store__cache() {
		store.set({ data: {}, a1__promise: {} })
	}
}
export function _ensure__store__cache(__store, query) {
	return async function ensure__store__cache(ctx__query, id) {
		const store = get(__store)
		const {
			data,
			a1__promise
		} = store
		if (id == null)
			throw__invalid_argument(
				clone(store),
				{
					key: 'id',
					ctx__query,
				})
		const datum = data[id]
		if (datum == null && datum !== false) {
			if (!a1__promise[id]) a1__promise[id] = query.call(store, ctx__query, id)
			try {
				data[id] = await a1__promise[id]
			} catch (e) {
				error(e)
				data[id] = false
			}
		}
		return data[id]
	}
}

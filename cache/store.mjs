import { mixin } from 'ctx-core/object/lib.mjs'
import { throw__invalid_argument } from 'ctx-core/error/lib.mjs'
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/cache/stare.mjs'
export function __store__cache(store, { name, scope__cache, scope__target, query }, ...overrides) {
	const __store = store[name]
	mixin(__store, {
		reset() {
			const __ = {}
			__[scope__cache] = { data: {}, promises: {} }
			return store.set(__)
		},
		async ensure(ctx__query, id) {
			return __store.ensure__(ctx__query, id)
		},
		async ensure__(ctx__query, id) {
			const {
				data,
				promises
			} = store.get()[scope__cache]
			if (id == null)
				throw__invalid_argument(
					store.clone__get(),
					{
						key: 'id',
						ctx__query,
						scope__cache
					})
			if (data[id] == null) {
				if (!promises[id]) promises[id] = query.call(store, ctx__query, id)
				data[id] = await promises[id]
			}
			return data[id]
		},
		async ensure__ctx(ctx__query, id) {
			const value = await __store.ensure.call(store, ctx__query, id)
			const __ = {}
			__[scope__target] = value
			return __
		},
		query
	}, ...overrides)
	return __store
}
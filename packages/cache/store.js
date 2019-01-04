import { mixin } from '@ctx-core/object/lib.js'
import { throw__invalid_argument } from '@ctx-core/error/lib.js'
import { log, debug, error } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/cache/store.js'
export const symbol__error__store__cache = Symbol('symbol__error__store__cache')
export function __store__cache(store, { name, scope__cache, scope__target, query }, ...overrides) {
	const __store = store[name]
	mixin(__store, {
		reset() {
			const __ = {}
			__[scope__cache] = { data: {}, promises: {} }
			return store.set(__)
		},
		async ensure(ctx__query, id) {
			return __store.DO__ensure(ctx__query, id)
		},
		async DO__ensure(ctx__query, id) {
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
			const datum = data[id]
			if (datum == null && datum !== symbol__error__store__cache) {
				if (!promises[id]) promises[id] = query.call(store, ctx__query, id)
				try {
					data[id] = await promises[id]
				} catch (e) {
					error(e)
					data[id] = symbol__error__store__cache
				}
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
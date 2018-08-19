import { clone, _ctx__clear } from '@ctx-core/object/lib.mjs'
import { next__index, prev__index } from '@ctx-core/array/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/search/store.mjs'
export function _mixins__store__search__collection(store, opts = {}) {
	log(`${logPrefix}|_mixins__store__search__collection`)
	const {
		key__search,
		key__query,
		key__data,
		scope,
		_data
	} = opts
	return {
		clear,
		reset
	}
	function clear() {
		log(`${logPrefix}|_mixins__store__search__collection|clear`)
		store.set(_ctx__clear(scope))
		return store
	}
	async function reset() {
		log(`${logPrefix}|_mixins__store__search__collection|reset`)
		const query = store.get()[key__query]
		if (!query) {
			return clear()
		}
		const search__previous = store.get()[key__search]
		const query__previous = search__previous && search__previous.query
		if (query__previous === query) {
			return
		}
		const __set__loading = {}
		__set__loading[key__search] = {
			_loading: true,
			query
		}
		store.set(__set__loading)
		const data = await _data(store, { query })
		if (query === store.get()[key__query]) {
			const __set__done = {}
			__set__done[key__search] = {
				_done: true,
				query,
				data
			}
			__set__done[key__search][key__data] = data
			__set__done[key__data] = data
			store.set(__set__done)
			return store
		}
	}
}
export function _mixins__store__search__item(store, opts = {}) {
	log(`${logPrefix}|_mixins__store__search__item`)
	const {
		key__search,
		key__index,
		key__item
	} = opts
	return {
		reset,
		enter,
		up,
		down,
		__change__search
	}
	async function reset() {
		log(`${logPrefix}|_mixins__store__search__item|reset`)
		const ctx__reset = clone(...arguments)
		const index = ctx__reset[key__index] || 0
		const search = store.get()[key__search]
		const data = (search && search.data) || []
		const ctx__set = {}
		let item = ctx__reset[key__item]
		if (!item) {
			item = data[index]
		}
		ctx__set[key__item] = item
		ctx__set[key__index] = index
		return store.set(ctx__set)
	}
	function enter() {
		log(`${logPrefix}|_mixins__store__search__item|enter`)
		store.trigger(`enter__${key__item}`, store.clone__get())
	}
	function up() {
		log(`${logPrefix}|_mixins__store__search__item|up`)
		const search = store.get()[key__search]
		const data = (search && search.data) || []
		const index = prev__index(data.length, store.get()[key__index])
		const item = data[index]
		const ctx__set = {}
		ctx__set[key__index] = index
		ctx__set[key__item] = item
		return store.set(ctx__set)
	}
	function down() {
		log(`${logPrefix}|_mixins__store__search__item|down`)
		const search = store.get()[key__search]
		const data = (search && search.data) || []
		const index = next__index(data.length, store.get()[key__index])
		const item = data[index]
		const ctx__set = {}
		ctx__set[key__index] = index
		ctx__set[key__item] = item
		return store.set(ctx__set)
	}
	function __change__search() {
		log(`${logPrefix}|_mixins__store__search__item|__change__search`)
		const search = store.get()[key__search]
		const data = (search && search.data) || []
		const index = 0
		const ctx__set = {}
		ctx__set[key__item] = data[index]
		ctx__set[key__index] = index
		reset(ctx__set)
	}
}
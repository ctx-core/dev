import { get } from 'svelte/store.mjs'
import { each, next__index, prev__index } from '@ctx-core/array/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/search/store.js'
export function _mixins__ARR__search(opts = {}) {
	log(`${logPrefix}|_mixins__store__search__collection`)
	const {
		__search,
		__query,
		__data,
		scope,
		_data,
	} = opts
	return {
		clear,
		reset,
	}
	function clear() {
		log(`${logPrefix}|_mixins__store__search__collection|clear`)
		each(scope, __scope => __scope.set(null))
	}
	async function reset() {
		log(`${logPrefix}|_mixins__store__search__collection|reset`)
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
		const data = await _data({ query: query })
		if (query === get(__query)) {
			__search.set({
				_done: true,
				query,
				_data,
			})
			__data.set(data)
		}
	}
}
export function _mixins__item__search(opts = {}) {
	log(`${logPrefix}|_mixins__store__search__item`)
	const {
		__search,
		__index,
		__item,
	} = opts
	return {
		reset,
		up,
		down,
	}
	async function reset() {
		log(`${logPrefix}|_mixins__store__search__item|reset`)
		const index = 0
		const search = get(__search)
		const data = (search && search.data) || []
		const item = data[index]
		__item.set(item)
		__index.set(index)
	}
	function up() {
		log(`${logPrefix}|_mixins__store__search__item|up`)
		const search = get(__search)
		const data = (search && search.data) || []
		const index = prev__index(data.length, get(__index))
		const item = data[index]
		__index.set(index)
		__item.set(item)
	}
	function down() {
		log(`${logPrefix}|_mixins__store__search__item|down`)
		const search = get(__search)
		const data = (search && search.data) || []
		const index = next__index(data.length, get(__index))
		const item = data[index]
		__index.set(index)
		__item.set(item)
	}
}
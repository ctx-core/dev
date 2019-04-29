import { get } from 'svelte/store'
import { each, _idx__next, _idx__prev } from '@ctx-core/array'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/search/store'
export function _mixins__ARR__search(opts = {}) {
	log(`${logPrefix}|_mixins__ARR__search`)
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
		log(`${logPrefix}|_mixins__ARR__search|clear`)
		each(scope, __scope => __scope.set(null))
	}
	async function reset() {
		log(`${logPrefix}|_mixins__ARR__search|reset`)
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
				data,
			})
			__data.set(data)
		}
	}
}
export function _mixins__item__search(opts = {}) {
	log(`${logPrefix}|_mixins__item__search`)
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
		log(`${logPrefix}|_mixins__item__search|reset`)
		const index = 0
		const search = get(__search)
		const data = (search && search.data) || []
		const item = data[index]
		__item.set(item)
		__index.set(index)
	}
	function up() {
		log(`${logPrefix}|_mixins__item__search|up`)
		const search = get(__search)
		const data = (search && search.data) || []
		const index = _idx__prev(data.length, get(__index) || 0)
		const item = data[index]
		__index.set(index)
		__item.set(item)
	}
	function down() {
		log(`${logPrefix}|_mixins__item__search|down`)
		const search = get(__search)
		const data = (search && search.data) || []
		const index = _idx__next(data.length, get(__index) || 0)
		const item = data[index]
		__index.set(index)
		__item.set(item)
	}
}
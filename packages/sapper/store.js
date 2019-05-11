import { writable, derived } from 'svelte/store'
import { _andand } from '@ctx-core/function'
import { _uuid } from '@ctx-core/uuid'
import {
	concurrent_id,
	concurrent_id__default,
	__concurrent_id,
	__concurrent_id__destroy,
} from '@ctx-core/store/store'
export const __page__sapper = writable()
export const __preloading__sapper = writable()
export const __session__sapper = writable()
export const __path__sapper =
	derived(__page__sapper,
		_andand('path'))
export function init__page__sapper(page) {
	page.subscribe($page => {
		__page__sapper.set($page)
	})
}
export function init__concurrent__sapper(page) {
	page.subscribe($page => {
		const concurrent_id__old = concurrent_id
		const concurrent_id__new = _uuid()
		$page.concurrent_id = concurrent_id__new
		__concurrent_id.set(concurrent_id__new)
		if (concurrent_id__old !== concurrent_id__default) {
			__concurrent_id__destroy.set(concurrent_id__old)
		}
	})
}

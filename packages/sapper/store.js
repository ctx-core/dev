import { writable } from 'svelte/store.mjs'
import { page } from '@sapper/app.mjs'
import { _uuid } from '@ctx-core/uuid/lib.js'
import {
	concurrent_id,
	concurrent_id__default,
	__concurrent_id,
	__concurrent_id__destroy,
} from '@ctx-core/store/store.js'
export const __session__sapper =
	writable(null,
		() => () => __session__sapper.set(null))
export const __page__sapper = writable()
page.subscribe($page => {
	const concurrent_id__old = concurrent_id
	const concurrent_id__new = _uuid()
	$page.concurrent_id = concurrent_id__new
	__concurrent_id.set(concurrent_id__new)
	if (concurrent_id__old !== concurrent_id__default) {
		__concurrent_id__destroy.set(concurrent_id__old)
	}
})
page.subscribe($page => {
	__page__sapper.set($page)
})

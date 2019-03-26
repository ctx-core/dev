import { writable } from 'svelte/store'
import { _has__dom } from '@ctx-core/dom'
export const concurrent_id__default = 'default'
export let concurrent_id = concurrent_id__default
export const __concurrent_id = writable(concurrent_id)
__concurrent_id.subscribe(__ => concurrent_id = __)
export const __concurrent_id__destroy = writable()
__concurrent_id__destroy.subscribe(concurrent_id__destroy => {
	if (concurrent_id === concurrent_id__destroy) __concurrent_id.set('default')
})

export const __ctx__store__global = writable(_has__dom() ? window : null)
export let ctx__store__global
__ctx__store__global.subscribe(__ => ctx__store__global = __)

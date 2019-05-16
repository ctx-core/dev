import { writable } from 'svelte/store'
import { _has__dom } from '@ctx-core/dom'
import { subscribe } from './lib'
export const concurrent_id__default = 'default'
export let concurrent_id = concurrent_id__default
export const __concurrent_id = writable(concurrent_id)
subscribe(__concurrent_id, __ => concurrent_id = __)
export const __concurrent_id__destroy = writable()
subscribe(__concurrent_id__destroy, concurrent_id__destroy => {
	if (concurrent_id === concurrent_id__destroy) __concurrent_id.set('default')
})

export const __ctx__store__global = writable(_has__dom() ? window : null)
export let ctx__store__global
subscribe(__ctx__store__global, __ => ctx__store__global = __)

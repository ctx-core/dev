import { writable } from 'svelte/store'
import { subscribe } from './lib'
declare const window
export const __ctx__store__global = writable(
	typeof window === 'undefined' ? null : window
)
export let ctx__store__global
subscribe(__ctx__store__global, __ => ctx__store__global = __)

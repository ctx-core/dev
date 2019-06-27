import { writable } from 'svelte/store'
import { _has__dom } from '@ctx-core/dom'
import { subscribe } from '../lib'
export const __ctx__store__global = writable(_has__dom() ? window : null)
export let ctx__store__global
subscribe(__ctx__store__global, __ => ctx__store__global = __)

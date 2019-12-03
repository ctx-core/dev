import { writable } from 'svelte/store'
import { not } from '@ctx-core/function'
export const __opened__nav = writable(false)
export function toggle__nav() {
  __opened__nav.update(not)
}
export function open__nav() {
  __opened__nav.set(true)
}
export function close__nav() {
  __opened__nav.set(false)
}

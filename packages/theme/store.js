import { writable } from 'svelte/store'
import { not } from '@ctx-core/function'
export const __theme__invert = writable()
export function invert__theme() {
  __theme__invert.update(not)
}

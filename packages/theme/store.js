import { writable, derived } from 'svelte/store'
import { subscribe__debug } from '@ctx-core/store'
import { _class } from '@ctx-core/html'
import { not } from '@ctx-core/function'
export const __theme__invert = writable(null)
export function invert__theme() {
  __theme__invert.update(not)
}
export const __class__theme__invert =
  derived(__theme__invert,
    theme__invert => _class({ theme__invert }))

import { writable } from 'svelte/store'
export const __scrollY__window = writable()
export function reset__scrollY__window() {
  __scrollY__window.set(window.scrollY)
}
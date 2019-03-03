import { writable } from 'svelte/store.mjs'
export const session__sapper = writable(null, () => () => session__sapper.set(null))

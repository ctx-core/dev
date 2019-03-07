import { writable, derive } from 'svelte/store.mjs'
const logPrefix = '@ctx-core/env/store.js'
export const NODE_ENV = writable(process.env.NODE_ENV)
export const is__production = derive(NODE_ENV, $NODE_ENV => $NODE_ENV === 'production')
export const is__staging = derive(NODE_ENV, $NODE_ENV => $NODE_ENV === 'staging')
export const is__development = derive(NODE_ENV, $NODE_ENV => $NODE_ENV === 'development')

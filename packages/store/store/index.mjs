import { writable } from 'svelte/store';
import { subscribe } from '@ctx-core/store';

const __ctx__store__global = writable(typeof window === 'undefined' ? null : window);
let ctx__store__global;
subscribe(__ctx__store__global, __ => ctx__store__global = __);

export { __ctx__store__global, ctx__store__global };

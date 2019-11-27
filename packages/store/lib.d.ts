import { Writable, Readable } from 'svelte/store';
/**
 * Asserts fn is a function then creates a derived stores
 * @param {Stores} stores
 * @param {function} fn
 * @returns {Readable}
 */
export declare function derived__assert(stores: any, fn: any, initial_value?: any): Readable<any>;
export declare const derived: typeof derived__assert;
/**
 * Spreads the first argument into the fn.
 * @param {Stores} stores
 * @param {function} fn
 * @returns {Readable}
 * @see nowrap__a1
 */
export declare function derived__spread(stores: [Readable<any>, ...Readable<any>[]], fn: any, initial_value?: any): Readable<any>;
/**
 * Delegates to store.subscribe
 * @param {Readable} store
 * @param {function} run
 * @param {function} [invalidate]
 * @returns {Unsubscriber}
 */
export declare function subscribe(store: Readable<any>, run: (any: any) => void, invalidate?: (any: any) => void): () => void;
/**
 * Subscribes the fn to store but does not have the initial call.
 * @param {Readable} store
 * @param {function} fn
 * @returns {function: void}
 */
export declare function subscribe__noinit(store: any, fn: any): () => void;
/**
 * Calls the given fn the next time the value of the store changes, then unsubscribes.
 * @param {Readable} store
 * @param {function} fn
 * @returns {Unsubscriber}
 */
export declare function subscribe__change__once(store: any, fn: any): () => void;
/**
 * Subscribes to multiple stores. The subscriber fn is called when any of the a1__store changes.
 * @param {Readable[]} a1__store
 * @param {function} fn
 * @returns {Unsubscriber}
 */
export declare function subscribe__multi(a1__store: any, fn: any): () => any[];
/**
 * Logs (console.debug) changes to a store
 * @param {Readable} store
 * @param {string} label
 * @returns {function(): Unsubscriber}
 */
export declare function subscribe__debug(store: any, label: any): () => void;
/**
 * Creates a Readable store that derives it's value from a async function.
 * @param {Stores} stores
 * @param {function:Promise} fn
 * @param initial_value
 * @returns {Readable}
 * @see derived__store
 */
export declare function derived__async(stores: any, fn: any, initial_value?: any): Readable<any>;
/**
 * Sets each nowrap__a1__store with val
 * @param {Stores} stores
 * @param val
 */
export declare function clear__store(stores: any, val?: any): void;
/**
 * Returns a function that [clear__store](#clear__store).
 * @param {Stores} stores
 * @param value
 * @returns {function(): void}
 */
export declare function _clear__store(stores: any, value?: any): () => void;
export interface Storable<T> extends Writable<T> {
    remove?(): void;
}
/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key        - `localStorage` key
 * @param {*} value        - default/initial value (if value is already set in `localStorage`, it will load that value instead)
 * @param {Function} fn        - handed off to `writable`
 * @returns {Writable}
 */
export declare function storable(key: any, value: any, fn: any): Storable<any>;
/**
 * Calls set on the given store with the given val
 * @param {Writable} store
 * @param val
 * @returns {void}
 */
export declare function set(store: any, val: any): any;
/**
 * Returns a function to set it's store argument with the given val
 * @param val
 * @returns {function(Writable): void}
 */
export declare function _set__val(val: any): (store: any) => any;
/**
 * Returns a function to set the given store using the value returned by `__`.
 * This is useful in conjunction with [subscribe](#subscribe).
 * @param {Writable} store
 * @param {Function|*} __ - function return value or value to set the given store
 * @returns {function(...[*]): void}
 */
export declare function _set__store(store: any, __?: (x: any) => any): (...a1__arg: any[]) => any;
export declare const ctx__global: {};
/**
 * Returns a function to ensure that a store with a key is defined on a ctx object,
 * otherwise it creates the store using the _store factory function.
 * @param _store
 * @param key
 */
export declare function _ensure__store<T>(_store: (ctx?: any, key?: string | symbol, opts?: any) => T, key?: string | symbol): (ctx?: any, opts?: any) => T;
export declare function _ensure__store__instance<T>(_store: (ctx?: any, key?: string | symbol, opts?: any) => T, key?: string | symbol): [(ctx?: any, key?: string | symbol, opts?: any) => T, T];

/**
 * @module @ctx-core/array/lib.js
 */
/**
 * ArrayLike object (ie arguments)
 * @property {integer} length
 * @typedef ArrayLike
 */
import { isArray } from '@ctx-core/object';
import { falsy, eq, concat, _a1__wrap } from '@ctx-core/function';
export { isArray, concat, _a1__wrap };
declare type nowrap__a2 = any[] | any[][];
declare type compare = (a: any, b: any) => number;
declare type compare__1 = (any: any, number?: any) => number;
declare type _is_match = (any: any, number?: any) => boolean;
declare type _val__item_key_idx = (val: any, item: any, string: any, number: any) => any;
/**
 * @typedef {*|*[]} nowrap__a1
 */
/**
 * @typedef {[]|*[][]} nowrap__a2
 */
/**
 * @typedef {function(...*): *} fn__spread
 */
/**
 * Apply the spread operator on `a1` into `fn`; `fn(...a1)`
 * @param {function} fn
 * @param {[]} a1
 * @returns {*}
 */
export declare function spread(fn: (...any: any[]) => any, a1: any | any[]): any;
/**
 * Returns a function taking an array calling [spread](#spread)
 * @param {function} fn
 * @returns {function(*[]): *}
 */
export declare function _spread(fn: (...any: any[]) => any): (a1: any | any[]) => any;
/**
 * Returns `nowrap__a2` wrapped as a 2-dimensional array
 * @param {[]} nowrap__a2
 * @returns {*[][]}
 */
export declare function _a2__wrap(nowrap__a2: nowrap__a2): undefined | any[];
/**
 * Is a1__a `===` to a1__b? Checks first level equality.
 * @param {*[]} a1__a
 * @param {*[]} a1__b
 * @returns {Boolean}
 */
export declare function _eql__a1(a1__a: any[], a1__b: any[]): boolean;
/**
 * Is a1__a `===` to a1__b based on `fn(a, b, i)`? Checks first level equality.
 * @param {*[]} a1__a
 * @param {*[]} a1__b
 * @param {function(*, *, Int)} fn
 * @returns {Boolean}
 */
export declare function _eql__a1__fn(a1__a: any[], a1__b: any[], fn: (a: any, b: any, number: any) => unknown): boolean;
/**
 * Returns a hash of arrays grouped by each key in each `ctx` in `a1__ctx`.
 * @param {nowrap__a1} nowrap__a1__ctx
 * @returns {Object.<string, Array>}
 */
export declare function _hash__key__a1(nowrap__a1__ctx: any | any[]): any;
/**
 * Returns length of `a1`
 * @param {*[]|falsy} a1
 * @returns {Int|falsy}
 */
export declare function _length__a1(a1: any[]): undefined | number;
/**
 * Returns true if `a1` is has a length
 * @param {*[]|falsy} a1
 * @returns {boolean}
 */
export declare function _present__a1(a1: any | any[]): boolean;
export declare const concat__a1: typeof concat;
/**
 * Returns true if argument is an array with more than one item
 * @param {*[]|falsy} a1
 * @returns {boolean}
 */
export declare function _has__multiple(a1: any[]): boolean;
export declare const _has__multiple__a1: typeof _has__multiple;
/**
 * Array#`concat`, setting falsy values to an empty Array (`[]`).
 * @param {*[]} a1
 * @param {...*} a1__rest
 * @returns {*[]}
 */
export declare function concat__default__a1(a1: any | any[], ...a1__rest: any[]): any[];
export declare const concat__truthy: typeof concat__default__a1;
/**
 * Delegates to Array#indexOf
 * @param {*[]} a1
 * @param {string} key
 * @returns {Boolean}
 */
export declare function indexOf(a1: any[], key: string | number): number;
/**
 * Insert `...a1__item` into `a1` at position `idx`.
 * @param {*[]} a1
 * @param {Int} idx
 * @param {...[]} a1__item
 * @returns {Array}
 */
export declare function insert(a1: any[], idx: number, ...a1__item: any): any[];
/**
 * Remove `count = 1` items from `a1` at position `idx`.
 * @param {*[]} a1
 * @param {Int} idx
 * @param {Int} count
 * @returns {*[]}
 */
export declare function remove__idx(a1: any[], idx: number, count?: number): any[];
export declare const remove__index: typeof remove__idx;
/**
 * Remove each `...a1__item` from `a1`.
 * @param {*[]} a1
 * @param {...*} a1__item
 * @returns {*[]}
 */
export declare function remove(a1: falsy | any[], ...a1__item: any): undefined | any[];
export declare const remove__a1: typeof remove;
/**
 * Returns the first item in `a1`.
 * @param {*[]} a1
 * @returns {*|falsy}
 */
export declare function _first(a1: falsy | any[]): undefined | any;
/**
 * Returns the _last item in the a1
 * @param {*[]} a1
 * @returns {*|falsy} Last item in the a1
 */
export declare function _last(a1: falsy | any[]): undefined | any;
export declare const _last__a1: typeof _last;
/**
 * Flattens the a1 & it's children into an a1 without chunks
 * @param {[]} a1
 * @returns {[]|falsy}
 */
export declare function flatten(a1: falsy | any[]): undefined | any;
/**
 * Splits array into chunks
 * @param {*[]} a1
 * @param {Int} length__chunk Length of each chunk
 * @returns {*[][]} The 2d array of chunks
 */
export declare function _a2__chunk(a1: any[], length__chunk: number): any[];
export declare const flatten__a1: typeof flatten;
/**
 * Removes null values from the array
 * @param {*[]} a1
 * @returns {*[]} The array with null values removed
 */
export declare function compact(a1: falsy | any[]): undefined | any[];
export declare const compact__a1: typeof compact;
/**
 * @typedef {function(*, Int, *[]): *} predicate
 */
/**
 * Returns true if every `predicate(value)` is truthy
 * @param {*[]} a1
 * @param {predicate} predicate - The every predicate function
 * @returns {Boolean} true if every `predicate(value)` is truthy
 */
export declare function every(a1: any[], predicate: (item: any, number: any, a1: any) => unknown): boolean;
export declare const every__a1: typeof every;
/**
 * Returns a function that returns from [every](#every) with the given `predicate` function.
 * @param {predicate} predicate - The every predicate function
 * @returns {function(*[]): Boolean}
 */
export declare function _every(predicate: (any: any, number: any, a1: any) => unknown): (a1: any[]) => boolean;
export declare const _fn__every: typeof _every;
/**
 * Returns true if some `predicate(value)` is truthy
 * @param {*[]} a1
 * @param {predicate} predicate - The some predicate function
 * @returns {Boolean} true if some `predicate(value)` is truthy
 */
export declare function some(a1: any[], predicate: (any: any, number: any, a1: any) => unknown): boolean;
export declare const some__a1: typeof some;
/**
 * Returns a function that returns from [some](#some) with given `predicate` function.
 * @param {predicate} predicate - The some predicate function
 * @returns {function(*[]): Boolean}
 */
export declare function _some(predicate: (any: any, number: any, a1: any) => unknown): (a1: any[]) => boolean;
export declare const _fn__some: typeof _some;
/**
 * Returns the _union of n arrays
 * @param {nowrap__a2} nowrap__a2 - Performs the _union on the 2d array.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export declare function _union(nowrap__a2: nowrap__a2): any[];
export declare const _union__a1: typeof _union;
export declare const _uniq: typeof _union;
export declare const _uniq__a1: typeof _union;
/**
 * Returns the _intersection of n arrays
 * @param {nowrap__a2} nowrap__a2 - Performs the _intersection on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export declare function _intersection(nowrap__a2: nowrap__a2): any[];
export declare const _intersection__a1: typeof _intersection;
/**
 * Returns the _difference of n arrays
 * @param {nowrap__a2} nowrap__a2 - Performs the _difference on the 2d Array.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export declare function _difference(nowrap__a2: nowrap__a2): any[];
export declare const _difference__a1: typeof _difference;
/**
 * splice out any `array` elements matching `selector`
 * @param {*[]} a1
 * @param {function(*, Int, *[])} selector - truthy elements are spliced out
 * @returns {*[]}
 */
export declare function splice__selector(a1: any[], selector: (any: any, number: any, a1: any) => unknown): any[];
export declare const splice__selector__a1: typeof splice__selector;
/**
 * @typedef {function(*, *): Int|falsy} fn__compare
 */
/**
 * Sort items in `a1` by the `compare` function
 * @param {*[]} a1
 * @param {compare} compare
 * @returns {(Array|null|undefined)}
 */
export declare function sort(a1: falsy | any[], compare?: compare): undefined | any[];
/**
 * Reverses the order of items in `a1` by mutating `a1`.
 * @param {*[]} a1
 * @returns {*[]}
 */
export declare function reverse(a1: falsy | any[]): undefined | any[];
/**
 * Returns a Function that calls [sort](#sort) with the given `compare` function.
 * @param {fn__compare} compare
 * @returns {function(*=): Array}
 */
export declare function _sort(compare?: compare): (a1: falsy | any[]) => undefined | any[];
export declare const _fn__sort: typeof _sort;
/**
 * Returns a basic ascending or descending `compare` function to be used for sorting.
 * @param {Boolean} [asc=true] ascending or descending
 * @returns {fn__compare} Function that compares two values
 */
export declare function _compare(asc?: boolean): compare;
export declare const _fn__compare: typeof _compare;
/**
 * Compare function to sort by ascending order.
 * @type {fn__compare}
 */
export declare const compare__asc: compare;
export declare const fn__compare__asc: compare;
/**
 * Compare function to sort by descending order.
 * @type {fn__compare}
 */
export declare const compare__desc: compare;
export declare const fn__compare__desc: compare;
/**
 * Return a compare function to sort on key values.
 * @param {string} key - Return function compares on `Object[key]`
 * @param {Boolean} [asc=true] ascending or descending
 * @returns {fn__compare} Function that compares two `value[key]`
 */
export declare function _compare__key(key: any, asc?: boolean): (a: any, b: any) => number;
export declare const _sort__key: typeof _compare__key;
export declare const _sort__key__a1: typeof _compare__key;
/**
 * Sorts a copy of `a1` by the `compare` function.
 * @param {*[]} a1
 * @param {fn__compare}
 * @returns {*[]}
 */
export declare function _a1__sort(a1: falsy | any[], compare?: compare): undefined | any[];
/**
 * Returns an Array of incrementing index (`idx`) values with `start=0`.
 * @param {Int} count
 * @param {Int} start=0
 * @returns {Int[]}
 */
export declare function _a1__idx(count: number, start?: number): any[];
/**
 * Returns an Array of indices inverted from `a1__idx`.
 * @param {Int[]} a1__idx
 * @returns {*[]|*}
 * @example `_a1__idx__invert([2, 1, 3, 0]) -> [3, 1, 0, 2]`
 */
export declare function _a1__idx__invert(a1__idx: falsy | number[]): undefined | any[];
declare type ctx__idx__sort = {
    a1__idx__sort: number[];
    a1__val__sort: any[];
};
/**
 * Array of sort indices.
 * @typedef {Int[]} a1__idx__sort
 */
/**
 * Array of sort values.
 * @typedef {Int[]} a1__val__sort
 */
/**
 * `ctx` of sorted values & indices.
 * @typedef {{
 *   a1__idx__sort: a1__idx__sort,
 *   a1__val__sort: a1__val__sort,
 * }} ctx__idx__sort
 */
/**
 * Returns a [ctx__idx__sort](#ctx__idx__sort).
 * @param {*[]} a1
 * @param {fn__compare} compare
 * @returns {ctx__idx__sort}
 */
export declare function _ctx__idx__sort(a1: falsy | any[], compare?: compare): ctx__idx__sort;
declare type fn__a1__ctx__idx__sort = (a1: any[]) => ctx__idx__sort;
/**
 * Returns function that returns [_ctx__idx__sort](#_ctx__idx__sort).
 * @param {fn__compare} compare
 * @returns {function(*[]): ctx__idx__sort}
 */
export declare function _fn__ctx__idx__sort(compare?: compare): fn__a1__ctx__idx__sort;
/**
 * Returns an Array of sorted values from [ctx__idx__sort](#ctx__idx__sort).a1__val__sort
 * @param {ctx__idx__sort} ctx__idx__sort
 * @returns {*[]|falsy}
 */
export declare function _a1__val__sort(ctx__idx__sort: falsy | ctx__idx__sort): undefined | any[];
/**
 * Returns an Array of sorted indices from [ctx__idx__sort](#ctx__idx__sort).a1__idx__sort
 * @param {ctx__idx__sort} ctx__idx__sort
 * @returns {*[]|falsy}
 */
export declare function _a1__idx__sort(ctx__idx__sort: falsy | ctx__idx__sort): undefined | number[];
/**
 * Sort `a1__val` by an array of indices in `a1__idx__sort`.
 * @param {*[]} a1__val
 * @param {Int[]} a1__idx__sort
 * @returns {Array}
 */
export declare function _a1__sort__idx(a1__val: falsy | any[], a1__idx__sort: falsy | number[]): undefined | number[];
/**
 * Returns [ctx__idx__sort](#ctx__idx__sort) derived from `a1__val` sorted by `a1__idx__sort`.
 * @param {Array} a1__val
 * @param {Array<Int>} a1__idx__sort
 * @returns {ctx__idx__sort}
 */
export declare function _ctx__idx__sort__a1__sort__idx(a1__val: any[], a1__idx__sort: number[]): ctx__idx__sort;
/**
 * Returns the rank of the items where the compare function === 0
 * @param {Array} a1
 * @param {Function} compare__1 - rank compare function
 * @returns {integer} the rank of the items where the compare function === 0
 */
export declare function rank(a1: any[], compare__1: compare__1): number;
export declare const rank__a1: typeof rank;
/**
 * Returns the rank of the item where the compare function === 0, using binarySort
 * @param {Array} a1
 * @param {Function} compare__1 - rank compare function
 * @returns {integer} the rank of the items where the compare function === 0
 */
export declare function rank__binarySort(a1: any[], compare__1: compare__1): number;
export declare const rank__binarySort__a1: typeof rank__binarySort;
/**
 * Returns an array sorted by `item.name`
 * @param {Array} a1
 * @returns {Array.<*>} array sorted by `item.name`
 */
export declare function sort__name(a1: any[]): any[];
export declare const sort__name__a1: typeof sort__name;
/**
 * Returns a Hash with a key for each item in `a1__value` & value set to the return of `_value`.
 * @param {Array<String>} a1__value
 * @param {function(<String>, Int)} _value
 * @returns {Object}
 */
export declare function _hash__value(a1__value: falsy | any[], _value: (any: any, number: any) => any): any;
/**
 * Returns a Function that returns from [_hash__value](#_hash__value).
 * @param {function(<String>, Int)} _value
 * @returns {function(Array<string>): Object}
 */
export declare function _fn__hash__value(_value: (any: any, number: any) => any): (a1: falsy | any[]) => any;
/**
 * Returns an `Object.<key,value>` of the given `hash__key[a1[][key]] = a1[]`.
 * @param {Array.<Object.<key,value>>}
 * @param {string} key
 * @returns {Object.<key,value>}
 */
export declare function _hash__key(a1: falsy | any[], key: string | number): any;
/**
 * Returns a Function using argument `key` that returns value from [_hash__key](#_hash__key).
 * @param {string} key
 * @returns {function(Array): Object<key, value>}
 */
export declare function _fn__hash__key(key: string | number): (a1: falsy | any[]) => any;
/**
 * Returns a function that returns value of `_hash__item__idx` with `_item` argument.
 * @param {function(*, number)} [I] _item
 * @returns {function(function(*, number))}
 */
export declare function _fn__hash__item__idx(_item: (any: any, number: any) => any): (a1: falsy | any[]) => any;
/**
 * Returns an Object where each key is `_item(a1[idx], idx)` and value is `idx`.
 * @param {Array} a1
 * @returns {Object}
 */
export declare const _hash__item__idx: (a1: false | "" | 0 | any[]) => any;
/**
 * Returns a Hash where each key is `a1[idx][key]` & value is `idx`.
 * @param {Array<Object>} a1
 * @param {string} key
 * @param {function(*, *, string, number)} _val
 * @returns {Object}
 */
export declare function _hash__key__idx(a1: falsy | any[], key: string | number, _val?: _val__item_key_idx): any;
/**
 * Returns function that returns from [_hash__key__idx](#_hash__key__idx) with `_val` function argument.
 * @param {function(*, *, string, number)} _val
 * @returns {function(Array, string): Object}
 */
export declare function _fn__hash__key__idx(_val: _val__item_key_idx): (a1: falsy | any[], key: string) => any;
/**
 * Returns a random index in `a1`.
 * @param {Array} a1
 * @returns {Int}
 */
export declare function idx__random(a1: any[]): number;
/**
 * Calls push on a1
 * @param {array} a1
 * @param {...number} a1__arg
 * @returns {[]|null}
 */
export declare function push(a1: falsy | any[], ...a1__arg: any): undefined | any[];
/**
 * Calls slice on a1
 * @param {array} a1
 * @param {...number} a1__arg
 * @returns {[]|null}
 */
export declare function slice(a1: falsy | any[], idx__begin?: number, idx__end?: number): undefined | any[];
/**
 * Calls splice on a1
 * @param {[]}a1
 * @param {...number}a1__arg
 * @returns {[]|null}
 */
export declare function splice(a1: falsy | any[], start: number, delete_count?: number, ...a1__arg: any): undefined | any[];
/**
 * Returns an Array from slicing an a1 from an a1's offset from position i
 * @param {Array} a1
 * @param {Int} i
 * @param {Int} offset
 * @returns {Array}
 */
export declare function slice__i__offset(a1: falsy | any[], i: number, offset?: number): undefined | any[];
/**
 * Returns a `slice` function with the given `...a1__arg` that takes a Array `a1` as it's argument.
 * @param {...number} a1__arg
 * @returns {function(Array):(Array|null)}
 */
export declare function _slice(...a1__arg: any): (a1: falsy | any[]) => undefined | any[];
export declare const _fn__slice: typeof _slice;
/**
 * Returns a function that slices the spread argument array with `a1__arg`
 * @param {...number} a1__arg
 * @returns {function(...[*]): *[]}
 */
export declare function _slice__spread(...a1__arg: any): (...a1: any) => undefined | any[];
export declare const _fn__slice__spread: typeof _slice__spread;
/**
 * Returns offset index, i * offset
 * @param {Int} i
 * @param {Int} offset
 * @returns {Int}
 */
export declare function _i__offset(i: number, offset?: number): number;
/**
 * Returns Index of the previous item, circular wrapping to the end (`length - 1`).
 * @param {Int} length
 * @param {Int} index
 * @returns {Int}
 */
export declare function _idx__prev(length: number, index?: number): number;
export declare const _prev_idx: typeof _idx__prev;
/**
 * Returns Index of the next item, circular wrapping to the beginning (`0`).
 * @param {Int} length
 * @param {Int} index
 * @returns {Int}
 */
export declare function _idx__next(length: number, index?: number): number;
export declare const _next_idx: typeof _idx__next;
/**
 * Returns `idx` % `length`.
 * @param {Int} length
 * @param {Int} idx
 * @returns {Int}
 */
export declare function _idx__circular(length: number, idx?: number): number;
export declare const _circular_idx: typeof _idx__circular;
/**
 * Iterate over each item in `a1` with `fn(a1[i], i)`.
 * @param {Array} a1
 * @param {function(*, Int)} fn
 * @returns {Array} a1
 */
export declare function each(a1: falsy | any[], fn: (any: any, number: any) => any): undefined | any[];
/**
 * Map return value of `fn(a1[], i)` into an Array.
 * @param {Array} a1
 * @param {function(*, number)} fn
 * @returns {Array}
 */
export declare function map(a1: falsy | any[], fn: (any: any, number: any) => any): undefined | any[];
/**
 * Returns Function returning [map](#map) with `fn`.
 * @param {function(*, number)} fn
 * @returns {function(Array)}
 */
export declare function _map(fn: (any: any, number: any) => any): (a1: falsy | any[]) => undefined | any[];
export declare const _fn__map: typeof _map;
declare type fn__reduce = (memo: any, item: any, idx: number, a1: any[]) => any[];
/**
 * Returns reduced `memo` iterating over `a1` with `fn(memo, a1[], i, a1)`.
 * @param {Array} a1
 * @param {function(*, *, number, Array)} fn
 * @param memo
 * @returns {*} memo
 */
export declare function reduce(a1: falsy | any[], fn: fn__reduce, memo: any): undefined | any;
declare type _memo = (a1: any[]) => any;
/**
 * Return Function that returns from `reduce` with `fn` and factory `_memo(a1)`.
 * @param {function(*, *, number, Array)} fn
 * @param {function(Array)} _memo - Returns a `memo` for [reduce](#reduce)
 * @returns {function(Array, *): *}
 */
export declare function _reduce(fn: fn__reduce, _memo: falsy | _memo): any;
export declare const _fn__reduce: typeof _reduce;
/**
 * Returns 2d Array of each item being the index value for each Array in `...a2__zipWith`.
 * @param {...Array} a2__zipWith
 * @returns {Array<Array>}
 */
export declare function zip(nowrap__a2: nowrap__a2): undefined | any[];
/**
 * Returns 2d Array where each item being the return value of `fn` given the index value for each Array in `nowrap__a2`.
 * @param {*|Array<Array>} nowrap__a2
 * @param {function(Array, number)} fn
 * @returns {Array<Array>}
 */
export declare function zipWith(nowrap__a2: nowrap__a2, fn?: (...any: any[]) => any): undefined | any[];
/**
 * Returns a function that returns [zipWith](#zipWith) with `fn` argument.
 * @param {function(Array, function)} fn
 * @returns {function(...[*]=): Array<Array>}
 */
export declare function _zipWith(fn: (...any: any[]) => any): (...a2: any[]) => undefined | any[];
export declare const _fn__zipWith: typeof _zipWith;
/**
 * Returns a sparsely populated Array with `a1__idx` indices & `a1__val` values
 * @param {Array<number>} a1__idx - Indices of returned Array.
 * @param {Array} a1__val - Values of returned Array.
 * @returns {Array}
 */
export declare function _a1__sparse(a1__idx: number[], a1__val: any[]): any[];
/**
 * Array of indices.
 * @typedef {Array<Int>} a1__idx
 */
/**
 * Array of values.
 * @typedef {Array<Int>} a1__val
 */
/**
 * `ctx` of values & indices.
 * @typedef {{
 *   a1__idx: a1__idx,
 *   a1__idx: a1__idx,
 *   a1__val: a1__val,
 *   a1__val: a1__val,
 * }} ctx__idx
 */
declare type ctx__compact__a1__sparse = {
    a1__idx: number[];
    a1__val: any[];
};
/**
 * Returns a [ctx__idx](#ctx__idx).
 * @param {Array} a1__sparse
 * @returns {ctx__idx}
 */
export declare function _ctx__compact__a1__sparse(a1__sparse: any[]): ctx__compact__a1__sparse;
/**
 * Returns a function that returns value from [_ctx__compact__a1__thold__entry](#_ctx__compact__a1__thold__entry)
 * @param {function(*, *): _eq} fn__eq
 * @returns {function(Array): ctx__idx}
 */
export declare function _fn__ctx__compact__a1__thold__entry(fn__eq?: typeof eq): (a1__val__: any) => {
    a1__idx: any[];
    a1__val: any[];
};
/**
 * Returns a [ctx__idx](#ctx__idx) of presumably sorted items in `a1__val__` at each index of the new item for each changed item.
 * @param {Array} a1__val__
 * @returns {{ a1__idx, a1__val }}
 */
export declare const _ctx__compact__a1__thold__entry: (a1__val__: any) => {
    a1__idx: any[];
    a1__val: any[];
};
/**
 * Returns a function that returns value from [_ctx__compact__a1__thold__exit](#_ctx__compact__a1__thold__exit)
 * @param {function(*, *): _eq} _eq
 * @returns {function(Array): ctx__idx}
 */
export declare function _fn__ctx__compact__a1__thold__exit(fn__eq?: typeof eq): (a1__val__: any) => {
    a1__idx: any[];
    a1__val: any[];
};
/**
 * Returns a [ctx__idx](#ctx__idx) of presumably sorted items in `a1__val__` at each index of the old item for each changed item.
 * @param {Array} a1__val__
 * @param {function(*, *): eq} fn__eq
 * @returns {ctx__idx}
 */
export declare const _ctx__compact__a1__thold__exit: (a1__val__: any) => {
    a1__idx: any[];
    a1__val: any[];
};
/**
 * Returns an Object the key & value are set from the zipped `a1__0` & `a1__1` Array of `[key, value]` pairs.
 * @param {[[], []]} Array of 2 arrays to zip together
 * @returns {Object} Object of zipped key/value from items in 2d array
 */
export declare function _hash__zip__key__value([a1__0, a1__1]: [any, any]): {};
/**
 * Returns Array where items in `a1` are filtered by `fn`.
 * @param {Array} a1
 * @param {function(*, Int)} _is_match
 * @returns {Array|null}
 */
export declare function filter(a1: falsy | any[], _is_match: _is_match): undefined | any[];
/**
 * Returns function that returns value from [filter](#filter) with `fn` argument.
 * @param {function(*, Int)} _is_match
 * @returns {function(Array):(Array|null)}
 */
export declare function _filter(_is_match: _is_match): (a1: any) => any[];
export declare const _fn__filter: typeof _filter;
/**
 * Returns Array of `idx` indices filtered by `fn`.
 * @param {Array} a1
 * @param {function(*, Int)} _is_match
 * @returns {Array|null}
 */
export declare function filter__idx(a1: falsy | any[], _is_match?: _is_match): undefined | any[];
/**
 * Returns function that returns value from [filter__idx](#filter__idx) with `fn` argument.
 * @param {function(*, Int)} _is_match
 * @returns {function(Array):(Array|null)}
 */
export declare function _filter__idx(_is_match?: _is_match): (a1: falsy | any[]) => undefined | any[];
export declare const _fn__filter__idx: typeof _filter__idx;
/**
 * Returns Array of items not rejected by `fn`.
 * @param {Array} a1
 * @param {function(*, Int)} _is_match
 * @returns {Array|null}
 */
export declare function reject(a1: any, _is_match: _is_match): undefined | any[];
/**
 * Returns function that returns value from [reject](#reject) with `fn` argument.
 * @param {function(*, Int)} _is_match
 * @returns {function(Array):(Array|null)}
 */
export declare function _reject(_is_match: _is_match): (a1: falsy | any[]) => undefined | any[];
export declare const _fn__reject: typeof _reject;
/**
 * Returns Array of indices `idx` not rejected by `fn`.
 * @param {Array} a1
 * @param {function(*, Int)} fn
 * @returns {Array|null}
 */
export declare function reject__idx(a1: falsy | any[], fn: _is_match): undefined | any[];
/**
 * Returns function that returns value from [reject__idx](#reject__idx) with `fn` argument.
 * @param {function(*, Int)} fn
 * @returns {function(Array):(Array|null)}
 */
export declare function _reject__idx(fn: any): (a1: any) => any[];
export declare const _fn__reject__idx: typeof _reject__idx;
/**
 * Returns first item in `a1` where `fn(a1[idx], idx)` is truthy.
 * @param {Array} a1
 * @param {function(*, Int)} fn
 * @returns {Array|null}
 */
export declare function find(a1: falsy | any[], fn: _is_match): undefined | any;
/**
 * Returns function that returns value from [find](#find) with `fn` argument.
 * @param {function(*, Int)} fn
 * @returns {function(Array): *}
 */
export declare function _find(fn: any): (a1: any) => any;
/**
 * Returns first return value of `fn(a1[idx], idx)` where `fn(a1[idx], idx)` is truthy.
 * @param {Array} a1
 * @param {function(*, Int)} fn
 * @returns {*}
 */
export declare function find__map(a1: falsy | any[], fn: (any: any, number: any) => falsy | any[]): undefined | any[];
/**
 * Returns function that returns value from [find__map](#find__map) with `fn` argument.
 * @param {function(*, Int)} fn
 * @returns {function(Array): *}
 */
export declare function _find__map(fn: any): (array: any) => any[];
/**
 * Returns idx of first match in `a1` with `compare`.
 * @param {Array} a1
 * @param {*|function(*, Int)} compare
 * @returns {Int}
 */
export declare function _idx(a1: falsy | any[], compare: any | _is_match): number;
/**
 * Returns Array of mapped `a1` with `_andand(...a1__attr)`.
 * @param {Array} a1
 * @param {...string} a1__attr
 * @returns {Array}
 */
export declare function map__andand(a1: any, ...a1__attr: any[]): any[];
/**
 * Returns Array of mapped `a1` with `_andand_(...a1__attr)`
 * @param {Array} a1
 * @param {...string} a1__attr
 * @returns {Array}
 */
export declare function map__andand_(a1: any, ...a1__attr: any[]): any[];
export declare const map__andand__fn: typeof map__andand_;
/**
 * Returns function that returns value from [map__andand](#map__andand) with `...a1__attr`.
 * @param {...string} a1__attr
 * @returns {function(Array): Array}
 */
export declare function _map__andand(...a1__attr: any[]): (a1: any) => any[];
export declare const _fn__map__andand: typeof _map__andand;
/**
 * Returns function that returns value from [map__andand_](#map__andand_) with `...a1__attr`.
 * @param {...string} a1__attr
 * @returns {function(Array): Array}
 */
export declare function _map__andand_(...a1__attr: any[]): (a1: any) => any[];
export declare const _fn__map__andand__fn: typeof _map__andand_;
/**
 * Returns Array of mapped `a1` with `_andand(...a1__attr)` or the return value of `fn__or`.
 * @param {Array} a1
 * @param {arg__andand} a1__attr
 * @param {fn__or} fn__or
 * @returns {Array}
 */
export declare function map__andand__or(a1: any, a1__attr: any, fn__or: any): any[];
/**
 * Returns Array of inverse values (1/n) of each item in `a1`.
 * @param {Array<number>} a1
 * @returns {Array<number>}
 */
export declare function map__inverse(a1: any): any[];
/**
 * Returns Array of values from `a1` with index in `a1__idx`.
 * @param {Array<Int>} a1__idx
 * @param {Array} a1
 * @returns {Array}
 */
export declare function map__a1__idx__in__a1(a1__idx: any, a1: any): any[];
/**
 * Returns 2d Array where `a1__source` is destructured into subarray of length `offset`.
 * @param {Array} a1__source
 * @param {Int} offset
 * @returns {*[]}
 */
export declare function _a2__destructure__offset(a1__source: any, offset?: number): any[];
/**
 * Returns Array of values `>= 0` in `a1__val`.
 * @param {number[]} a1__val
 * @returns {number[]}
 */
export declare function _a1__gte__0(a1__val: any): any[];
/**
 * Returns Array of values `<= 0` in `a1__val`.
 * @param {number[]} a1__val
 * @returns {number[]}
 */
export declare function _a1__lte__0(a1__val: any): any[];
/**
 * Returns Array of `obj[a1__key[]]`.
 * @param {Object} obj
 * @param {string[]} a1__key
 * @returns {*[]}
 */
export declare function _a1__val__from__a1__key(obj: any, a1__key: any): any[];

/**
 * @typedef {Object} ctx
 */
/**
 * Assigned to the ctx using [assign](#assign)
 * @typedef {ctx} ctx__assign
 */
/**
 * Assigns ctx__assign to ctx.
 * @function assign
 * @param {ctx} ctx
 * @param {...ctx__assign} ctx__assign - Assigned to ctx
 */
export declare function assign(obj: any, ...arg_a1: any[]): any;
export declare function assign__a1(arg_a1: any[]): any;
/**
 * Object keys
 * @function keys
 */
export declare const keys: any;
/**
 * Object values
 * @function values
 */
export declare const values: any;
/**
 * Returns string representation of an object. Alias to `Object.prototype.string`
 * @type {function(): string}
 */
export declare const toString: any;
/**
 * Is the argument an Array?
 * @param obj
 * @returns {boolean}
 */
export declare function isArray(obj: any): any;
/**
 * Returns boolean of `obj` is an object
 * @param obj
 * @returns {*|boolean}
 */
export declare function _is__Object(obj: any): boolean;
/**
 * Alias to [_is__Object](#_is__Object)
 * @param obj
 * @returns {*|boolean}
 */
export declare const isObject: typeof _is__Object;
/**
 * If a key is given, returns boolean of whether or not the given key is a member of the obj.
 * If no key is given, returns a boolean of whether or not the obj has any key.
 * @param {*}obj
 * @param {string=}key
 * @returns {boolean}
 */
export declare function _has__key(obj: any, key?: string): boolean;
/**
 * Returns the obj with default values. If `obj[key] == null`, use `default[key]`
 * @param {*} obj
 * @param {...*} a1__defaults values to set on `obj` if `obj[key] == null`
 * @returns {obj}
 */
export declare function defaults(obj: any, ...a1__defaults: any[]): any;
/**
 * Assign only if obj is not null
 * @param {*} obj
 * @param {...*} *
 * @returns {obj} obj
 */
export declare function assign__unless__null(obj: any, ...arg_a1: any[]): any;
/**
 * Assigns arguments to new object
 * @param {...*} * Assigned to cloned object
 * @returns {*} assigned object
 */
export declare function clone(...arg_a1: any[]): any;
/**
 * Performs a deep clone of the assigned arguments
 * @returns {*}
 */
export declare function clone__deep(...arg_a1: any[]): any;
/**
 * Mixin properties from a1__source into target
 * @param {Object} target
 * @param {...*} a1__source
 * @returns target
 * @example
 * mixin(obj, {
 *		get foo() {
 *			return 'bar'
 *		}
 *	})
 */
export declare function mixin(target: any, ...a1__source: any[]): any;
/**
 * Performs a deep merge on the target with each a1__source
 * @param target
 * @param {...*} a1__source
 * @returns target
 */
export declare function merge(target: any, ...a1__source: any[]): any;
/**
 * Ensures that the keys in `a1__ctx__rest` are added to obj
 *   only if the key is not defined on obj (== null).
 * The order of precedence is from left to right.
 * @param {obj} obj
 * @param {...obj} a1__ctx__rest
 *   Rest of key/value pairs to define if not defined on obj
 * @returns {obj}
 * @example
 * obj = {baz: 99}
 * ensure(obj, {foo: 1, baz: 4}, {foo: 2, bar: 3}) // {baz:99, foo: 1, bar: 3}
 */
export declare function ensure(obj: any, ...a1__ctx__rest: any[]): any;
/**
 * New `obj` with only `a1__key`.
 * @param {*} obj
 * @param {...string} a1__key
 * @returns {{}}
 */
export declare function pick(obj: any, ...a1__key: any[]): {};
/**
 * Returns a function that calls [pick](#pick) with the given `...a1__key`
 * @param {...string}a1__key
 * @returns {function(*=, ...[*]): {}}
 */
export declare function _pick(...a1__key: any[]): (obj: any, ...a1__key__: any[]) => {};
/**
 * Returns object with picked values,
 * not including including inherited property values (i.e. if hasOwnProperty is false).
 * @param {*} obj
 * @param {...string} a1__key
 */
export declare function pick__hasOwnProperty(obj: any, ...a1__key: any[]): {};
/**
 * Does not include `a1__keys` from `obj`
 * @param {*} obj
 * @param {...string} a1__key
 */
export declare function unpick(obj: any, ...a1__key: any[]): {};
/**
 * Picks the keys on `obj__keys` from `obj`
 * @param {*} obj
 * @param {*} obj__keys
 */
export declare function pick__keys(obj: any, obj__keys: any): {};
/**
 * Does not include keys on `obj__keys` from `obj`
 * @param {*} obj
 * @param {*} obj__keys
 */
export declare function unpick__keys(obj: any, obj__keys: any): {};
/**
 * Returns an array of objects with [pick](#pick) applied.
 * @param {*} obj
 * @param {...string} a1__key
 * @returns {*[]}
 */
export declare function _a1__value__pick(obj: any, ...a1__key: any[]): any[];
/**
 * Exclude keys from obj
 * @param {*}obj
 * @param {...string} a1__key
 * @returns {*}
 */
export declare function exclude(obj: any, ...a1__key: any[]): {};
/**
 * Compare function used by some to determine if some of the calls to some__compare(value, key) match.
 * @typedef {function} some__compare
 * @param {*} value - The value of the current key/value iteration.
 * @param {string} key - The key of the current key/value iteration.
 * @returns {boolean} true if there's a match. false if there's no match.
 */
/**
 * Returns true when some of the key/value pairs cause the fn to be truthy.
 * @param {object} obj - The object on which to run the some__compare(value, key)
 * @param {some__compare} some__compare - The compare function receiving compare(value, key)
 * @returns {boolean} True when at least one of the calls to some__compare(value, key) are truthy
 * @example
 * some({foo: 9, bar: 10}, (value, key) => value === 10) // returns true
 * some({baz: 11, quux: 12}, (value, key) => value === 10) // returns false
 */
export declare function some(obj: any, some__compare: any): boolean;
/**
 * @typedef {ctx} ctx__ensure__refresh
 * @param {string} key
 * @param {function(*): *} ensure Called when `ctx[key]` is falsy.
 * `ctx[key]` is set to the return value.
 * @param {function(*, *)} refresh Called with the ensured value of `obj[key]`.
 */
/**
 * `ensure` `obj[key]` is present or call `ctx__refresh.init`. Then call `ctx__refresh.refresh`.
 *
 * - if `!obj[key]` `ctx__refresh.ensure(obj)`
 * - `a1__ctx__refresh.refresh(obj, obj[key])`
 * @param {*} obj
 * @param {...ctx__ensure__refresh} a1__ctx__refresh
 * @returns {*} The value of the obj[key]
 */
export declare function ensure__refresh(obj: any, ...a1__ctx__refresh: any[]): any;
declare type opts__or = {
    value?: any;
    value__or?: any;
    value__nor?: any;
};
/**
 * @typedef opts__or
 * @param {*} value
 * @param {*} value__or
 * @param {*=} value__nor
 */
/**
 * return the `value` if not null or `value__or`
 * @param {opts__or} opts
 * @returns {*} `value` if not null or `value__or`
 */
export declare function or__null(opts?: opts__or): any;
/**
 * Returns true if obj has given key; false otherwise.
 * If no key given, returns true if obj has any key; false otherwise.
 * @param obj
 * @param {string|null} key
 * @returns {boolean}
 */
export declare function has__key(obj: any, key?: symbol): boolean;
/**
 * Returns true if obj has at least 1 key
 * @param obj
 * @returns {boolean}
 */
export declare function has__some__key(obj: any): boolean;
/**
 * Returns obj with keys in `a1__key` having `value__clear`.
 * @param {string[]} a1__key
 * @param value__clear
 * @return {*}
 */
export declare function _ctx__clear(a1__key: any, value__clear: any): {};
/**
 * Returns obj with  zipped a1__value
 * @param {string[]} a1__key
 * @param {*[]} a1__value
 * @returns {*}
 */
export declare function _ctx__zip(a1__key: any, a1__value: any): {};
/**
 * Sets obj values to false when `== null`.
 * @param {*} obj
 * @param {...string} a1__key
 * @returns {*}
 */
export declare function set__false__if__null(obj: any, ...a1__key: any[]): any;
/**
 * @typedef {function} fn__map__obj
 * @param {*} value
 * @param (string} key
 */
/**
 * Maps values in `obj` to `fn`, returning object with values returned by `fn`.
 * @param obj
 * @param {fn__map__obj} fn
 * @returns {*}
 */
export declare function map__obj(obj: any, fn: any): {};
/**
 * Map `values` `andand` `a1__key` in `obj` to `fn`, returning object with values return by `fn`.
 * @param obj
 * @param {...string} a1__key
 * @returns {*}
 */
export declare function map__obj__andand(obj: any, ...a1__key: any[]): {};
/**
 * Returns function to map `obj` to `fn` returning object with values.
 * @param {fn__map__obj} fn
 * @returns {function(*)}
 */
export declare function _map__obj(fn: any): (obj: any) => {};
export declare const _fn__map__obj: typeof _map__obj;
/**
 * Returns function to
 * map `values` `andand` `a1__key` in `obj` to `fn`, returning object with values return by `fn`.
 * @param {...string} a1__key
 * @returns {function(*)}
 */
export declare function _map__obj__andand(...a1__key: any[]): (obj: any) => {};
export declare const _fn__map__obj__andand: typeof _map__obj__andand;
/**
 * Returns Array of `[value, key]` in `obj`
 * @param obj
 * @returns {*[]}
 * @returns {Array<Array<key, value>>}
 */
export declare function _a2__key__value(obj: any): any[];
/**
 * Returns Hash of each `value[key]` in `obj`.
 * @param obj
 * @param {string} key
 * @returns {*}
 */
export declare function _hash__key__obj(obj: any, key: any): {};
export declare type fn__assign = (value: any, obj?: any, key?: string) => any;
/**
 * Assigns function calls into obj
 * @param obj
 * @param a1__h__fn__assign
 */
export declare function assign__call(obj: any, ...a1__h__fn__assign: {
    [prop_name: string]: fn__assign;
}[]): any;
export declare type tuple__key_a1__fn = [string[], fn__assign];
/**
 * Assigns to obj array of keys the return value of function in a2__key_a1__fn.
 * @param obj
 * @param a2__key_a1__fn[...tuple__key_a1__fn[]]
 */
export declare function assign__key_a1__fn(obj: any, ...a2__key_a1__fn: tuple__key_a1__fn[]): any;
/**
 * Assigns to cloned obj array of keys the return value of function in a2__key_a1__fn.
 * @param obj
 * @param a2__key_a1__fn[...tuple__key_a1__fn[]]
 */
export declare function clone__assign__key_a1__fn(obj: any, ...a2__key_a1__fn: tuple__key_a1__fn[]): any;
export {};

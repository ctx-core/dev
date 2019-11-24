import { _andand } from '@ctx-core/function'
declare const Object
declare const Array
declare const JSON
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
export function assign(obj, ...arg_a1:any[]) {
	return Object.assign(obj, ...arg_a1)
}
export function assign__a1(arg_a1:any[]) {
	return Object.assign(...arg_a1)
}
/**
 * Object keys
 * @function keys
 */
export const keys = Object.keys.bind(Object)
/**
 * Object values
 * @function values
 */
export const values = Object.values.bind(Object)
/**
 * Returns string representation of an object. Alias to `Object.prototype.string`
 * @type {function(): string}
 */
export const toString = Object.prototype.toString
const isArray__native = Array.isArray
/**
 * Is the argument an Array?
 * @param obj
 * @returns {boolean}
 */
export function isArray(obj) {
	return isArray__native ? isArray__native(obj) : toString.call(obj) === '[object Array]'
}
/**
 * Returns boolean of `obj` is an object
 * @param obj
 * @returns {*|boolean}
 */
export function _is__Object(obj) {
	return obj && toString.call(obj) === '[object Object]'
}
/**
 * Alias to [_is__Object](#_is__Object)
 * @param obj
 * @returns {*|boolean}
 */
export const isObject = _is__Object
/**
 * If a key is given, returns boolean of whether or not the given key is a member of the obj.
 * If no key is given, returns a boolean of whether or not the obj has any key.
 * @param {*}obj
 * @param {string=}key
 * @returns {boolean}
 */
export function _has__key(obj, key?:string) {
	const keys__ = keys(obj)
	return (
		key
		? keys__.indexOf(key) > -1
		: !!keys__.length
	)
}
/**
 * Returns the obj with default values. If `obj[key] == null`, use `default[key]`
 * @param {*} obj
 * @param {...*} a1__defaults values to set on `obj` if `obj[key] == null`
 * @returns {obj}
 */
export function defaults(obj, ...a1__defaults:any[]) {
	const defaults = clone(...a1__defaults)
	for (let key in obj) {
		if (obj[key] == null) obj[key] = defaults[key]
	}
	return obj
}
/**
 * Assign only if obj is not null
 * @param {*} obj
 * @param {...*} *
 * @returns {obj} obj
 */
export function assign__unless__null(obj, ...arg_a1:any[]) {
	return (obj == null) ? obj : assign(obj, ...arg_a1)
}
/**
 * Assigns arguments to new object
 * @param {...*} * Assigned to cloned object
 * @returns {*} assigned object
 */
export function clone(...arg_a1) {
	return assign({}, ...arg_a1)
}
/**
 * Performs a deep clone of the assigned arguments
 * @returns {*}
 */
export function clone__deep(...arg_a1) {
	return JSON.parse(JSON.stringify(clone(...arg_a1)))
}
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
export function mixin(target, ...a1__source) {
	if (!target) return
	for (let i = 0; i < a1__source.length; i++) {
		const source = a1__source[i]
		const propertyNames = Object.getOwnPropertyNames(source)
		for (let j = 0; j < propertyNames.length; j++) {
			const propertyName = propertyNames[j]
			Object.defineProperty(
				target,
				propertyName,
				Object.getOwnPropertyDescriptor(source, propertyName))
		}
	}
	return target
}
/**
 * Performs a deep merge on the target with each a1__source
 * @param target
 * @param {...*} a1__source
 * @returns target
 */
export function merge(target, ...a1__source) {
	if (!target) return
	// Loop through each object and conduct a merge
	for (let i = 0; i < a1__source.length; i++) {
		const source = a1__source[i]
		for (let prop in source) {
			if (source.hasOwnProperty(prop)) {
				if (Object.prototype.toString.call(source[prop]) === '[object Object]') {
					// If we're doing a deep merge and the property is an object
					target[prop] = merge(target[prop], source[prop])
				} else {
					// Otherwise, do a regular merge
					target[prop] = source[prop]
				}
			}
		}
	}
	return target
}
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
export function ensure(obj, ...a1__ctx__rest) {
	if (!obj) return
	for (let i = 0; i < a1__ctx__rest.length; i++) {
		const rest = a1__ctx__rest[i]
		const a1__key__ctx__rest = keys(rest || {})
		for (let j = 0; j < a1__key__ctx__rest.length; j++) {
			const key = a1__key__ctx__rest[j]
			if (obj[key] == null) {
				obj[key] = rest[key]
			}
		}
	}
	return obj
}
/**
 * New `obj` with only `a1__key`.
 * @param {*} obj
 * @param {...string} a1__key
 * @returns {{}}
 */
export function pick(obj, ...a1__key) {
	if (!obj) return
	let memo = {}
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		if (key in obj) {
			memo[key] = obj[key]
		}
	}
	return memo
}
/**
 * Returns a function that calls [pick](#pick) with the given `...a1__key`
 * @param {...string}a1__key
 * @returns {function(*=, ...[*]): {}}
 */
export function _pick(...a1__key) {
	return (obj, ...a1__key__)=>pick(obj, ...a1__key, ...a1__key__)
}
/**
 * Returns object with picked values,
 * not including including inherited property values (i.e. if hasOwnProperty is false).
 * @param {*} obj
 * @param {...string} a1__key
 */
export function pick__hasOwnProperty(obj, ...a1__key) {
	if (!obj) return
	let memo = {}
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		if (obj.hasOwnProperty(key)) memo[key] = obj[key]
	}
	return memo
}
/**
 * Does not include `a1__keys` from `obj`
 * @param {*} obj
 * @param {...string} a1__key
 */
export function unpick(obj, ...a1__key) {
	if (!obj) return
	let memo = {}
	const obj_key_a1 = keys(obj)
	for (let i = 0; i < obj_key_a1.length; i++) {
		const key = obj_key_a1[i]
		if (a1__key.indexOf(key) === -1) memo[key] = obj[key]
	}
	return memo
}
/**
 * Picks the keys on `obj__keys` from `obj`
 * @param {*} obj
 * @param {*} obj__keys
 */
export function pick__keys(obj, obj__keys) {
	return pick(obj, ...Object.keys(obj__keys))
}
/**
 * Does not include keys on `obj__keys` from `obj`
 * @param {*} obj
 * @param {*} obj__keys
 */
export function unpick__keys(obj, obj__keys) {
	return unpick(obj, ...Object.keys(obj__keys))
}
/**
 * Returns an array of objects with [pick](#pick) applied.
 * @param {*} obj
 * @param {...string} a1__key
 * @returns {*[]}
 */
export function _a1__value__pick(obj, ...a1__key) {
	if (!obj) return
	let a1__value = []
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		a1__value.push(obj[key])
	}
	return a1__value
}
/**
 * Exclude keys from obj
 * @param {*}obj
 * @param {...string} a1__key
 * @returns {*}
 */
export function exclude(obj, ...a1__key) {
	if (!obj) return
	const __ = {}
	const exclude = new Set(a1__key)
	for (let key in obj) {
		if (!exclude.has(key)) {
			__[key] = obj[key]
		}
	}
	return __
}
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
export function some(obj, some__compare) {
	if (!obj) return
	for (let key in obj) {
		if (some__compare(obj[key], key)) return true
	}
	return false
}
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
export function ensure__refresh(obj, ...a1__ctx__refresh) {
	if (!obj) return
	const ctx__refresh = clone(...a1__ctx__refresh)
	const {
		key,
		ensure,
		refresh
	} = ctx__refresh
	if (!obj[key]) {
		obj[key] = ensure(obj)
	}
	refresh(obj, obj[key])
	return obj[key]
}
type opts__or = {
	value?:any;
	value__or?:any;
	value__nor?:any;
}
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
export function or__null(opts:opts__or = {}) {
	const {
		value,
		value__or,
		value__nor
	} = opts
	return value == null ? value__or : (value__nor || value)
}
const symbol__no_key_arg = Symbol('no_key_arg')
/**
 * Returns true if obj has given key; false otherwise.
 * If no key given, returns true if obj has any key; false otherwise.
 * @param obj
 * @param {string|null} key
 * @returns {boolean}
 */
export function has__key(obj, key = symbol__no_key_arg) {
	if (key === symbol__no_key_arg) {
		for (let _ in obj) {
			return true
		}
	} else {
		for (let key__ in obj) {
			if (key.toString() == key__.toString()) return true
		}
	}
	return false
}
/**
 * Returns true if obj has at least 1 key
 * @param obj
 * @returns {boolean}
 */
export function has__some__key(obj) {
	for (let _ in obj) {
		return true
	}
	return false
}
/**
 * Returns obj with keys in `a1__key` having `value__clear`.
 * @param {string[]} a1__key
 * @param value__clear
 * @return {*}
 */
export function _ctx__clear(a1__key, value__clear) {
	const ctx__clear = {}
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		ctx__clear[key] = value__clear
	}
	return ctx__clear
}
/**
 * Returns obj with  zipped a1__value
 * @param {string[]} a1__key
 * @param {*[]} a1__value
 * @returns {*}
 */
export function _ctx__zip(a1__key, a1__value) {
	const ctx__zip = {}
	if (a1__key) {
		for (let i = 0; i < a1__key.length; i++) {
			ctx__zip[a1__key[i]] = a1__value && a1__value[i]
		}
	}
	return ctx__zip
}
/**
 * Sets obj values to false when `== null`.
 * @param {*} obj
 * @param {...string} a1__key
 * @returns {*}
 */
export function set__false__if__null(obj, ...a1__key) {
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		if (obj[key] == null) obj[key] = false
	}
	return obj
}
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
export function map__obj(obj, fn) {
	const obj__ = {}
	for (let key in obj) {
		obj__[key] = fn(obj[key], key)
	}
	return obj__
}
/**
 * Map `values` `andand` `a1__key` in `obj` to `fn`, returning object with values return by `fn`.
 * @param obj
 * @param {...string} a1__key
 * @returns {*}
 */
export function map__obj__andand(obj, ...a1__key) {
	return map__obj(obj, _andand(...a1__key))
}
/**
 * Returns function to map `obj` to `fn` returning object with values.
 * @param {fn__map__obj} fn
 * @returns {function(*)}
 */
export function _map__obj(fn) {
	return obj=>map__obj(obj, fn)
}
export const _fn__map__obj = _map__obj
/**
 * Returns function to
 * map `values` `andand` `a1__key` in `obj` to `fn`, returning object with values return by `fn`.
 * @param {...string} a1__key
 * @returns {function(*)}
 */
export function _map__obj__andand(...a1__key) {
	return obj=>map__obj__andand(obj, ...a1__key)
}
export const _fn__map__obj__andand = _map__obj__andand
/**
 * Returns Array of `[value, key]` in `obj`
 * @param obj
 * @returns {*[]}
 * @returns {Array<Array<key, value>>}
 */
export function _a2__key__value(obj) {
	const a2__value__key = []
	for (let key in obj) {
		a2__value__key.push([obj[key], key])
	}
	return a2__value__key
}
/**
 * Returns Hash of each `value[key]` in `obj`.
 * @param obj
 * @param {string} key
 * @returns {*}
 */
export function _hash__key__obj(obj, key) {
	const by__key__obj = {}
	for (let key__attr in obj) {
		by__key__obj[key__attr] = (obj[key__attr] && obj[key__attr])[key]
	}
	return by__key__obj
}
export type fn__assign = (value:any, obj?:any, key?:string)=>any
/**
 * Assigns function calls into obj
 * @param obj
 * @param a1__h__fn__assign
 */
export function assign__call(obj, ...a1__h__fn__assign:{ [prop_name:string]:fn__assign }[]) {
	for (let i = 0; i < a1__h__fn__assign.length; i++) {
		const h__fn__assign = a1__h__fn__assign[i]
		for (let prop_name in h__fn__assign) {
			const fn__assign = h__fn__assign[prop_name]
			obj[prop_name] = fn__assign(obj[prop_name], obj, prop_name)
		}
	}
	return obj
}
export type tuple__key_a1__fn = [string[], fn__assign]
/**
 * Assigns to obj array of keys the return value of function in a2__key_a1__fn.
 * @param obj
 * @param a2__key_a1__fn[...tuple__key_a1__fn[]]
 */
export function assign__key_a1__fn(obj, ...a2__key_a1__fn:tuple__key_a1__fn[]) {
	for (let i = 0; i < a2__key_a1__fn.length; i++) {
		const [key_a1, fn] = a2__key_a1__fn[i]
		for (let j = 0; j < key_a1.length; j += 1) {
			const key = key_a1[j]
			obj[key] = fn(obj[key], obj, key)
		}
	}
	return obj
}
/**
 * Assigns to cloned obj array of keys the return value of function in a2__key_a1__fn.
 * @param obj
 * @param a2__key_a1__fn[...tuple__key_a1__fn[]]
 */
export function clone__assign__key_a1__fn(obj, ...a2__key_a1__fn:tuple__key_a1__fn[]) {
	return assign__key_a1__fn(clone(obj), ...a2__key_a1__fn)
}

import { _andand } from '@ctx-core/function'
/**
 *	@typedef {Object} ctx
 */
/**
 *	Assigned to the ctx using [assign](#assign)
 *	@typedef {ctx} ctx__assign
 */
/**
 *	Assigns ctx__assign to ctx.
 *	@function assign
 *	@param {module:@ctx-core/object~ctx} ctx
 *	@param {...module:@ctx-core/object~ctx__assign} ctx__assign - Assigned to ctx
 */
export const assign = Object.assign.bind(Object)
/**
 *	Object keys
 *	@function keys
 */
export const keys = Object.keys.bind(Object)
/**
 *	Object values
 *	@function values
 */
export const values = Object.values.bind(Object)
/**
 *	Returns string representation of an object. Alias to `Object.prototype.string`
 *	@type {() => string}
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
 *	Returns boolean of `obj` is an object
 *	@param obj
 *	@returns {*|boolean}
 */
export function _is__Object(obj) {
	return obj && toString.call(obj) === '[object Object]'
}
/**
 *	Alias to [_is__Object](#_is__Object)
 *	@param obj
 *	@returns {*|boolean}
 */
export const isObject = _is__Object
/**
 *	Returns the [ctx](#ctx) with default values. If `ctx[key] == null`, use `default[key]`
 *	@param {module:@ctx-core/object~ctx}
 *	@param {...defaults$ctx} Default values to set on `ctx` if `ctx[key] == null`
 *	@returns {ctx}
 */
export function defaults(ctx, ...a1__defaults) {
	const defaults = clone(...a1__defaults)
	for (let key in ctx) {
		if (ctx[key] == null) ctx[key] = defaults[key]
	}
	return ctx
}
/**
 *	Assign only if ctx is not null
 *	@param {module:@ctx-core/object~ctx} ctx
 *	@returns {module:@ctx-core/object~ctx} ctx
 */
export function assign__unless__null(ctx) {
	return (ctx == null) ? ctx : assign(...arguments)
}
/**
 *	Assigns [ctx__assign](#ctx__assign) to a new [ctx](#ctx).
 *	@param {...@ctx-core/object~ctx__assign} ctx__assign - Assigned to cloned `ctx`
 *	@returns {@ctx-core/object~ctx} ctx
 */
export function clone() {
	return assign({}, ...arguments)
}
export function clone__deep() {
	return JSON.parse(JSON.stringify(clone(...arguments)))
}
/**
 *	Mixin properties from sources into target
 *	@param {Object} target
 *	@param {Object} sources
 *	@returns target
 *	@example
 *	mixin(obj, {
 *		get foo() {
 *			return 'bar'
 *		}
 *	})
 */
export function mixin(target, ...sources) {
	for (let i = 0; i < sources.length; i++) {
		const source = sources[i]
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
 *	Ensures that the keys in `a1__rest` are added to ctx
 *		only if the key is not defined on [ctx](#ctx) (== null).
 *	The order of precedence is from left to right.
 *	@param {ctx}
 *	@param {...a1__rest} a1__rest
 *		Rest of key/value pairs to define if not defined on [ctx](#ctx)
 *	@returns {module:@ctx-core/object~ctx}
 *	@example
 *	ctx = {baz: 99}
 *	ensure(ctx, {foo: 1, baz: 4}, {foo: 2, bar: 3}) // {baz:99, foo: 1, bar: 3}
 */
export function ensure(ctx, ...a1__rest) {
	for (let i = 0; i < a1__rest.length; i++) {
		const rest = a1__rest[i]
		const keys__ctx__rest = keys(rest || {})
		for (let j = 0; j < keys__ctx__rest.length; j++) {
			const key = keys__ctx__rest[j]
			if (ctx[key] == null) {
				ctx[key] = rest[key]
			}
		}
	}
	return ctx
}
/**
 *	New `ctx` with only `a1__key`.
 *	@param {module:@ctx-core/object~ctx} ctx
 *	@param {...string} pick$key - Key to pick from ctx.
 *	@param {module:@ctx-core/object~ctx} ctx
 */
export function pick(ctx, ...a1__key) {
	let memo = {}
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		if (ctx.hasOwnProperty(key)) memo[key] = ctx[key]
	}
	return memo
}
/**
 *
 * @param {ctx} ctx
 * @param obj__keys
 */
export function pick__keys(ctx, obj__keys) {
  return pick(ctx, ...Object.keys(obj__keys))
}
export function _a1__pick(ctx, ...a1__key) {
	let memo = []
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		memo.push(ctx[key])
	}
	return memo
}
export const _arr__pick = _a1__pick
export const _ARR__pick = _arr__pick
export function pick__all(ctx, ...a1__key) {
	let memo = {}
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
		memo[key] = ctx[key]
	}
	return memo
}
/**
 *	Exclude keys from obj
 *	@param obj
 *	@param keys
 *	@returns {{}}
 */
export function exclude(obj, ...keys) {
	const $ = {}
	const exclude = new Set(keys)
	for (let key in obj) {
		if (!exclude.has(key)) {
			$[key] = obj[key]
		}
	}
	return $
}
/**
 *	Compare function used by some to determine if some of the calls to some__compare(value, key) match.
 *	@function some__compare
 *	@param {*} value - The value of the current key/value iteration.
 *	@param {string} key - The key of the current key/value iteration.
 *	@returns {boolean} true if there's a match. false if there's no match.
 */
/**
 *	Returns true when some of the key/value pairs cause the fn to be truthy.
 *	@param {object} obj - The object on which to run the some__compare(value, key)
 *	@param {some__compare} some__compare - The compare function receiving compare(value, key)
 *	@returns {boolean} True when at least one of the calls to some__compare(value, key) are truthy
 *	@example
 *	some({foo: 9, bar: 10}, (value, key) => value === 10) // returns true
 *	some({baz: 11, quux: 12}, (value, key) => value === 10) // returns false
 */
export function some(obj, some__compare) {
	for (let key in obj) {
		if (some__compare(obj[key], key)) return true
	}
	return false
}
/**
 *	`ensure` `ctx[key]` is present or call `ctx__refresh.init`. Then call `ctx__refresh.refresh`.
 *
 *	- if `!ctx[key]` `ctx__refresh.ensure(ctx)`
 *	- `ctx__refresh.refresh(ctx, ctx[key])`
 *	@param {module:@ctx-core/object~ctx} ctx
 *	@param {module:@ctx-core/object~ctx} ctx__refresh
 *	@param {function} ctx__refresh.ensure - Called when `ctx[key]` is falsy.
 *	`ctx[key]` is set to the return value.
 *	@param {function} ctx__refresh.refresh - Called with the ensured value of `ctx[key]`.
 *	@returns {*} The value of the ctx[key]
 */
export function ensure__refresh(ctx, ...a1__ctx__refresh) {
	const ctx__refresh = clone(...a1__ctx__refresh)
	const {
		key,
		ensure,
		refresh
	} = ctx__refresh
	if (!ctx[key]) {
		ctx[key] = ensure(ctx)
	}
	refresh(ctx, ctx[key])
	return ctx[key]
}
/**
 *	return the `value` if not null or `value__or`
 *	@param {module:@ctx-core/object~ctx} ctx
 *	@param {*} ctx.value - if not null; ctx.value$ || ctx.value
 *	@param {*} ctx.value__or - if null; ctx.value__or
 *	@param {*} [ctx.value$] if not null; use optional value$ instead of value
 *	@returns {value|value__or} `value` if not null or `value__or`
 */
export function or__null(ctx) {
	const {
		value,
		value__or,
		value__
	} = ctx
	return value == null ? value__or : (value__ || value)
}
const symbol__no_key = Symbol('no_key')
/**
 *	Returns true if obj has given key; false otherwise.
 *	If no key given, returns true if obj has any key; false otherwise.
 *	@param obj
 *	@param {string|null} key
 *	@returns {boolean}
 */
export function has__key(obj, key = symbol__no_key) {
	if (key === symbol__no_key) {
		for (let key__ in obj) {
			return true
		}
	} else {
		for (let key__ in obj) {
			if (key == key__) return true
		}
	}
	return false
}
/**
 * Returns [ctx](#ctx) with keys in `a1__key` having `value__clear`.
 * @param {Array} a1__key
 * @param value__clear
 * @return {Object}
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
 * Returns [ctx](#ctx) with  zipped a1__value
 * @param {Array} a1__key
 * @param {Array} a1__value
 * @returns {Object}
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
 * Sets [ctx](#ctx) values to false when `== null`.
 * @param {ctx}
 */
export function set__false__if__null(ctx, ...keys) {
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (ctx[key] == null) ctx[key] = false
	}
	return ctx
}
/**
 * Maps values in `obj` to `fn`, returning object with values returned by `fn`.
 * @param obj
 * @param {Function} fn
 * @returns {Object}
 */
export function map__obj(obj, fn) {
	const obj__ = {}
	for (let key in obj) {
		obj__[key] = fn(obj[key], key)
	}
	return obj__
}
export const map__OBJ = map__obj
/**
 * Map `values` `andand` `a1__key` in `obj` to `fn`, returning object with values return by `fn`.
 * @param obj
 * @param {Array} a1__key
 * @returns {Object}
 */
export function map__obj__andand(obj, ...a1__key) {
	return map__obj(obj, _andand(...a1__key))
}
export const map__OBJ__andand = map__obj__andand
/**
 * Returns function to map `obj` to `fn` returning object with values.
 * @param {Function} fn
 * @returns {function({})}
 */
export function _map__obj(fn) {
	return obj => map__obj(obj, fn)
}
export const _map__OBJ = _map__obj
export const _fn__map__obj = _map__obj
export const _fn__map__OBJ = _map__obj
/**
 * Returns function to
 * 	map `values` `andand` `a1__key` in `obj` to `fn`, returning object with values return by `fn`.
 * @param a1__key
 * @returns {function({})}
 */
export function _map__obj__andand(...a1__key) {
	return obj => map__OBJ__andand(obj, ...a1__key)
}
export const _map__OBJ__andand = _map__obj__andand
export const _fn__map__obj__andand = _map__obj__andand
export const _fn__map__OBJ__andand = _map__obj__andand
/**
 * Returns Array of `[value, key]` in `obj`
 * @param obj
 * @returns {Array}
 * @returns {Array<Array<key, value>>}
 */
export function _a2__value__key(obj) {
	const a2__value__key = []
	for (let key in obj) {
		a2__value__key.push([obj[key], key])
	}
	return a2__value__key
}
export const _arr__arr__value__key = _a2__value__key
export const _arr__arr__map__obj = _a2__value__key
export const _ARR__ARR__map__OBJ = _a2__value__key
/**
 * Returns Hash of each `value[key]` in `obj`.
 * @param obj
 * @param {string} key
 * @returns {}
 */
export function _by__key__obj(obj, key) {
	const by__key__obj = {}
	for (let key__attr in obj) {
		by__key__obj[key__attr] = (obj[key__attr] && obj[key__attr])[key]
	}
	return by__key__obj
}
export const _BY__key__OBJ = _by__key__obj
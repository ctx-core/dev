/**
 * @module ctx-core/object/lib
 */
/**
 * @typedef {Object} ctx
 */
/**
 * Assigned to the ctx using {@link module:ctx-core/object/lib~assign}
 * @typedef {module:ctx-core/object/lib~ctx} ctx__assign
 */
/**
 * Assigns ctx__assign to ctx.
 * @function assign
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/object/lib~ctx__assign} ctx__assign - Assigned to ctx
 */
export const assign = Object.assign.bind(Object)
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
 * Returns the `ctx` with default values. If `ctx[key] == null`, use `default[key]`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...defaults$ctx} Default values to set on `ctx` if `ctx[key] == null`
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function defaults(ctx, ...array__ctx__defaults) {
	const ctx__defaults = clone(...array__ctx__defaults)
	for (let key in ctx) {
		if (ctx[key] == null) ctx[key] = ctx__defaults[key]
	}
	return ctx
}
/**
 * Assign only if ctx is not null
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function assign__unless__null(ctx) {
	return (ctx == null) ? ctx : assign(...arguments)
}
/**
 * Assigns `ctx__assign` to a new `ctx`.
 * @param {...module:ctx-core/object/lib~ctx__assign} ctx__assign - Assigned to cloned `ctx`
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function clone() {
	return assign({}, ...arguments)
}
export function clone__deep() {
	return JSON.parse(JSON.stringify(clone(...arguments)))
}
/**
 * Mixin properties from sources into target
 * @param {Object} target
 * @param {Object} sources
 * @returns target
 * @example
 * mixin(obj, {
 *	 get foo() {
 *		 return 'bar'
 *	 }
 * })
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
 * Ensures that the keys in `ctx$rest` are added to ctx only if the key is not defined on `ctx` (== null).
 * The order of precedence is from left to right.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...ctx$rest} ctx$rest - Rest to `ensure` on `ctx`.
 * @returns {module:ctx-core/object/lib~ctx}
 * @example
 * ctx = {baz: 99}
 * ensure(ctx, {foo: 1, baz: 4}, {foo: 2, bar: 3}) // {baz:99, foo: 1, bar: 3}
 */
export function ensure(ctx, ...array__ctx__rest) {
	for (let i = 0; i < array__ctx__rest.length; i++) {
		const ctx__rest = array__ctx__rest[i]
		const keys__ctx__rest = keys(ctx__rest || {})
		for (let j = 0; j < keys__ctx__rest.length; j++) {
			const key = keys__ctx__rest[j]
			if (ctx[key] == null) {
				ctx[key] = ctx__rest[key]
			}
		}
	}
	return ctx
}
/**
 * New `ctx` with only `pick$keys`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...string} pick$key - Key to pick from ctx.
 * @param {module:ctx-core/object/lib~ctx} ctx
 */
export function pick(ctx, ...keys) {
	let memo = {}
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (ctx.hasOwnProperty(key)) memo[key] = ctx[key]
	}
	return memo
}
/**
 * Exclude keys from obj
 * @param obj
 * @param keys
 * @returns {{}}
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
 * Compare function used by some to determine if some of the calls to some__compare(value, key) match.
 * @function some__compare
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
	for (let key in obj) {
		if (some__compare(obj[key], key)) return true
	}
	return false
}
/**
 * `ensure` `ctx[key]` is present or call `ctx__refresh.init`. Then call `ctx__refresh.refresh`.
 *
 * - if `!ctx[key]` `ctx__refresh.ensure(ctx)`
 * - `ctx__refresh.refresh(ctx, ctx[key])`
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {module:ctx-core/object/lib~ctx} ctx__refresh
 * @param {function} ctx__refresh.ensure - Called when `ctx[key]` is falsy.
 * `ctx[key]` is set to the return value.
 * @param {function} ctx__refresh.refresh - Called with the ensured value of `ctx[key]`.
 * @returns {*} The value of the ctx[key]
 */
export function ensure__refresh(ctx, ...array__ctx__refresh) {
	const ctx__refresh = clone(...array__ctx__refresh)
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
 * return the `value` if not null or `value__or`
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {*} ctx.value - if not null; ctx.value$ || ctx.value
 * @param {*} ctx.value__or - if null; ctx.value__or
 * @param {*} [ctx.value$] if not null; use optional value$ instead of value
 * @returns {value|value__or} `value` if not null or `value__or`
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
 * Returns true if obj has given key; false otherwise.
 * If no key given, returns true if obj has any key; false otherwise.
 * @param obj
 * @param {string|null} key
 * @returns {boolean}
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
export function _ctx__clear(scope, value__clear) {
	const __ = {}
	for (let i = 0; i < scope.length; i++) {
		const key = scope[i]
		__[key] = value__clear
	}
	return __
}
export function _ctx__zip(scope, values) {
	const __ = {}
	for (let i = 0; i < scope.length; i++) {
		__[scope[i]] = values[i]
	}
	return __
}
/**
 * Sets agent's scope on ctx to false if null
 * @param {module:ctx-core/agent/lib~agent} agent
 */
export function set__false__if__null(ctx, ...keys) {
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (ctx[key] == null) ctx[key] = false
	}
	return ctx
}
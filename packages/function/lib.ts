export type falsy = false|0|''|null|undefined
/**
 * @typedef {boolean} false
 */
/**
 * @typedef {(undefined|null|void|false|0)} falsy
 */
const { isArray } = Array
export function _val(val) {
	return ()=>val
}
/**
 * Array#`concat`
 * @param {[]} a1
 * @param {...*[]} a1__rest
 * @returns {Array.<*>}
 */
export function concat(a1?, ...a1__rest) {
	return (a1 || []).concat(...a1__rest)
}
/**
 * Returns `value` if array & `[value]` otherwise
 * @param {*|*[]} value
 * @returns {*[]}
 */
export function _a1__wrap(value:any|any[]):any[] {
	return (
		isArray(value)
		? value as any[]
		: [value]
	)
}
/**
 * [wrap](#wrap) `a1` & [concat](#concat) `a1__rest`
 * @param {[]} a1
 * @param {...[]} a1__rest
 * @returns {[]}
 */
export function concat__wrap(a1, ...a1__rest) {
	return concat(_a1__wrap(a1), ...a1__rest)
}
/**
 * Calls the fn with ...a1__arg.
 * @param {function} fn
 * @param {...[]} a1__arg
 * @returns {*}
 */
export function call(fn, ...a1__arg) {
	return fn(...a1__arg)
}
/**
 * Returns function that calls ...a1__arg concat with ...a1__args__ passed to function
 * @param {function} fn
 * @param {...[]} a1__arg
 * @returns {function(...[*]=): *}
 */
export function _call(fn, ...a1__arg) {
	return (...args__)=>fn(...concat(a1__arg, args__))
}
/**
 * Returns function bound to self that calls ...a1__arg concat with ...a1__args__ passed to function
 * @param {function} fn
 * @param self
 * @param {...[]} a1__arg
 * @returns {function(...[*]=): *}
 */
export function _call__bind(fn, self, ...a1__arg) {
	return (...args__)=>fn.call(self, ...concat(a1__arg, args__))
}
/**
 * Returns function that applies a1__arg with ...args__
 * @param {function} fn
 * @param {...[]} a1__arg
 * @returns {function(...[*]=): *}
 */
export function _apply(fn, a1__arg = []) {
	return (...args__)=>fn(...concat(a1__arg, args__))
}
/**
 * Returns function bound to self that applies a1__arg with ...args__
 * @param fn
 * @param self
 * @param args
 * @returns {function(...[*]=): *}
 */
export function _apply__bind(fn, self, args = []) {
	return (...args__)=>fn.apply(self, concat(args, args__))
}
/**
 * Returns a Immediately-invoked function expression
 * @param {function} fn
 * @param {...[]} a1__arg
 * @returns {*}
 */
export function iife(fn, ...a1__arg) {
	return fn(...a1__arg)
}
/**
 * Argument for Array#slice
 * @typedef {[]} arg__slice
 */
/**
 * Returns a function that calls fn passing the arguments sliced by a1__arg__slice.
 * @param {function} fn
 * @param {...[arg__slice]} Array#slice arguments to pass to fn
 * @returns {function(...[*]=): *}
 */
export function slice__a1__arg(fn, ...a1__arg__slice) {
	return (...a1__arg)=>fn(a1__arg.slice.apply(a1__arg, a1__arg__slice))
}
/**
 * Returns a function that calls fn passing only the first argument.
 * @param {function} fn
 * @returns {function(...[*]=): *}
 */
export function arg__0__(fn) {
	return slice__a1__arg(fn, 0, 1)
}
/**
 * Calls setTimeout
 * @param {function} fn
 * @param {number} timeout
 * @returns {Promise<number>}
 */
export function tick(fn, timeout = 0) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			let rv
			try {
				if (fn) rv = fn()
			} catch (e) {
				reject(e)
				return
			}
			resolve(rv)
		}, timeout)
	})
}
/**
 * Composes a1__fn into a single function
 * @param {...[function]} a1__fn
 * @returns {*|(function(...[*]): *)}
 * @see {@link https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83}
 */
export const compose = (...a1__fn)=>
	a1__fn.reduceRight(
		(fn__prev, fn__next)=>
			(...a1__arg)=>fn__next(fn__prev(...a1__arg)),
		value=>value
	)
/**
 * Invokes interceptor with the obj, and then returns object.
 * The primary purpose of this method is to "tap into" a method chain,
 * in order to perform operations on intermediate results within the chain.
 * @param obj
 * @param {function} interceptor
 * @returns {*}
 * @see {@link https://underscorejs.org/#tap}
 */
export function tap(obj, interceptor) {
	interceptor(obj)
	return obj
}
/**
 * Returns function that calls tap with obj.
 * @param obj
 * @returns {function(*=): *}
 */
export function _tap(obj) {
	return interceptor=>tap(obj, interceptor)
}
/**
 * Returns `!value`
 * @param value
 * @returns {boolean}
 */
export function invert(value) {
	return !value
}
/**
 * Calls functions in a1__fn with ...a1__arg
 * @param {[function]} a1__fn
 * @param {...[]} a1__arg
 * @returns {[]}
 */
export function call__a1__fn(a1__fn, ...a1__arg) {
	const returns = []
	for (let i = 0; i < a1__fn.length; i++) {
		returns.push(a1__fn[i](...a1__arg))
	}
	return returns
}
/**
 * Returns function that does nothing
 */
export function noop(..._) {
}
/**
 * Returns array with the index as each item.
 * @param {number} num
 * @param {function} fn
 * @returns {[]}
 */
export function times(num, fn) {
	const a1 = []
	for (let i = 0; i < num; i++) {
		a1.push(fn(i))
	}
	return a1
}
/**
 * Returns a function where the arguments to the wrapped function are sliced with idx__begin & idx__end.
 * @param {function}fn - Wrapped function
 * @param {number}[idx__begin] - Index of beginning of slice.
 * @param {number}[idx__end] - Index of end of slice
 */
export function _arg_a1__slice(fn:(...arg_a1)=>any, idx__begin?:number, idx__end?:number) {
  return (...arg_a1) => fn(...arg_a1.slice(idx__begin, idx__end))
}
export const _a1__arg__slice = _arg_a1__slice
/**
 * Returns a function where the first `count` arguments are sent to the wrapped function.
 * @param {function}fn - Wrapped function
 * @param {number}count - Number of first arguments to send to the wrapped function.
 */
export function _arg_a1__head(fn, count=1) {
  return _arg_a1__slice(fn, 0, count)
}
export const _a1__arg__head = _arg_a1__head
/**
 * @typedef {string|number} arg__andand
 */
/**
 * @typedef {string|number|function} arg__andand_
 */
/**
 * Applies `&&` to a chain of properties from `obj`.
 * @param obj
 * @param {...string} a1__name
 * @returns {*}
 */
export function andand(obj, ...a1__name) {
	let value = obj
	for (let i = 0; i < a1__name.length; i++) {
		const segment = a1__name[i]
		const value__ = (value && value[segment])
		value =
			value__
			|| (typeof segment === 'function' ? segment(value) : value__)
	}
	return value
}
/**
 * Returns a function that calls `andand(obj, ...a1__name)`
 * @param {...string} a1__name
 * @returns {function(*=): *}
 */
export function _andand(...a1__name) {
	return obj=>andand(obj, ...a1__name)
}
export const _fn__andand = _andand
/**
 * Applies `&&` to a chain of property name or function with return value from `obj`.
 * @param obj
 * @param {...arg__andand} a1__name
 * @returns {*}
 */
export function andand_(obj, ...a1__name) {
	let value = obj
	for (let i = 0; i < a1__name.length; i++) {
		if (!value) break
		const segment = a1__name[i]
		let value__ = (value && value[segment])
		value__ = value__ || ((typeof segment === 'function') ? segment(value) : value__)
		value =
			(value__ && typeof value__ === 'function')
			? value__.call(value)
			: value__
	}
	return value
}
export const andand__fn = andand_
/**
 * Returns a function that calls `andand_(obj, ...a1__name)`
 * @param {...arg__andand} a1__name
 * @returns {function(*=): *}
 */
export function _andand_(...a1__name) {
	return obj=>andand_(obj, ...a1__name)
}
export const _fn__andand__fn = _andand_
/**
 * @typedef {function} fn__or
 * @param {*} val
 * @param {*} obj
 * @returns {*}
 */
/**
 * Returns `andand(obj, a1__name) || fn__or(obj, val)`
 * @param obj
 * @param {...arg__andand} a1__name
 * @param {fn__or} fn__or
 * @returns {*}
 */
export function andand__or(obj, a1__name, fn__or) {
	const val = andand(obj, ...a1__name)
	return val || fn__or(val, obj)
}
/**
 * Returns function that calls `andand__or(obj, a1__name, fn__or)`
 * @param {...arg__andand} a1__name
 * @param {fn__or} fn__or
 * @returns {function(*=): *}
 */
export function _andand__or(a1__name, fn__or) {
	return obj=>andand__or(obj, a1__name, fn__or)
}
export const _fn__andand__or = _andand__or
/**
 * Returns not applied to the spread of `__a1__value`
 * @param {nowrap__a1} __a1__value
 * @returns {boolean}
 */
export function not(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value) return false
	}
	return true
}
/**
 * Returns function that calls [not](#not) with [concat__wrap](#concat__wrap)  of the arguments.
 * @param {nowrap__a1} __a1__value__
 * @returns {function(*=): boolean}
 */
export function _not(__a1__value__) {
	return __a1__value=>not(concat__wrap(__a1__value__, __a1__value))
}
/**
 * Returns the boolean of the truthiness all values in `__a1__value`
 * @param {nowrap__a1} __a1__value
 * @returns {boolean}
 */
export function notnot(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (!value) return false
	}
	return true
}
/**
 * Returns function that calls [notnot](#notnot) with [concat__wrap](#concat__wrap) of the arguments.
 * @param {nowrap__a1} __a1__value
 * @returns {function(*=): boolean}
 */
export function _notnot(__a1__value) {
	return value=>notnot(concat__wrap(__a1__value, value))
}
/**
 * Returns `==` operator to all values in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {boolean}
 */
export function eq(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current != value) return false
	}
	return true
}
/**
 * Returns function that returns `==` operator to all values in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {function(*=): boolean}
 */
export function _eq(__a1__value:any|any[]):(value:any|any[])=>boolean {
	return value=>eq(concat__wrap(__a1__value, value))
}
export const _fn__eq = _eq
/**
 * Returns `!=` operator to all values in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {boolean}
 */
export function neq(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current == value) return false
	}
	return true
}
/**
 * Return function that Returns `!=` operator to all values in `__a1__value`.
 * @param {nowrap__a1} __a1__value__
 * @returns {function(*=): boolean}
 */
export function _neq(__a1__value__) {
	return __a1__value=>neq(concat__wrap(__a1__value__, __a1__value))
}
/**
 * Returns `===` operator to all values in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {boolean}
 */
export function eql(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current !== value) return false
	}
	return true
}
/**
 * Returns function that returns `===` operator to all values in `__a1__value`.
 * @param __a1__value
 * @returns {function(*=): boolean}
 */
export function _eql(__a1__value) {
	return value=>eql(concat__wrap(__a1__value, value))
}
/**
 * Returns function that applies `===` operator to `compare` & `value`.
 * @param {*} compare
 * @returns {function(*): boolean}
 */
export function _fn__eql(compare) {
	return value=>value === compare
}
/**
 * Returns `!==` operator to all values in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {boolean}
 */
export function neql(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current === value) return false
	}
	return true
}
/**
 * Returns function that returns `!==` operator to all values in `__a1__value`.
 * @param __a1__value
 * @returns {function(*=): boolean}
 */
export function _neql(__a1__value) {
	return value=>neql(concat__wrap(__a1__value, value))
}
/**
 * Returns the first falsy or last item in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {*}
 */
export function and(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (!value) return value
	}
	return a1__value[a1__value.length - 1]
}
/**
 * Returns function that returns the first falsy or last item in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {function(*=): *}
 */
export function _and(__a1__value) {
	return value=>and(concat__wrap(__a1__value, value))
}
/**
 * Returns the first falsy or last item function call or value in `__a1__value` .
 * @param {nowrap__a1<*|function>} __a1__value
 * @returns {*}
 */
export function and__fn(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (!value) return value
		if (typeof value === 'function') {
			const value__ = value()
			if (!value__) return value__
		}
	}
}
/**
 * Returns function that returns the first falsy or last item function call or value in `__a1__value` .
 * @param {nowrap__a1<*|function>} __a1__value__
 * @returns {function(*=): *}
 */
export function _and__fn(__a1__value__) {
	return __a1__value=>and__fn(concat__wrap(__a1__value__, __a1__value))
}
/**
 * Returns a function than returns the called a1__fn(value) chained with ands
 * @param a1__fn
 */
export function _and__fn__call(a1__fn:{ (any):any }[]) {
	return value=>{
		let value__ = true
		for (let i = 0; i < a1__fn.length; i += 1) {
			value__ = value__ && a1__fn[i](value)
			if (!value__) return value__
		}
		return value__
	}
}
/**
 * Returns first truthy or last item in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {*}
 */
export function or(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value) return value
	}
}
/**
 * Returns function that returns first truthy or last item in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {function(*=): *}
 */
export function _or(__a1__value) {
	return value=>or(concat__wrap(__a1__value, value))
}
/**
 * Returns first truthy or last item call or value in `__a1__value`.
 * @param {nowrap__a1} __a1__value
 * @returns {*}
 */
export function or__fn(__a1__value) {
	const a1__value = _a1__wrap(__a1__value)
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (!value) continue
		const value__ =
			typeof value === 'function'
			? value()
			: value
		if (value__) return value__
	}
}
/**
 * Returns function that returns first truthy or last item call or value in `a1__value`.
 * @param {nowrap__a1} a1__value
 * @returns {*}
 */
export function _or__fn(a1__value) {
	return value=>or__fn(concat__wrap(a1__value, value))
}
export const _fn__or__fn = _or__fn
/**
 * Returns a function than returns first truthy value from a1__fn
 * @param a1__fn
 */
export function _or__fn__call(a1__fn:{ (any):any }[]) {
	return value=>{
		let value__
		for (let i = 0; i < a1__fn.length; i += 1) {
			value__ = a1__fn[i](value)
			if (value__) return value__
		}
		return value__
	}
}
/**
 * Returns `fn__if(conditional)` if `conditional` else `fn__else(conditional)`
 * @param conditional
 * @param {function(*): *} fn__if
 * @param {function(*): *} fn__else
 * @returns {*}
 */
export function ifelse(conditional, fn__if, fn__else) {
	return (
		conditional
		? fn__if(conditional)
		: fn__else(conditional)
	)
}
/**
 * Returns first obj property that is in the obj
 * @param obj
 * @param a1__name
 */
export function or__in(obj, a1__name) {
	for (let i = 0; i < a1__name.length; i++) {
		const name = a1__name[i]
		if (name in obj) return name
	}
}
/**
 * Returns first obj property that is truthy
 * @param obj
 * @param a1__name
 */
export function or__property(obj, a1__name) {
	for (let i = 0; i < a1__name.length; i++) {
		const name = a1__name[i]
		const value = obj[name]
		if (value) return value
	}
}

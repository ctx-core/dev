export function _call(fn, ...args) {
	return (...args__) => fn(...args.concat(args__))
}
export function _call__bind(fn, self, ...args) {
	return (...args__) => fn.call(self, ...args.concat(args__))
}
export function _apply(fn, args = []) {
	return (...args__) => fn(...args.concat(args__))
}
export function _apply__bind(fn, self, args = []) {
	return (...args__) => fn.apply(self, args.concat(args__))
}
export function iife(fn, ...args) {
	return fn(...args)
}
export function tick(fn, timeout=0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let rv
			try {
				if(fn) rv = fn()
			} catch (e) {
				reject(e)
			}
			resolve(rv)
		}, timeout)
	})
}
export const compose =
	(...ARR__fn) =>
		ARR__fn.reduce(
			(f, g) => (...args) => f(g(...args)))
export function clone__fn(fn) {
	return Object.assign(clonedFn, fn)
	function clonedFn() {
		return fn.apply(this, arguments)
	}
}
export function tap(obj, interceptor) {
	interceptor(obj)
	return obj
}
export function _tap(obj) {
	return interceptor => tap(obj, interceptor)
}
export function invert(value) {
	return !value
}
export function a1__fn__call(a1__fn, ...args) {
	const returns = []
	for (let i = 0; i < a1__fn.length; i++) {
		returns.push(a1__fn[i](...args))
	}
	return returns
}
export const ARR__fn__call = a1__fn__call
export const fns__call = ARR__fn__call
export function noop() {
}
export function times(num, fn) {
	const ARR = []
	for (let i = 0; i < num; i++) {
		ARR.push(fn(i))
	}
	return ARR
}
export function andand(obj, ...a1__name) {
	let value = obj
	for (let i = 0; i < a1__name.length; i++) {
		value = value && value[a1__name[i]]
	}
	return value
}
export function _andand(...a1__name) {
	return obj => andand(obj, ...a1__name)
}
export const _fn__andand = _andand
export function andand_(obj, ...a1__name) {
	let value = obj
	for (let i = 0; i < a1__name.length; i++) {
		if (!value) break
		const segment = a1__name[i]
		value = typeof segment === 'function' ? segment(value) : value[segment]
	}
	return value
}
export const andand__fn = andand_
export function _andand_(...a1__name) {
	return obj => andand_(obj, ...a1__name)
}
export const _fn__andand__fn = _andand_
export function andand__or(obj, a1__name, fn__or) {
	return andand(obj, ...a1__name) || fn__or(obj)
}
export function _andand__or(a1__name, fn__or) {
	return obj => andand__or(obj, a1__name, fn__or)
}
export const _fn__andand__or = _andand__or
export function not(...a1__value) {
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value) return false
	}
	return true
}
export function _not(...a1__value__) {
	return (...a1__value) => not(a1__value__.concat(a1__value))
}
export function eq(...a1__value) {
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current != value) return false
	}
	return true
}
export function _eq(...a1__value__) {
	return (...a1__value) => eq(...a1__value__.concat(a1__value))
}
export const _fn__eq = _eq
export function _fn__eql(compare) {
	return value => value === compare
}
export function neq(...a1__value) {
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current == value) return false
	}
	return true
}
export function _neq(...a1__value__) {
	return (...a1__value) => neq(...a1__value__.concat(a1__value))
}
export function eql(...a1__value) {
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current !== value) return false
	}
	return true
}
export function _eql(...a1__value__) {
	return (...a1__value) => eql(...a1__value__.concat(a1__value))
}
export function neql(...a1__value) {
	let value__current = a1__value[0]
	for (let i = 1; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value__current === value) return false
	}
	return true
}
export function _neql(...a1__value__) {
	return (...a1__value) => neql(...a1__value__.concat(a1__value))
}
export function and(...a1__value) {
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (!value) return value
	}
	return a1__value[a1__value.length - 1]
}
export function or(...a1__value) {
	for (let i = 0; i < a1__value.length; i++) {
		const value = a1__value[i]
		if (value) return value
	}
}
export function or__fn(obj, fn) {
	return obj || fn()
}
export function _or__fn(fn__or) {
	return obj => or__fn(obj, fn__or)
}
export const _fn__or__fn = _or__fn
export function or__fn__if__eq(obj, fn__or, VAL__eq = null) {
	return (
		obj == VAL__eq
		? fn__or()
		: obj
	)
}
export function _or__fn__if__eq(fn__or, VAL__eq) {
	return obj => or__fn__if__eq(obj, fn__or, VAL__eq)
}
export const _fn__or__fn__if__eq = _or__fn__if__eq
export function or__fn__if__eql(obj, fn__or, val__eql = null) {
	return (
		obj === val__eql
		? fn__or()
		: obj
	)
}
export function _or__fn__if__eql(fn__or, val__eql) {
	return obj => or__fn__if__eql(obj, fn__or, val__eql)
}
export const _fn__or__fn__if__eql = _or__fn__if__eq
export function ifelse(conditional, fn__if, fn__else) {
	return (
		conditional
		? fn__if(conditional)
		: fn__else(conditional)
	)
}
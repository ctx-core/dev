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
export function ARR__fn__call(ARR__fn, ...args) {
	const returns = []
	for (let i = 0; i < ARR__fn.length; i++) {
		returns.push(ARR__fn[i](...args))
	}
	return returns
}
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
export function andand(obj, ...ARR__name) {
	let value = obj
	for (let i = 0; i < ARR__name.length; i++) {
		value = value && value[ARR__name[i]]
	}
	return value
}
export function _andand(...ARR__name) {
	return obj => andand(obj, ...ARR__name)
}
export const _fn__andand = _andand
export function andand_(obj, ...ARR__name) {
	let value = obj
	for (let i = 0; i < ARR__name.length; i++) {
		if (!value) break
		const segment = ARR__name[i]
		value = typeof segment === 'function' ? segment(value) : value[segment]
	}
	return value
}
export const andand__fn = andand_
export function _andand_(...ARR__name) {
	return obj => andand_(obj, ...ARR__name)
}
export const _fn__andand__fn = _andand_
export function andand__or(obj, ARR__name, fn__or) {
	return andand(obj, ...ARR__name) || fn__or(obj)
}
export function _andand__or(ARR__name, fn__or) {
	return obj => andand__or(obj, ARR__name, fn__or)
}
export const _fn__andand__or = _andand__or
export function not(...ARR__value) {
	for (let i = 0; i < ARR__value.length; i++) {
		const value = ARR__value[i]
		if (value) return false
	}
	return true
}
export function _not(...ARR__value__) {
	return (...ARR__value) => not(ARR__value__.concat(ARR__value))
}
export function eq(...ARR__value) {
	let value__current = ARR__value[0]
	for (let i = 1; i < ARR__value.length; i++) {
		const value = ARR__value[i]
		if (value__current != value) return false
	}
	return true
}
export function _eq(...ARR__value__) {
	return (...ARR__value) => eq(...ARR__value__.concat(ARR__value))
}
export const _fn__eq = _eq
export function _fn__eql(compare) {
	return value => value === compare
}
export function neq(...ARR__value) {
	let value__current = ARR__value[0]
	for (let i = 1; i < ARR__value.length; i++) {
		const value = ARR__value[i]
		if (value__current == value) return false
	}
	return true
}
export function _neq(...ARR__value__) {
	return (...ARR__value) => neq(...ARR__value__.concat(ARR__value))
}
export function eql(...ARR__value) {
	let value__current = ARR__value[0]
	for (let i = 1; i < ARR__value.length; i++) {
		const value = ARR__value[i]
		if (value__current !== value) return false
	}
	return true
}
export function _eql(...ARR__value__) {
	return (...ARR__value) => eql(...ARR__value__.concat(ARR__value))
}
export function neql(...ARR__value) {
	let value__current = ARR__value[0]
	for (let i = 1; i < ARR__value.length; i++) {
		const value = ARR__value[i]
		if (value__current === value) return false
	}
	return true
}
export function _neql(...ARR__value__) {
	return (...ARR__value) => neql(...ARR__value__.concat(ARR__value))
}
export function and(...ARR__value) {
	for (let i = 0; i < ARR__value.length; i++) {
		const value = ARR__value[i]
		if (!value) return value
	}
	return ARR__value[ARR__value.length - 1]
}
export function or(...ARR__value) {
	for (let i = 0; i < ARR__value.length; i++) {
		const value = ARR__value[i]
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
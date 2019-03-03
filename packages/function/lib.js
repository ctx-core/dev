export function iife(fn, ...args) {
	return fn(...args)
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
export function tap(obj) {
	return fn => {
		fn(obj)
		return obj
	}
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
  for (let i=0; i < num; i++) {
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
export function or__fn(obj, fn) {
  return obj || fn()
}
export function _or__fn(fn__or) {
  return obj => or__fn(obj, fn__or)
}
export const _fn__or__fn = _or__fn
export function or__fn__if__eq(obj, fn__or, VAL__eq=null) {
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
export function or__fn__if__eql(obj, fn__or, val__eql=null) {
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
export function _eq(value) {
  return compare => compare == value
}
export const _fn__eq = _eq
export function _fn__eql(compare) {
  return value => value === compare
}
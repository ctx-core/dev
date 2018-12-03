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
export function fns__call(fns, ...args) {
	const returns = []
	for (let i = 0; i < fns.length; i++) {
		returns.push(fns[i](...args))
	}
	return returns
}
export function noop() {
}
export function andand(obj, ...ARR__name) {
	let value = obj
	for (let i = 0; i < ARR__name.length; i++) {
		value = value && value[ARR__name[i]]
	}
	return value
}
export function _fn__andand(...ARR__name) {
	return obj => andand(obj, ...ARR__name)
}
export function andand__fn(obj, ...ARR__name) {
	let value = obj
	for (let i = 0; i < ARR__name.length; i++) {
		if (!value) break
		const segment = ARR__name[i]
		value = typeof segment === 'function' ? segment(value) : value[segment]
	}
	return value
}
export function _fn__andand__fn(...ARR__name) {
	return obj => andand__fn(obj, ...ARR__name)
}
export function andand__or(obj, ARR__name, fn__or) {
	return andand(obj, ...ARR__name) || fn__or(obj)
}
export function _fn__andand__or(ARR__name, fn__or) {
	return obj => andand__or(obj, ARR__name, fn__or)
}
export const _andand__or = _fn__andand__or
export function or__fn(obj, fn__or) {
  return obj || fn__or()
}
export function _fn__or__fn(fn__or) {
  return obj => or__fn(obj, fn__or)
}
export function or__fn__if__eq(obj, fn__or, val__eq=null) {
  return (
  	obj == val__eq
		? fn__or()
		: obj
	)
}
export function _fn__or__fn__if__eq(fn__or, val__eq) {
  return obj => or__fn__if__eq(obj, fn__or, val__eq)
}
export function or__fn__if__eql(obj, fn__or, val__eql=null) {
  return (
  	obj === val__eql
		? fn__or()
		: obj
	)
}
export function _fn__or__fn__if__eql(fn__or, val__eql) {
  return obj => or__fn__if__eql(obj, fn__or, val__eql)
}
export function ifelse(conditional, fn__if, fn__else) {
	return (
		conditional
		? fn__if(conditional)
		: fn__else(conditional)
	)
}
export function _fn__eq(value) {
  return compare => compare == value
}
export function _fn__eql(compare) {
  return value => value === compare
}
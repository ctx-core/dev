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
export function ifelse(conditional, fn__if, fn__else) {
	return (
		conditional
		? fn__if(conditional)
		: fn__else(conditional)
	)
}
export function _fn__eq(compare) {
  return value => value === compare
}
export function _fn__eql(value) {
  return compare => compare == value
}
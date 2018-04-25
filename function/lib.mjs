export const compose =
	(...fns) =>
		fns.reduce(
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
	for (let i=0; i < fns.length; i++) {
		returns.push(fns[i](...args))
	}
	return returns
}
export function noop() {
}
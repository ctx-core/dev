export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
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
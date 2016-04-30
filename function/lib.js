export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
export function cloneFn(fn) {
  return Object.assign(clonedFn, fn);
  function clonedFn() {
    return fn.apply(this, arguments);
  }
}
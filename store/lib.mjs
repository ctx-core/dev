import {Store} from 'svelte/store'
export function _store() {
  const store = new Store()
  if (typeof window === 'object') window.store = store
  return store
}
export function _mixin__store(name, init) {
  return function mixin__store(store) {
    if (store[name]) return store
    store[name] = {
      store,
      name,
      mixin__store
    }
    init(...arguments)
    return store
  }
}
// TODO: Inline once https://github.com/sveltejs/svelte/issues/1327 is resolved
export function compute(store, name, deps, fn) {
  const values__deps = []
  for (let i=0; i < deps.length; i++) {
    values__deps.push(store.get(deps[i]))
  }
  const __set = {}
  __set[name] = fn(...values__deps)
  store.set(__set)
  store.compute(name, deps, fn)
  return store
}
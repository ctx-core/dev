/**
 * @module ctx-core/chain/lib
 */
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/chain/lib.mjs'
export const $ctx = $chain
export function $$ctx(ctx, or) {
  return (...keys) => ($chain(ctx, ...keys) || or)
}
export function $$ctx__or__fn(ctx, fn=() => {}) {
  return $$ctx(ctx, fn)
}
export function $$ctx__or__a(ctx, a=[]) {
  return $$ctx(ctx, a)
}
export function $chain(ctx, ...keys) {
  let head = ctx
  for (let i=0; i < keys.length; i++) {
    let key = keys[i]
    if (typeof key === 'function') {
      head =
        head == null
        ? head
        : key.call(head, head)
      continue
    }
    if (typeof key === 'string') {
      walk__key(key)
    }
    if (Array.isArray(key)) {
      const args = key.slice(1)
      key = key[0]
      const array__key = key.split('.')
          , key__n1 = array__key.slice(0, array__key.length - 1).join('.')
      if (key__n1) walk__key(key__n1)
      key = array__key[array__key.length-1]
      head = head[key] && head[key](...args)
    }
  }
  return head
  function walk__key(key) {
    const array__key = key.split('.')
    for (let i=0; i < array__key.length; i++) {
      head =
        head == null
        ? head
        : head[array__key[i]]
    }
  }
}
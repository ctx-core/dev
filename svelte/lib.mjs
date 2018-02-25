import {pick} from 'ctx-core/object/lib.mjs'
import {$assign__offs as $assign__offs__} from 'ctx-core/observable/lib'
export function $assign__offs__svelte(C, ...array__agents__keys) {
  const assign__offs = $assign__offs__(C)
  for (let i=0; i < array__agents__keys.length; i++) {
    const agents__keys = array__agents__keys[i]
    let agent, keys
    if (Array.isArray(agents__keys)) {
      [agent, ...keys] = agents__keys
    } else {
      agent = agents__keys
    }
    if (!keys || !keys.length) {
      keys = agent.scope
    }
    assign__offs.change(agent, $proxy__change(C, ...keys))
  }
  return assign__offs
}
export function $proxy__change(C, ...keys) {
  const ctx = C.get('ctx')
  return proxy__change
  function proxy__change() {
    C.set(pick(ctx, ...keys))
  }
}
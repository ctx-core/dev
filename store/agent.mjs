import {assign} from 'ctx-core/object/lib'
export function ensure__agent__store(ctx, scope, scope__parent, fn) {
  const {store} = ctx
      , key = scope[0]
  let agent__store = store[key]
  if (agent__store) return agent__store
  const children = scope.slice(1)
  agent__store =
    { key
    , observe
    , on}
  store[key] = agent__store
  observe__store__ctx(store, key, ctx)
  store.compute(key, scope__parent, fn)
  for (let i=0; i < children.length; i++) {
    const child = children[i]
    store.compute(child, [key], __ => __ && __[child])
  }
  return agent__store
  function observe(...args) {
    if (args.length == 1) return store.observe(key, args[0])
    return store.observe(args[0], args[1])
  }
  function on() {
    return store.on(...arguments)
  }
}
export function observe__store__ctx(store, name, ctx) {
  return store.observe(name, ctx__ => {
    assign(ctx, ctx__)
    store.set(ctx__)
  })
}
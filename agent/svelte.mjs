import {clone} from 'ctx-core/object/lib'
import {ensure__agent__agents} from 'ctx-core/ctx/agent'
import {change__agents} from 'ctx-core/agent/lib'
import {Store} from 'svelte/store'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/svelte.mjs'
export function ensure__store(ctx, store) {
  log(`${logPrefix}|ensure__store`)
  if (ctx.store) return ctx
  store = store || new Store(ctx)
  ctx.store = store
  bind__store__agent__agents(ctx, store)
  return ctx
}
export function bind__store__agent__agents(ctx, store) {
  ensure__agent__agents(ctx)
  store.onchange(onchange__store)
  ctx.agent__agents.on('ctx__change', on__ctx__change)
  function onchange__store(state, changed) {
    if (!changed.__from__agent__agents) {
      const ctx__change = {}
      for (let key in changed) {
        ctx__change[key] = state[key]
      }
      info(`${logPrefix}|onchange__store`, ctx__change)
      change__agents(ctx, ctx__change)
    }
  }
  function on__ctx__change(ctx__change) {
    log(`${logPrefix}|on__ctx__change`, ctx__change)
    store.set(clone(ctx__change, {__from__agent__agents: true}))
  }
}
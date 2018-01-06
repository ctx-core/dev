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
  ctx.agent__agents.on('ctx__change', __ctx__change__agent__agents)
  function __ctx__change__agent__agents(ctx__change) {
    log(`${logPrefix}|__ctx__change__agent__agents`, ctx__change)
    store.set(clone(ctx__change, {__from__agent__agents: true}))
  }
}
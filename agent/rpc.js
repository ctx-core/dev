import {assign,clone} from 'ctx-core/object/lib'
import {fetch} from 'ctx-core/fetch/lib'
import {fetch__agent} from 'ctx-core/agent/fetch'
import {contentType__json} from 'ctx-core/http/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/rpc'
export function rpc__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|rpc__agent`)
  return fetch__agent(ctx, {
    reset,
    reset__rpc,
    new__rpc$ctx,
    reset__fetch__set
  }, ...agent$ctx$$)
}
export function *reset__rpc() {
  log(`${logPrefix}|reset__rpc`)
  const agent = this
  let rpc$ctx = agent.new__rpc$ctx({rpc: agent.rpc}, ...arguments)
    , fetch$ctx = {
        body: JSON.stringify(rpc$ctx)
      }
  return yield agent.reset__fetch(fetch$ctx)
}
export const reset = reset__rpc
export function new__rpc$ctx() {
  log(`${logPrefix}|new__rpc$ctx`)
  return assign(...arguments)
}
export function *reset__fetch__set(fetch$ctx) {
  log(`${logPrefix}|reset__fetch__set`)
  const agent = this
  let ctx = agent.ctx
  const response$ctx = yield http$post__rpc(ctx, fetch$ctx)
      , {response} = response$ctx
      , {status} = response || {}
  if (status === 404) {
    return yield agent.reset__clear()
  }
  const response$json = yield response$ctx.response.json()
  return yield agent.reset__set(response$json)
}
// TODO: Extract authentication
export function *http$post__rpc(ctx, fetch$ctx) {
  log(`${logPrefix}|http$post__rpc`)
  return yield fetch(
    ctx,
    {
      method: 'POST',
      path: '/rpc'
    },
    fetch$ctx,
    {headers: clone(
      contentType__json,
      fetch$ctx.headers)})
}
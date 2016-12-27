import {assign,clone} from 'ctx-core/object/lib'
import {fetch} from 'ctx-core/fetch/lib'
import {fetch__agent} from 'ctx-core/agent/fetch'
import {ContentType__json} from 'ctx-core/http/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/rpc'
export function rpc__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|rpc__agent`)
  return fetch__agent(ctx, {
    reset,
    reset__rpc,
    $rpc$ctx,
    reset__fetch__set
  }, ...agent$ctx$$)
}
export function *reset__rpc() {
  log(`${logPrefix}|reset__rpc`)
  const agent = this
  let rpc$ctx = agent.$rpc$ctx({rpc: agent.rpc}, ...arguments)
    , fetch$ctx = {
        body: JSON.stringify(rpc$ctx)
      }
  return yield agent.reset__fetch(fetch$ctx)
}
export const reset = reset__rpc
export function $rpc$ctx() {
  log(`${logPrefix}|$rpc$ctx`)
  return assign(...arguments)
}
export function *reset__fetch__set(fetch$ctx) {
  log(`${logPrefix}|reset__fetch__set`)
  const agent = this
  let ctx = agent.ctx
  const response$ctx = yield koa$post__rpc(ctx, fetch$ctx)
      , {response} = response$ctx
      , {status} = response || {}
  if (status === 404) {
    return yield agent.reset__clear()
  }
  const response$json = yield response$ctx.response.json()
  return yield agent.reset__set(response$json)
}
// TODO: Extract authentication
export function *koa$post__rpc(ctx, fetch$ctx) {
  log(`${logPrefix}|koa$post__rpc`)
  return yield fetch(
    ctx,
    {
      method: 'POST',
      path: '/rpc'
    },
    fetch$ctx,
    {headers: clone(
      ContentType__json,
      fetch$ctx.headers)})
}
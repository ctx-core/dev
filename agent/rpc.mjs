import {assign} from 'ctx-core/object/lib'
import {fetch} from 'ctx-core/fetch/lib'
import {fetch__agent} from 'ctx-core/agent/fetch'
import {$ContentType__json} from 'ctx-core/http/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/rpc'
export function rpc__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|rpc__agent`)
  return fetch__agent(ctx, {
    reset,
    reset__rpc,
    $ctx__rpc,
    reset__fetch__set
  }, ...ctx__agent$$)
}
export async function reset__rpc() {
  log(`${logPrefix}|reset__rpc`)
  const agent = this
  let ctx__rpc = agent.$ctx__rpc({rpc: agent.rpc}, ...arguments)
    , ctx__fetch = {
        body: JSON.stringify(ctx__rpc)
      }
  return agent.reset__fetch(ctx__fetch)
}
export const reset = reset__rpc
export function $ctx__rpc() {
  log(`${logPrefix}|$ctx__rpc`)
  return assign(...arguments)
}
export async function reset__fetch__set(ctx__fetch) {
  log(`${logPrefix}|reset__fetch__set`)
  const agent = this
  let ctx = agent.ctx
  const response = await http$post__rpc(ctx, ctx__fetch)
      , {status} = response || {}
  if (status === 404) {
    return agent.reset__clear()
  }
  const json = await response.json()
  return agent.reset__set(json)
}
// TODO: Extract authentication
export async function http$post__rpc(ctx, ctx__fetch) {
  log(`${logPrefix}|http$post__rpc`)
  return fetch(
    '/rpc',
    assign(
      { method: 'POST'},
      ctx__fetch,
      {
        headers:
          assign(
            $ContentType__json(),
            ctx__fetch.headers
          )
      }))
}
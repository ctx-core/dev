import {assign} from 'ctx-core/object/lib'
import {fetch} from 'ctx-core/fetch/lib'
import {ensure__agent__fetch} from 'ctx-core/agent/fetch'
import {$ContentType__json} from 'ctx-core/http/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/rpc'
export function ensure__agent__rpc(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|ensure__agent__rpc`)
  return ensure__agent__fetch(ctx, {
    reset,
    reset__rpc,
    $ctx__rpc,
    reset__fetch__set
  }, ...array__ctx__agent)
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
      , {ctx} = agent
      , response = await post__http__rpc(ctx, ctx__fetch)
      , {status} = response || {}
  if (status === 404) {
    agent.clear()
    return
  }
  const json = await response.json()
  return agent.set(json)
}
// TODO: Extract authentication
export async function post__http__rpc(ctx, ctx__fetch) {
  log(`${logPrefix}|post__http__rpc`)
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
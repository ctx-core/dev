/**
 * RPC lib - Remote Procedure Call api that wrap behavior to pick public keys & auth.
 * RESTful handlers can also utilize RPC to handle common aspects.
 * For POST /rpc
 * @module ctx-core/rpc/lib
 * @see module:ctx-core/rpc/koa
 */
import {assign,clone,keys,pick} from 'ctx-core/object/lib'
import {concat__array} from 'ctx-core/array/lib'
import {pick__whitelist} from 'ctx-core/security/lib'
import {throw__bad_request,throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/rpc/lib'
let table__name__rpc = {}
/**
 * Assigns the name/rpc pairings to be available to delegate__rpc.
 * @param {...Object} table__name__rpc$$ - The assign Tables of name/rpc.
 * @return {Object} A table of name/rpc.
 */
export function assign__table__name__rpc() {
  log(`${logPrefix}|assign__table__name__rpc`)
  assign(table__name__rpc, ...arguments)
  return table__name__rpc
}
/**
 * Reads ctx.rpc to delegate to many remote procedure calls (rpc) defined by assign__table__name__rpc.
 * @return {Object} A sanitized ctx adhering to the rpc architecture (public keys, security model)
 * @param {Object} ctx - The ctx
 * @param {string[]|Object[]} ctx.rpc - rpc functions to call. Mapped by assign__table__name__rpc
 * @param {...Object} assign__ctx - Assigned onto ctx
 */
export async function delegate__rpc(ctx) {
  log(`${logPrefix}|delegate__rpc`)
  let {rpc} = ctx
  assert__rpc(ctx)
  let rpc$$ = []
  for (let i = 0; i < rpc.length; i++) {
    rpc$$.push(table__name__rpc[rpc[i]](ctx))
  }
  const ctx__rpc$$ = await Promise.all(rpc$$)
  return clone(...ctx__rpc$$)
}
function assert__rpc(ctx) {
  log(`${logPrefix}|assert__rpc`)
  let rpc$$invalid$$ = []
  const {rpc} = ctx
      , rpc$$ = concat__array([], rpc)
  for (let i = 0; i < rpc$$.length; i++) {
    const rpc$ = rpc$$[i]
    if (!table__name__rpc[rpc$]) {
      rpc$$invalid$$.push(rpc$)
    }
  }
  if (rpc$$invalid$$.length) {
    throw__bad_request(ctx, {
      error_message: `Invalid rpc keys: ${JSON.stringify(rpc$$invalid$$)}`
    })
  }
}
/**
 * Runs the host rpc, providing security & whitelisting.
 * @return {module:ctx-core/object/lib~ctx} The ctx to send back to the rpc client.
 * @param {module:ctx-core/object/lib~ctx} ctx - The global ctx
 * @param {...ctx__run} ctx__run - clones to ctx__run
 * @param {string} ctx__run.key - The key that represents the rpc
 * @param {string[]} ctx__run.whitelist - Whitelist keys used to restrict the keys in the return ctx.public_keys
 * @param {Object|string} ctx__run.authentication - Authentication data
 * @param {Object} ctx__run.request - http request
 * @param {Object} ctx__run.session - http session
 * @throws {throw__missing_argument}
 */
export async function run__rpc(ctx, ...$$ctx__run) {
  log(`${logPrefix}|run__rpc`)
  const ctx__clone = clone(...arguments)
      , ctx__run = clone(...$$ctx__run)
      , {key} = ctx__clone
  if (!key) throw__missing_argument(ctx, {key: 'ctx__clone.key', type: 'run__rpc'})
  const whitelist =
          concat__array(
            ['authentication', 'key', 'request', 'session'],
            ctx__run.whitelist)
      , {rpc} = ctx__clone
  let ctx__rpc = pick__whitelist(ctx__clone, 'public_keys', ...whitelist)
  const rpc$ = await rpc(ctx__rpc)
  ctx__rpc = pick__whitelist(rpc$, ...whitelist)
  return ctx__rpc
}
export function ensure__public_keys(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$)
  assign(ctx, ctx$rest)
  let {public_keys} = ctx
  if (!public_keys) {
    public_keys = []
    assign(ctx, {public_keys})
  }
  const keys__ctx$rest = keys(ctx$rest)
  for (let i=0; i < keys__ctx$rest.length; i++) {
    const key = keys__ctx$rest[i]
    if (public_keys.indexOf(key) === -1) public_keys.push(key)
  }
  return ctx
}
/**
 * Picks the designated ctx.public_keys
 * @returns {Object} A ctx object with only the keys in ctx.public_keys
 * @param {...Object} ctx - assigns to ctx
 */
export function pick__public_keys() {
  log(`${logPrefix}|pick__public_keys`)
  const ctx = assign(...arguments)
  return pick(ctx, ...(ctx.public_keys || []))
}

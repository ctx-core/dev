/**
 * RPC lib - Remote Procedure Call api that wrap behavior to pick public keys & auth.
 * RESTful handlers can also utilize RPC to handle common aspects.
 * For POST /rpc
 * @module ctx-core/rpc/lib
 * @see module:ctx-core/rpc/koa
 */
import {assign,clone,keys,pick} from "ctx-core/object/lib";
import {array$concat,array$uniq} from "ctx-core/array/lib";
import {pick__whitelist,assert__whitelist_salt} from "ctx-core/security/lib";
import {throw__error,throw__missing_argument} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/rpc/lib";
let table__name__rpc = {};
/**
 * Assigns the name/rpc pairings to be available to delegate__rpc.
 * @param {...Object} table__name__rpc$$ - The assign Tables of name/rpc.
 * @return {Object} A table of name/rpc.
 */
export function assign__table__name__rpc() {
  log(`${logPrefix}|assign__table__name__rpc`);
  assign(table__name__rpc, ...arguments);
  return table__name__rpc;
}
/**
 * Reads ctx.rpc to delegate to many remote procedure calls (rpc) defined by assign__table__name__rpc.
 * @return {Object} A sanitized ctx adhering to the rpc architecture (public keys, security model)
 * @param {Object} ctx - The ctx
 * @param {string[]|Object[]} ctx.rpc - rpc functions to call. Mapped by assign__table__name__rpc
 * @param {...Object} assign__ctx - Assigned onto ctx
 */
export function *delegate__rpc() {
  log(`${logPrefix}|delegate__rpc`);
  let ctx = clone(...arguments)
    , rpc$$invalid$$ = []
    , ctx$rpc = ctx.rpc;
  array$concat([], ctx$rpc)
    .forEach(
      key => {
        if (!table__name__rpc[key]) {
          rpc$$invalid$$.push(key);
        }
      });
  if (rpc$$invalid$$.length) {
    throw__error(ctx, {
      http$status: 400,
      error_message: `Invalid rpc keys: ${JSON.stringify(rpc$$invalid$$)}`
    });
  }
  const rpc$$ = ctx$rpc.map(
          key =>
            table__name__rpc[key](ctx))
      , rpc$$ctx$$ = yield rpc$$;
  return pick__public_keys(ctx, ...rpc$$ctx$$);
}
/**
 * Runs the host rpc, providing security & whitelisting.
 * @return {module:ctx-core/object/lib~ctx} The ctx to send back to the rpc client.
 * @param {module:ctx-core/object/lib~ctx} ctx - The global ctx
 * @param {...run$ctx} run$ctx - clones to run$ctx
 * @param {string} run$ctx.key - The key that represents the rpc
 * @param {string[]} run$ctx.whitelist - Whitelist keys used to restrict the keys in the return ctx.public_keys
 * @param {Object|string} run$ctx.authentication - Authentication data
 * @param {Object} run$ctx.request - http request
 * @param {Object} run$ctx.session - http session
 * @throws {throw__missing_argument}
 */
export function *run__rpc(ctx, ...run$ctx$$) {
  log(`${logPrefix}|run__rpc`);
  const run$ctx = clone(...run$ctx$$)
      , ctx$clone = clone(...arguments)
      , key = ctx$clone.key;
  if (!key) throw__missing_argument(ctx, {key: "run$ctx.key not defined", type: "run__rpc"});
  const whitelist = array$concat(
          ["authentication", "key", "request", "session"],
          run$ctx.whitelist)
      , rpc = ctx$clone.rpc;
  let rpc$ctx = pick__whitelist(ctx$clone, "public_keys", ...whitelist);
  const rpc$ = yield rpc(rpc$ctx);
  assert__whitelist_salt(rpc$ctx);
  ensure__public_keys(ctx, rpc$);
  return ctx;
}
export function ensure__public_keys(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$);
  assign(ctx, ctx$rest);
  let public_keys = ctx.public_keys;
  if (!public_keys) {
    ctx.public_keys = public_keys = [];
  }
  keys(ctx$rest).forEach(
    key => {
      if (public_keys.indexOf(key) === -1) public_keys.push(key);
    });
  return ctx;
}
/**
 * Picks the designated ctx.public_keys
 * @returns {Object} A ctx object with only the keys in ctx.public_keys
 * @param {...Object} ctx - assigns to ctx
 */
export function pick__public_keys() {
  log(`${logPrefix}|pick__public_keys`);
  const ctx = assign(...arguments);
  return pick(ctx, ...(ctx.public_keys || []));
}
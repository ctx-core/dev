/**
 * RPC lib - Remote Procedure Call api that wrap behavior to pick public keys & auth.
 * RESTful handlers can also utilize RPC to handle common aspects.
 * For POST /rpc
 * @see ctx-core/rpc/koa
 */
import {assign,clone,assign__public_keys,keys} from "ctx-core/object/lib";
import {array$concat,array$uniq} from "ctx-core/array/lib";
import {pick__rpc$whitelist,assert__rpc$whitelist_salt} from "ctx-core/security/lib";
import {throw__error,throw__missing_argument} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/rpc/lib";
let table__name__rpc = {};
/**
 * Assigns the name/rpc pairings to be available to delegate__rpc.
 * @return {Object} A table of name/rpc.
 * @param {...Object} table__name__rpc$$ - The assign Tables of name/rpc.
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
 * @param {(string[]||Object[])} ctx.rpc - rpc functions to call. Mapped by assign__table__name__rpc
 * @param {...Object} assign__ctx$$ - Assigned onto ctx
 */
export function *delegate__rpc() {
  log(`${logPrefix}|delegate__rpc`);
  let ctx = assign(...arguments)
    , rpc$$invalid$$ = []
    , ctx$rpc = ctx.rpc;
  array$concat([], ctx$rpc)
    .forEach(
      rpc$key => {
        if (!table__name__rpc[rpc$key]) {
          rpc$$invalid$$.push(rpc$key);
        }
      });
  if (rpc$$invalid$$.length) {
    throw__error(ctx, {
      http$status: 400,
      error_message: `Invalid rpc keys: ${JSON.stringify(rpc$$invalid$$)}`
    });
  }
  const rpc$$ = ctx$rpc.map(
          rpc$key =>
            table__name__rpc[rpc$key](ctx))
      , rpc$$ctx$$ = yield rpc$$;
  return pick__public_keys(ctx, ...rpc$$ctx$$);
}
/**
 * Runs the host rpc, providing security & whitelisting.
 * @return {Object} The ctx to send back to the rpc client.
 * @param {Object} ctx - The global ctx
 * @param {...Object} ctx$clone$$ - clones to ctx$clone
 * @param {string} ctx$clone.rpc$key - The rpc$key that represents the rpc
 * @param {string[]} ctx$clone.rpc$whitelist - Whitelist keys used to restrict the keys in the return ctx.public_keys
 * @param {Object|string} ctx$clone.authentication - Authentication data
 * @param {Object} ctx$clone.request - http request
 * @param {Object} ctx$clone.session - http session
 * @throws {throw__missing_argument}
 */
export function *run__rpc(ctx) {
  log(`${logPrefix}|run__rpc`);
  const ctx$clone = clone(...arguments)
      , rpc$key = ctx$clone.rpc$key;
  if (!rpc$key) throw__missing_argument(ctx$clone, {key: "ctx$clone.rpc$key not defined"});
  const rpc$whitelist = array$concat(
          ["authentication", "rpc$key", "request", "session"],
          ctx$clone.rpc$whitelist)
      , rpc = ctx$clone.rpc;
  let rpc$ctx = pick__rpc$whitelist(ctx$clone, "public_keys", ...rpc$whitelist);
  const rpc$ = yield rpc(rpc$ctx);
  assert__rpc$whitelist_salt(rpc$ctx);
  assign__public_keys(ctx, rpc$);
  return ctx;
}
/**
 * Picks the designated ctx.public_keys
 * @returns {Object} A ctx object with only the keys in ctx.public_keys
 * @param {...Object} ctx$$ - assigns to ctx
 */
export function pick__public_keys(...ctx$$) {
  log(`${logPrefix}|pick__public_keys`);
  const public_keys = array$uniq(
    ["public_keys"],
    ...ctx$$.map(rpc => rpc.public_keys));
  let ctx = clone(...ctx$$)
    , public$ctx = {};
  keys(ctx).forEach(key => {
    if (public_keys.indexOf(key) > -1) {
      public$ctx[key] = ctx[key];
    }
  });
  return public$ctx;
}
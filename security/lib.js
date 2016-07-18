import {assign,pick} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import env from "ctx-core/env";
const rpc$whitelist_salt = env.rpc$whitelist_salt
    , logPrefix = "ctx-core/security/lib";
export function pick__rpc$whitelist(ctx, ...keys) {
  log(`${logPrefix}|pick__rpc$whitelist`);
  let ctx$clone = pick(ctx, ...keys);
  return assign(ctx$clone, {rpc$whitelist_salt: rpc$whitelist_salt});
}
export function assert__rpc$whitelist_salt() {
  log(`${logPrefix}|assert__rpc$whitelistSalt`);
  const ctx = assign(...arguments);
  if (ctx.rpc$whitelist_salt !== rpc$whitelist_salt) {
    error(`${logPrefix}|assert__rpc$whitelistSalt|error`);
    throw__error(ctx, {
      error_message: "Unauthorized",
      http$status: 403
    });
  }
  return ctx;
}
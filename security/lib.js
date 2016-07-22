import {assign,pick} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import env from "ctx-core/env";
const whitelist_salt = env.whitelist_salt
    , logPrefix = "ctx-core/security/lib";
export function pick__whitelist(ctx, ...keys) {
  log(`${logPrefix}|pick__whitelist`);
  let ctx$clone = pick(ctx, ...keys);
  return assign(ctx$clone, {whitelist_salt: whitelist_salt});
}
export function assert__whitelist_salt() {
  log(`${logPrefix}|assert__whitelistSalt`);
  const ctx = assign(...arguments);
  if (ctx.whitelist_salt !== whitelist_salt) {
    error(`${logPrefix}|assert__whitelistSalt|error`);
    throw__error(ctx, {
      error_message: "Unauthorized",
      http$status: 403
    });
  }
  return ctx;
}
import {assign,pick} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import env from "ctx-core/env";
const cmd$whitelistSalt = env.cmd$whitelistSalt
    , logPrefix = "ctx-core/security/lib";
export function pick__cmd$whitelist(ctx, ...keys) {
  log(`${logPrefix}|pick__cmd$whitelist`);
  let ctx$clone = pick(ctx, ...keys);
  return assign(ctx$clone, {cmd$whitelistSalt: cmd$whitelistSalt});
}
export function assert__cmd$whitelistSalt() {
  log(`${logPrefix}|assert__cmd$whitelistSalt`);
  const ctx = assign(...arguments);
  if (ctx.cmd$whitelistSalt !== cmd$whitelistSalt) {
    error(`${logPrefix}|assert__cmd$whitelistSalt|error`);
    throw__error(ctx, {
      error$message: "Unauthorized",
      http$status: 403
    });
  }
  return ctx;
}
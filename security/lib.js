import {assign,pick} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import env from "ctx-core/env";
const cmd$api$whitelist$salt = env.cmd$api$whitelist$salt
    , logPrefix = "ctx-core/security/lib";
export function pick__cmd$api$whitelist(ctx, ...keys) {
  log(`${logPrefix}|pick__cmd$api$whitelist`);
  let ctx$clone = pick(ctx, ...keys);
  return assign(ctx$clone, {cmd$api$whitelist$salt: cmd$api$whitelist$salt});
}
export function assert__cmd$api$whitelist$salt() {
  log(`${logPrefix}|assert__cmd$api$whitelist$salt`);
  const ctx = assign(...arguments);
  if (ctx.cmd$api$whitelist$salt !== cmd$api$whitelist$salt) {
    error(`${logPrefix}|assert__cmd$api$whitelist$salt|error`);
    error$throw(ctx, {
      error$message: "Unauthorized",
      http$status: 403
    });
  }
  return ctx;
}
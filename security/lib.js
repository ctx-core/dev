import {assign,pick} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib";
import env from "ctx-core/env";
const process$security$key = env.process$security$key
    , logPrefix = "ctx-core/security/lib";
export function security$pick(ctx, ...keys) {
  log(`${logPrefix}|security$pick`);
  let ctx$clone = pick(ctx, ...keys);
  return assign(ctx$clone, {process$security$key: process$security$key});
}
export function assert$security() {
  log(`${logPrefix}|assert$security`);
  const ctx = assign(...arguments);
  if (ctx.process$security$key !== process$security$key) {
    error$throw(ctx, {
      error$message: "process$security$key error",
      http$status: 403
    });
  }
  return ctx;
}
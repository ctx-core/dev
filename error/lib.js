import {assign} from "ctx-core/object/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/error/lib";
export function throw__error(ctx, error$, ...error$rest$$) {
  log(`${logPrefix}|throw__error`);
  assign__error(ctx, error$, ...error$rest$$);
  const error$ctx = ctx.error$ctx
      , error$message = error$ctx.error$message
      , error$message$ = error$message ||
          error$ && error$.toString() ||
          "throw__error: Unknown Error";
  error(`${logPrefix}|throw__error`, error$message$);
  throw error$ctx;
}
export function throw__error$unauthorized() {
  log(`${logPrefix}|throw__error$unauthorized`);
  const ctx = assign(...arguments);
  throw__error(ctx, {
    error$message: "Unauthorized",
    http$status: 401,
    http$error$message: "Unauthorized"});
}
export function throw__error$argumentMissing() {
  log(`${logPrefix}|throw__error$throw__error$argumentMissing`);
  const ctx = assign(...arguments);
  throw__error(ctx, {
    error$message: `Argument Missing: ${ctx.argument}`,
    http$status: 500,
    http$error$message: "Error"});
}
export function assign__error(ctx, error$, ...error$rest$$) {
  log(`${logPrefix}|assign__error`);
  let error$ctx = (ctx && ctx.error$ctx) || {};
  assign(error$ctx, error$, ...error$rest$$);
  const error$string = error$ && error$.toString()
      , error$message =
          ((error$string !== "[object Object]") && error$string) ||
          (ctx && ctx.error$message) ||
          (error$ctx && error$ctx.error$message);
  assign(error$ctx, {error$message: error$message});
  assign(ctx, {error$ctx: error$ctx});
  return ctx;
}
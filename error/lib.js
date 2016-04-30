import {assign,clone} from "ctx-core/object/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/error/lib";
export function error$throw(ctx, error$, ...error$rest$$) {
  log(`${logPrefix}|error$throw`);
  assign__error(ctx, error$, ...error$rest$$);
  const error$ctx = ctx.error$ctx
      , error$message = error$ctx.error$message
      , error$message$ = error$message ||
          error$ && error$.toString() ||
          "error$throw: Unknown Error";
  error(`${logPrefix}|error$throw`, error$message$);
  throw error$ctx;
}
export function assign__error(ctx, error$, ...error$rest$$) {
  log(`${logPrefix}|assign__error`);
  let error$ctx = (ctx && ctx.error$ctx) || {};
  assign(error$ctx, error$, ...error$rest$$);
  const error$toString = error$.toString()
      , error$message =
          ((error$toString !== "[object Object]") && error$toString) ||
          ctx.error$message ||
          error$ctx && error$ctx.error$message;
  assign(error$ctx, {error$message: error$message});
  assign(ctx, {error$ctx: error$ctx});
  return ctx;
}
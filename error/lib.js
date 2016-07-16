import {assign,clone} from "ctx-core/object/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/error/lib";
/**
 * Throws an error to be handled by ctx-core/error/koa app$use__error
 * @throws Decorate & throw error given by the arguments.
 * @param {Object} ctx - The ctx
 * @param {Object} ctx.error$ctx - The error$ctx to be assigned to & thrown
 * @param {Object|string} error$ctx$param - Assigned or coerced into ctx.error$ctx
 * @param {string} error$ctx$param.error_message - The error message
 * @param {...Object} error$rest$$ - Assigned intoto ctx.error$ctx
 */
export function throw__error(ctx, error$ctx$param, ...error$rest$$) {
  log(`${logPrefix}|throw__error`);
  assign__error$ctx(ctx, error$ctx$param, ...error$rest$$);
  const error$ctx = ctx.error$ctx
      , error_message = error$ctx.error_message ||
          error$ctx && error$ctx.toString() ||
          "throw__error: Unknown Error";
  error(`${logPrefix}|throw__error`, error_message);
  throw error$ctx;
}
/**
 * Throws a HTTP 401 unauthorized error
 * @throws throw unauthorized error
 */
export function throw__unauthorized() {
  log(`${logPrefix}|throw__unauthorized`);
  const ctx$clone = clone(...arguments);
  throw__error(ctx$clone, {
    error_message: "Unauthorized",
    http$status: 401,
    http$error_message: "Unauthorized"});
}
/**
 * Throws a HTTP 500 missing_argument error
 * @throws throw missing_argument error
 */
export function throw__missing_argument() {
  log(`${logPrefix}|throw__error$throw__missing_argument`);
  const ctx$clone = clone(...arguments);
  throw__error({
    error_message: `${ctx$clone.key} is not defined`,
    http$status: 500,
    http$error_message: "Error"}, ctx$clone);
}
/**
 * Assigns & coerces to ctx.error$ctx
 * @return {Object} The ctx with ctx.error$ctx
 * @param {Object} ctx - The ctx to be assigned to
 * @param {Object|string} error$ctx$param - Assigned or coerced into ctx.error$ctx
 * @param {Object|string} error$ctx$param - Assigned or coerced into ctx.error$ctx
 */
export function assign__error$ctx(ctx, error$ctx$param, ...error$rest$$) {
  log(`${logPrefix}|assign__error$ctx`);
  let error$ctx = (ctx && ctx.error$ctx) || {};
  assign(error$ctx, error$ctx$param, ...error$rest$$);
  const error$string = error$ctx$param && error$ctx$param.toString()
      , error_message =
          ((error$string !== "[object Object]") && error$string) ||
          (ctx && ctx.error_message) ||
          (error$ctx && error$ctx.error_message);
  assign(error$ctx, {error_message: error_message});
  assign(ctx, {error$ctx: error$ctx});
  return ctx;
}
/**
 * Error functions
 * @module ctx-core/error/lib
 */
import {assign,clone} from "ctx-core/object/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/error/lib";
/**
 * Throws an error to be handled by ctx-core/error/koa app$use__error
 * @param {module:ctx-core/object/lib~ctx} ctx - The ctx
 * @param {Object} ctx.error$ctx - The error$ctx to be assigned to & thrown
 * @param {Object|string} error$ctx$param - Assigned or coerced into ctx.error$ctx
 * @param {string} error$ctx$param.error_message - The error message
 * @param {...error$ctx} error$ctx - Assigned into ctx.error$ctx
 * @throws Decorate & throw error given by the arguments.
 */
export function throw__error(ctx, error$ctx$param, ...error$rest$$) {
  log(`${logPrefix}|throw__error`);
  assign__error$ctx(ctx, error$ctx$param, ...error$rest$$);
  const error$ctx = ctx.error$ctx;
  console__error(error$ctx);
  throw error$ctx;
}
export function console__error(error$ctx) {
  log(`${logPrefix}|console__error`);
  const error_message = error$ctx.error_message ||
          error$ctx && error$ctx.toString() ||
          "throw__error: Unknown Error";
  error(`${logPrefix}|throw__error`, error_message);
}
/**
 * Assigns & coerces to ctx.error$ctx
 * @return {module:ctx-core/object/lib~ctx} The ctx with ctx.error$ctx
 * @param {module:ctx-core/object/lib~ctx} ctx - The ctx to be assigned to
 * @param {error$ctx|string} error$ctx__or__string;q - Assigned or coerced into ctx.error$ctx
 * @param {...error$ctx} error$ctx - Assigned or coerced into ctx.error$ctx
 */
export function assign__error$ctx(ctx, error$ctx__or__string, ...error$ctx$$) {
  log(`${logPrefix}|assign__error$ctx`);
  let error$ctx = (ctx && ctx.error$ctx)
        || ((typeof error$ctx__or__string === "object") && error$ctx__or__string)
        || {};
  assign(error$ctx, error$ctx__or__string, ...error$ctx$$);
  const error$string = error$ctx__or__string && error$ctx__or__string.toString()
      , error_message =
          ((error$string !== "[object Object]") && error$string) ||
          (ctx && ctx.error_message) ||
          (error$ctx && error$ctx.error_message);
  assign(error$ctx, {error_message: error_message});
  assign(ctx, {error$ctx: error$ctx});
  return ctx;
}
/**
 * Unauthorized error with ctx.http$status 401.
 * @typedef unauthorized
 * @see {@link throw__error}
 * @example
 * throw__unauthorized(ctx); // Unauthorized
 */
/**
 * Throws a HTTP 401 unauthorized error
 * @param {...ctx$clone} ctx$clone
 * @throws throw unauthorized error
 */
export function throw__unauthorized(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__unauthorized`);
  throw__error(ctx, {
    error_message: "Unauthorized",
    http$status: 401,
    http$error_message: "Unauthorized"},
    ...error$ctx$$);
}
/**
 * Missing Argument error.
 * @typedef missing_argument
 * @see {@link throw__error}
 * @example
 * throw__missing_argument(ctx, {key: "ctx.foobar"}); // ctx.foobar is not defined
 */
/**
 * Throws a HTTP 500 missing_argument error
 * @param {...ctx$clone} ctx$clone
 * @throws {missing_argument} throw missing_argument error
 */
export function throw__missing_argument(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__error$throw__missing_argument`);
  const error$ctx = clone(...error$ctx$$);
  throw__error(ctx, {
    error_message: `${error$ctx.key} is not defined`,
    http$status: 500,
    http$error_message: "Error"},
    error$ctx);
}
export function throw__bad_credentials(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__bad_credentials`);
  throw__error(ctx, {
    http$status: 401,
    http$error_message: "Bad Gateway"},
    ...error$ctx$$);
}
/**
 * Bad Gateway http error with ctx.http$status 502.
 * @typedef bad_gateway
 * @see {@link throw__error}
 * @example
 * throw__bad_gateway(ctx); // Bad Gateway
 */
/**
 * Throws a HTTP 502 bad_gateway error
 * @param {...ctx$clone} ctx$clone
 * @throws throw bad_gateway error
 */
export function throw__bad_gateway(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__bad_gateway`);
  throw__error(ctx, {
    http$status: 502,
    http$error_message: "Bad Gateway"},
    ...error$ctx$$);
}
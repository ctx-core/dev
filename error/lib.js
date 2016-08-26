/**
 * Error functions
 * @module ctx-core/error/lib
 */
import {assign,clone,defaults} from 'ctx-core/object/lib'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/error/lib'
/**
 * ctx used to throw & catch errors
 * @typedef {module:ctx-core/object/lib~ctx} error$ctx
 * @property {string} error_message - Message to print to the console.error
 * @property {string} type='ctx-core/error/lib~error$ctx'
 */
/**
 * Throws an error to be handled by ctx-core/error/koa app$use__error
 * @param {module:ctx-core/object/lib~ctx} ctx - The ctx
 * @param {Object} ctx.error$ctx - The error$ctx to be assigned to & thrown
 * @param {Object|string} error$ctx$param - Assigned or coerced into ctx.error$ctx
 * @param {string} error$ctx$param.error_message - The error message
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx - Assigned into ctx.error$ctx
 * @throws Decorate & throw error given by the arguments.
 */
export function throw__error(ctx, error$ctx$param, ...error$rest$$) {
  log(`${logPrefix}|throw__error`)
  assign__error$ctx(ctx, error$ctx$param, ...error$rest$$)
  const {error$ctx} = ctx
  console__error(error$ctx)
  throw error$ctx
}
export function console__error(error$ctx) {
  log(`${logPrefix}|console__error`)
  const error_message$ =
          error$ctx.error_message
          || error$ctx && error$ctx.toString()
          || 'throw__error: Unknown Error'
      , stack = error$ctx && error$ctx.stack
      , error_message = `\n${stack}` || error_message$
  error(
    `${logPrefix}|throw__error`,
    error_message,
    {error$ctx},
    JSON.stringify({error$ctx}))
}
/**
 * Assigns & coerces to ctx.error$ctx
 * @return {module:ctx-core/object/lib~ctx} The ctx with ctx.error$ctx
 * @param {module:ctx-core/object/lib~ctx} ctx - The ctx to be assigned to
 * @param {error$ctx|string} error$ctx__or__stringq - Assigned or coerced into ctx.error$ctx
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx - Assigned or coerced into ctx.error$ctx
 */
export function assign__error$ctx(ctx, error$ctx__or__string, ...error$ctx$$) {
  log(`${logPrefix}|assign__error$ctx`)
  let error$ctx = new__error$ctx(
        (ctx && ctx.error$ctx)
        || ((typeof error$ctx__or__string === 'object') && error$ctx__or__string)
        || {})
  assign(error$ctx, error$ctx__or__string, ...error$ctx$$)
  const error$string = error$ctx__or__string && error$ctx__or__string.toString()
      , error_message =
          ((error$string !== '[object Object]') && error$string) ||
          (ctx && ctx.error_message) ||
          (error$ctx && error$ctx.error_message)
  assign(error$ctx, {error_message})
  assign(ctx, {error$ctx})
  return ctx
}
function new__error$ctx(error$ctx) {
  log(`${logPrefix}|new__error$ctx`)
  defaults(error$ctx, {
    type: 'ctx-core/error/lib~error$ctx',
    error_message: ''
  })
  return error$ctx
}
/**
 * Bad Request error with ctx.http$status 400.
 * @typedef bad_request
 * @see {@link throw__error}
 * @example
 * throw__bad_request(ctx) // Bad Request
 */
/**
 * Throws an bad_request error (HTTP 400)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {bad_request}
 */
export function throw__bad_request(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__bad_request`)
  throw__error(ctx, {
    type: 'bad_request',
    error_message: 'Bad Request',
    http$status: 400,
    http$error_message: 'Bad Request'},
    ...error$ctx$$)
}
/**
 * Bad Request error with ctx.http$status 400.
 * @typedef bad request
 * @see {@link throw__error}
 * @example
 * throw__bad_request(ctx); // Bad Request
 */
/**
 * throws a `bad_request` error (http 400)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {bad request}
 */
export function throw__bad_request(ctx, ...error$ctx$$) {
  log(`${logprefix}|throw__bad_request`);
  throw__error(ctx, {
    type: "bad request",
    error_message: "Bad Request",
    http$status: 400,
    http$error_message: "Bad Request"},
    ...error$ctx$$);
}
/**
 * Unauthorized error with ctx.http$status 401.
 * @typedef unauthorized
 * @see {@link throw__error}
 * @example
 * throw__unauthorized(ctx) // Unauthorized
 */
/**
 * Throws an unauthorized error (HTTP 401)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {unauthorized}
 */
export function throw__unauthorized(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__unauthorized`)
  throw__error(ctx, {
    type: 'unauthorized',
    error_message: 'Unauthorized',
    http$status: 401,
    http$error_message: 'Unauthorized'},
    ...error$ctx$$)
}
/**
 * Bad Credentials Auth Error
 * @typedef bad_credentials
 * @see {@link throw__error}
 * @example
 * throw__bad_credentials(ctx) // Unauthorized
 */
/**
 * Throws a Bad Credentials error (HTTP 401)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {bad_credentials}
 */
export function throw__bad_credentials(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__bad_credentials`)
  throw__error(ctx, {
    type: 'bad_credentials',
    http$status: 401,
    http$error_message: 'Unauthorized'},
    ...error$ctx$$)
}
/**
 * Not Found Error
 * @typedef bad_credentials
 * @see {@link throw__error}
 * @example
 * throw__bad_credentials(ctx) // Unauthorized
 */
/**
 * Throws a Not Found error (HTTP 401)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {bad_credentials}
 */
export function throw__not_found(ctx, ...error$ctx$$) {
  log(`${logPrefix}|not_found`)
  throw__error(ctx, {
    type: 'not_found',
    http$status: 404,
    http$error_message: 'Not Found'},
    ...error$ctx$$)
}
/**
 * Missing Argument error.
 * @typedef missing_argument
 * @see {@link throw__error}
 * @example
 * throw__missing_argument(ctx, {key: 'ctx.foobar', type: 'baz__agent'}) // ctx.foobar is not defined - baz__agent
 */
/**
 * Throws a missing_argument error (HTTP 500)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {missing_argument} throw missing_argument error
 */
export function throw__missing_argument(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__missing_argument`)
  const error$ctx = clone(...error$ctx$$)
  throw__error(ctx, {
    type: 'missing_argument',
    error_message: `${error$ctx.key} is not defined - ${error$ctx.type || 'Unknown Type'}`,
    http$status: 500,
    http$error_message: 'Error'},
    error$ctx)
}
/**
 * Invalid Argument error.
 * @typedef invalid_argument
 * @see {@link throw__error}
 * @example
 * throw__invalid_argument(ctx, {key: 'ctx.foobar'}) // ctx.foobar is invalid
 */
/**
 * Throws a invalid_argument error (HTTP 500)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {invalid_argument}
 */
export function throw__invalid_argument(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__invalid_argument`)
  const error$ctx = clone(...error$ctx$$)
  throw__error(ctx, {
    type: 'invalid_argument',
    error_message: `${error$ctx.key} is invalid`,
    http$status: 500,
    http$error_message: 'Error'},
    error$ctx)
}
/**
 * Invalid State error.
 * @typedef invalid_state
 * @see {@link throw__error}
 * @example
 * throw__invalid_state(ctx, {key: 'ctx.foobar'}) // ctx.foobar is in an invalid state
 */
/**
 * Throws a invalid_state error (HTTP 500)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @param {...module:ctx-core/error/lib~error$ctx.reason} error$ctx.reason - The reason for the invalid state.
 * @throws {invalid_state}
 */
export function throw__invalid_state(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__invalid_state`)
  const error$ctx = clone(...error$ctx$$)
      , reason =
          error$ctx.reason
          || 'No reason given.'
  throw__error(ctx, {
    type: 'invalid_state',
    error_message: `${error$ctx.key} is in an invalid state. ${reason}`,
    http$status: 500,
    http$error_message: 'Error'},
    error$ctx)
}
/**
 * Bad Gateway http error with ctx.http$status 502.
 * @typedef bad_gateway
 * @see {@link throw__error}
 * @example
 * throw__bad_gateway(ctx) // Bad Gateway
 */
/**
 * Throws a bad_gateway error (HTTP 502)
 * @param {...module:ctx-core/error/lib~error$ctx} error$ctx
 * @throws {bad_gateway}
 */
export function throw__bad_gateway(ctx, ...error$ctx$$) {
  log(`${logPrefix}|throw__bad_gateway`)
  throw__error(ctx, {
    type: 'bad_gateway',
    http$status: 502,
    http$error_message: 'Bad Gateway'},
    ...error$ctx$$)
}

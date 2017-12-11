/**
 * Error functions
 * @module ctx-core/error/lib
 */
import {assign,clone,defaults} from 'ctx-core/object/lib'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/error/lib'
/**
 * ctx used to throw & catch errors
 * @typedef {module:ctx-core/object/lib~ctx} ctx__error
 * @property {string} error_message - Message to print to the console.error
 * @property {string} type='ctx-core/error/lib~ctx__error'
 */
/**
 * Throws an error to be handled by ctx-core/error/koa use__error
 * @param {module:ctx-core/object/lib~ctx} ctx - The ctx
 * @param {Object} ctx.ctx__error - The ctx__error to be assigned to & thrown
 * @param {Object|string} ctx__error - Assigned or coerced into ctx.ctx__error
 * @param {string} ctx__error.error_message - The error message
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error - Assigned into ctx.ctx__error
 * @throws Decorate & throw error given by the arguments.
 */
export function throw__error(ctx, param__ctx__error, ...array__rest) {
  log(`${logPrefix}|throw__error`)
  log__error(ctx, param__ctx__error, ...array__rest)
  throw ctx.ctx__error
}
export function log__error(ctx, param__ctx__error, ...array__rest) {
  log(`${logPrefix}|log__error`)
  assign__ctx__error(ctx, param__ctx__error, ...array__rest)
  const {ctx__error} = ctx
  console__error(ctx__error)
  return ctx
}
export function console__error(ctx__error) {
  log(`${logPrefix}|console__error`)
  const error_message__ =
          ctx__error.error_message
          || ctx__error && ctx__error.toString()
          || 'throw__error: Unknown Error'
      , stack =
          ctx__error
          && ctx__error.stack
      , error_message =
          `\n${stack}\n${error_message__}`
  error(
    `${logPrefix}|throw__error`,
    error_message,
    {ctx__error},
    JSON.stringify({ctx__error}))
}
/**
 * Assigns & coerces to ctx.ctx__error
 * @return {module:ctx-core/object/lib~ctx} The ctx with ctx.ctx__error
 * @param {module:ctx-core/object/lib~ctx} ctx - The ctx to be assigned to
 * @param {ctx__error|string} ctx__error$or$error_message - Assigned or coerced into ctx.ctx__error
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error - Assigned or coerced into ctx.ctx__error
 */
export function assign__ctx__error(ctx, ctx__error$or$error_message, ...array__ctx__error) {
  log(`${logPrefix}|assign__ctx__error`)
  let ctx__error = $ctx__error(
        (ctx && ctx.ctx__error)
        || ((typeof ctx__error$or$error_message === 'object')
           && ctx__error$or$error_message)
        || {})
  assign(ctx__error, ctx__error$or$error_message, ...array__ctx__error)
  const $error_message =
          ctx__error$or$error_message
          && ctx__error$or$error_message.toString()
      , error_message =
          ( ($error_message !== '[object Object]')
            && $error_message)
          || (ctx && ctx.error_message)
          || (ctx__error && ctx__error.error_message)
  assign(ctx__error, {error_message})
  assign(ctx, {ctx__error})
  return ctx
}
function $ctx__error(ctx__error) {
  log(`${logPrefix}|$ctx__error`)
  defaults(
    ctx__error,
    { type: 'ctx-core/error/lib~ctx__error',
      error_message: ''})
  return ctx__error
}
/**
 * Bad Request error with ctx.status__http 400.
 * @typedef bad_request
 * @see {@link throw__error}
 * @example
 * throw__bad_request(ctx) // Bad Request
 */
/**
 * Throws an bad_request error (HTTP 400)
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {bad_request}
 */
export function throw__bad_request(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__bad_request`)
  throw__error(
    ctx,
    { type: 'bad_request',
      error_message: 'Bad Request',
      status__http: 400,
      error_message__http: 'Bad Request'},
    ...array__ctx__error)
}
/**
 * Unauthorized error with ctx.status__http 401.
 * @typedef unauthorized
 * @see {@link throw__error}
 * @example
 * throw__unauthorized(ctx) // Unauthorized
 */
/**
 * Throws an unauthorized error (HTTP 401)
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {unauthorized}
 */
export function throw__unauthorized(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__unauthorized`)
  throw__error(
    ctx,
    { type: 'unauthorized',
      error_message: 'Unauthorized',
      status__http: 401,
      error_message__http: 'Unauthorized'},
    ...array__ctx__error)
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
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {bad_credentials}
 */
export function throw__bad_credentials(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__bad_credentials`)
  throw__error(
    ctx,
    { type: 'bad_credentials',
      status__http: 401,
      error_message__http: 'Unauthorized'},
    ...array__ctx__error)
}
/**
 * Not Found Error
 * @typedef not_found
 * @see {@link throw__error}
 * @example
 * throw__not_found(ctx) // Unauthorized
 */
/**
 * Throws a Not Found error (HTTP 401)
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {not_found}
 */
export function throw__not_found(ctx, ...array__ctx__error) {
  log(`${logPrefix}|not_found`)
  throw__error(
    ctx,
    { type: 'not_found',
      status__http: 404,
      error_message__http: 'Not Found'},
    ...array__ctx__error)
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
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {missing_argument} throw missing_argument error
 */
export function throw__missing_argument(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__missing_argument`)
  const ctx__error = clone(...array__ctx__error)
  throw__error(
    ctx,
    { type: 'missing_argument',
      error_message: `${ctx__error.key} is not defined - ${ctx__error.type || 'Unknown Type'}`,
      status__http: 500,
      error_message__http: 'Error'},
    ctx__error)
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
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {invalid_argument}
 */
export function throw__invalid_argument(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__invalid_argument`)
  const ctx__error = clone(...array__ctx__error)
  throw__error(
    ctx,
    { type: 'invalid_argument',
      error_message: `${ctx__error.key} is invalid`,
      status__http: 500,
      error_message__http: 'Error'},
    ctx__error)
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
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @param {...module:ctx-core/error/lib~ctx__error.reason} ctx__error.reason - The reason for the invalid state.
 * @throws {invalid_state}
 */
export function throw__invalid_state(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__invalid_state`)
  const ctx__error = clone(...array__ctx__error)
      , reason =
          ctx__error.reason
          || 'No reason given.'
  throw__error(
    ctx,
    { type: 'invalid_state',
      error_message: `${ctx__error.key} is in an invalid state. ${reason}`,
      status__http: 500,
      error_message__http: 'Error'},
    ctx__error)
}
/**
 * Bad Gateway http error with ctx.status__http 502.
 * @typedef bad_gateway
 * @see {@link throw__error}
 * @example
 * throw__bad_gateway(ctx) // Bad Gateway
 */
/**
 * Throws a bad_gateway error (HTTP 502)
 * @param {...module:ctx-core/error/lib~ctx__error} ctx__error
 * @throws {bad_gateway}
 */
export function throw__bad_gateway(ctx, ...array__ctx__error) {
  log(`${logPrefix}|throw__bad_gateway`)
  throw__error(
    ctx,
    { type: 'bad_gateway',
      status__http: 502,
      error_message__http: 'Bad Gateway'},
    ...array__ctx__error)
}

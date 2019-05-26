/**
 * Error functions
 * @module @ctx-core/error/lib.js
 */
import { assign, clone, defaults } from '@ctx-core/object'
import { log, error, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/error'
/**
 * ctx used to throw & catch errors
 * @typedef {ctx} ctx__error
 * @property {string}[error_message] - Message to print to the console.error
 * @property {string}[type] - Type of the error
 */
/**
 * Throws an error
 * @param {...ctx__error} a1__ctx__error - Assigned into ctx.ctx__error
 * @throws Decorate & throw error given by the arguments.
 */
export function throw__error(...a1__ctx__error) {
	log(`${logPrefix}|throw__error`)
	throw _ctx__error__log(...a1__ctx__error)
}
/**
 * Prints the given `ctx__error` to stderr
 * @param {ctx__error} ctx__error
 */
export function print__error(ctx__error) {
	log(`${logPrefix}|print__error`)
	const { error_message__http = 'Error' } = ctx__error
	const body = JSON.stringify({ error_message: error_message__http })
	error(`
${logPrefix}|use__error|catch
${ctx__error}
${body}
${ctx__error.error_message}
${ctx__error.stack}`.trim())
}
/**
 * Logs to stderr & returns a ctx__error.
 * @param {...ctx__error}a1__ctx__error
 * @returns {ctx__error}
 */
export function _ctx__error__log(...a1__ctx__error) {
	const ctx__error = _ctx__error(a1__ctx__error[0], ...a1__ctx__error.slice(1))
	console__error(ctx__error)
	return ctx__error
}
/**
 * Logs the given ctx__error to stderr
 * @param ctx__error
 */
export function console__error(ctx__error) {
	log(`${logPrefix}|console__error`)
	const error_message__ =
		ctx__error.error_message
		|| ctx__error && ctx__error.toString()
		|| 'throw__error: Unknown Error'
	const stack = ctx__error && ctx__error.stack
	error(`
${logPrefix}|throw__error
${stack}
${error_message__}
${JSON.stringify(ctx__error)}
	`.trim())
}
/**
 * Assigns & coerces to ctx.ctx__error
 * @param {ctx__error|string}ctx__error__or__error_message The ctx to be assigned to
 * @param {...ctx__error}a1__ctx__error Assigned or coerced into ctx.ctx__error
 * @return {ctx__error}
 */
export function _ctx__error(ctx__error__or__error_message, ...a1__ctx__error) {
	log(`${logPrefix}|_ctx__error`)
	return (
		clone((
			typeof ctx__error__or__error_message === 'string'
			? { error_message: ctx__error__or__error_message }
			: ctx__error__or__error_message || {}
		), ...a1__ctx__error)
	)
}
/**
 * Returns a `ctx__error` with default values
 * @param {ctx__error}ctx__error
 * @returns {ctx__error}
 */
function _ctx__error__defaults(ctx__error) {
	defaults(
		ctx__error,
		{
			type: 'ctx__error',
			error_message: ''
		})
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
 * @param {...ctx__error} a1__ctx__error
 * @throws {bad_request}
 */
export function throw__bad_request(...a1__ctx__error) {
	log(`${logPrefix}|throw__bad_request`)
	throw__error({
			type: 'bad_request',
			error_message: 'Bad Request',
			status__http: 400,
			error_message__http: 'Bad Request'
		},
		...a1__ctx__error)
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
 * @param {...ctx__error} a1__ctx__error
 * @throws {unauthorized}
 */
export function throw__unauthorized(...a1__ctx__error) {
	log(`${logPrefix}|throw__unauthorized`)
	throw__error({
			type: 'unauthorized',
			error_message: 'Unauthorized',
			status__http: 401,
			error_message__http: 'Unauthorized'
		},
		...a1__ctx__error)
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
 * @param {...ctx__error} a1__ctx__error
 * @throws {bad_credentials}
 */
export function throw__bad_credentials(...a1__ctx__error) {
	log(`${logPrefix}|throw__bad_credentials`)
	throw__error({
			type: 'bad_credentials',
			status__http: 401,
			error_message__http: 'Unauthorized'
		},
		...a1__ctx__error)
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
 * @param {...ctx__error} a1__ctx__error
 * @throws {not_found}
 */
export function throw__not_found(...a1__ctx__error) {
	log(`${logPrefix}|not_found`)
	throw__error({
			type: 'not_found',
			status__http: 404,
			error_message__http: 'Not Found'
		},
		...a1__ctx__error)
}
/**
 * Missing Argument error.
 * @typedef missing_argument
 * @see {@link throw__error}
 * @example
 * throw__missing_argument({key: 'ctx.foobar', type: 'baz__agent'}) // ctx.foobar is not defined - baz__agent
 */
/**
 * @typedef {ctx__error} ctx__missing_argument
 * @param {string} type
 */
/**
 * Throws a missing_argument error (HTTP 500)
 * @param {...ctx__missing_argument} a1__ctx__error
 * @throws {missing_argument} throw missing_argument error
 */
export function throw__missing_argument(...a1__ctx__error) {
	log(`${logPrefix}|throw__missing_argument`)
	const ctx__error = clone(...a1__ctx__error)
	throw__error({
			type: 'missing_argument',
			error_message: `${ctx__error.key} is not defined - ${ctx__error.type || 'Unknown Type'}`,
			status__http: 500,
			error_message__http: 'Error'
		},
		ctx__error)
}
/**
 * Invalid Argument error.
 * @typedef invalid_argument
 * @see {@link throw__error}
 * @example
 * throw__invalid_argument({key: 'ctx.foobar'}) // ctx.foobar is invalid
 */
/**
 * Throws a invalid_argument error (HTTP 500)
 * @param {...ctx__error} a1__ctx__error
 * @throws {invalid_argument}
 */
export function throw__invalid_argument(...a1__ctx__error) {
	log(`${logPrefix}|throw__invalid_argument`)
	const ctx__error = clone(...a1__ctx__error)
	throw__error({
			type: 'invalid_argument',
			error_message: `${ctx__error.key} is invalid`,
			status__http: 500,
			error_message__http: 'Error'
		},
		ctx__error)
}
/**
 * Invalid State error.
 * @typedef invalid_state
 * @see {@link throw__error}
 * @example
 * throw__invalid_state({key: 'ctx.foobar'}) // ctx.foobar is in an invalid state
 */
/**
 * @typedef {ctx__error} ctx__invalid_state
 * @param {string=}reason The reason for the invalid state.
 */
/**
 * Throws a invalid_state error (HTTP 500)
 * @param {...ctx__invalid_state} a1__ctx__error
 * @throws {invalid_state}
 */
export function throw__invalid_state(...a1__ctx__error) {
	log(`${logPrefix}|throw__invalid_state`)
	const ctx__error = clone(...a1__ctx__error)
	const reason = ctx__error.reason || 'No reason given.'
	throw__error({
			type: 'invalid_state',
			error_message: `${ctx__error.key} is in an invalid state. ${reason}`,
			status__http: 500,
			error_message__http: 'Error'
		},
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
 * @param {...ctx__error} a1__ctx__error
 * @throws {bad_gateway}
 */
export function throw__bad_gateway(...a1__ctx__error) {
	log(`${logPrefix}|throw__bad_gateway`)
	throw__error({
			type: 'bad_gateway',
			status__http: 502,
			error_message__http: 'Bad Gateway'
		},
		...a1__ctx__error)
}

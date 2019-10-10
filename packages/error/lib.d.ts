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
export declare function throw__error(ctx__error__or__error_message: any): void;
/**
 * Prints the given `ctx__error` to stderr
 * @param {ctx__error} ctx__error
 */
export declare function print__error(ctx__error: any): void;
/**
 * Logs to stderr & returns a ctx__error.
 * @param {...ctx__error}a1__ctx__error
 * @returns {ctx__error}
 */
export declare function _ctx__error__log(ctx__error__or__error_message: any): any;
/**
 * Logs the given ctx__error to stderr
 * @param ctx__error
 */
export declare function console__error(ctx__error: any): void;
/**
 * Assigns & coerces to ctx.ctx__error
 * @param {ctx__error|string}ctx__error__or__error_message The ctx to be assigned to
 * @param {...ctx__error}a1__ctx__error Assigned or coerced into ctx.ctx__error
 * @return {ctx__error}
 */
export declare function _ctx__error(ctx__error__or__error_message: any): any;
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
export declare function throw__bad_request(...a1__ctx__error: any[]): void;
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
export declare function throw__unauthorized(...a1__ctx__error: any[]): void;
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
export declare function throw__bad_credentials(...a1__ctx__error: any[]): void;
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
export declare function throw__not_found(...a1__ctx__error: any[]): void;
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
export declare function throw__missing_argument(...a1__ctx__error: any[]): void;
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
export declare function throw__invalid_argument(...a1__ctx__error: any[]): void;
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
export declare function throw__invalid_state(...a1__ctx__error: any[]): void;
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
export declare function throw__bad_gateway(...a1__ctx__error: any[]): void;

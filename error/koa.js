/**
 * koa middleware for error handling
 * @module ctx-core/error/koa
 */
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/error/koa'
/**
 * koa error handling middleware for the ctx-core api.
 * @param {Object} ctx - The ctx
 * @param {...Object} ctx$$ - assigns to ctx
 * @listens {http} listens to http requests
 */
export function app$use__error(ctx) {
  log(`${logPrefix}|app$use__error`)
  const app = ctx.app
  app.use(http__error)
}
/**
 * HTTP error
 * @param next
 */
export function *http__error(next) {
  log(`${logPrefix}|http__error`)
  try {
    yield next
  } catch (error$ctx) {
    const http$error_message = error$ctx.http$error_message || 'Error'
        , error$ctx$response$body = error$ctx.response$body
        , response$body = error$ctx$response$body ?
            error$ctx$response$body :
            JSON.stringify({error_message: http$error_message})
    error(`${logPrefix}|app$use__error|catch`, response$body)
    this.status = error$ctx.http$status || 500
    this.body = response$body
  }
}
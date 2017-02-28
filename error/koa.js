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
export function app$use__error(app) {
  log(`${logPrefix}|app$use__error`)
  app.use(http__error)
}
/**
 * HTTP error
 * @param next
 */
export async function http__error(ctx, next) {
  try {
    await next()
  } catch (error$ctx) {
    log(`${logPrefix}|http__error`)
    const {http$error_message = 'Error'} = error$ctx
        , response$body = JSON.stringify({error_message: http$error_message})
    error(
      `${logPrefix}|app$use__error|catch
       ${error$ctx}
       ${response$body}
       ${error$ctx.error_message}`)
    ctx.status = error$ctx.http$status || 500
    ctx.body = response$body
  }
}
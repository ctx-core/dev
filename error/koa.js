/**
 * koa middleware for error handling
 * @module ctx-core/error/koa
 */
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/error/koa'
export default use__error
/**
 * koa error handling middleware for the ctx-core api.
 * @param {Object} ctx - The ctx
 * @param {...Object} ctx$$ - assigns to ctx
 * @listens {http} listens to http requests
 */
export function use__error(app) {
  log(`${logPrefix}|use__error`)
  app.use(http__error)
}
/**
 * HTTP error
 * @param next
 */
export async function http__error(ctx, next) {
  try {
    await next()
  } catch (ctx__error) {
    log(`${logPrefix}|http__error`)
    const {http$error_message = 'Error'} = ctx__error
        , response$body = JSON.stringify({error_message: http$error_message})
    error(
      `${logPrefix}|use__error|catch
       ${ctx__error}
       ${response$body}
       ${ctx__error.error_message}`)
    ctx.status = ctx__error.http$status || 500
    ctx.body = response$body
  }
}
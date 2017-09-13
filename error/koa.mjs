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
    const {error_message__http = 'Error'} = ctx__error
        , body = JSON.stringify({error_message: error_message__http})
    error(
      `${logPrefix}|use__error|catch
       ${ctx__error}
       ${body}
       ${ctx__error.error_message}`)
    ctx.status = ctx__error.status__http || 500
    ctx.body = body
  }
}
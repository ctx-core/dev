import 'ctx-core/basic_auth/env'
import {assign} from 'ctx-core/object/lib'
import {throw__error} from 'ctx-core/error/lib'
import koa$basic$auth from 'koa-basic-auth'
import env from 'ctx-core/basic_auth/env'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/basic_auth/koa'
export function app$use__basic_auth(app) {
  log(`${logPrefix}|app$use__basic_auth`)
  app.use(async function basic_auth(ctx, next){
    log(`${logPrefix}|app$use__basic_auth|basic_auth`)
    try {
      await next
    } catch (error$ctx) {
      error(`${logPrefix}|app$use__basic_auth|basic_auth|error`, error$ctx)
      const error$ctx__http$status = error$ctx.http$status
      if (401 == error$ctx__http$status || error$ctx.toString() === 'UnauthorizedError: Unauthorized') {
        ctx.status = parseInt(error$ctx__http$status) || 401
        ctx.set('WWW-Authenticate', 'Basic')
        ctx.body = 'unauthorized'
      } else {
        throw__error(ctx, error$ctx)
      }
    }
  })
  app.use(koa$basic$auth({name: env.BASIC_AUTH_LOGIN, pass: env.BASIC_AUTH_PASSWORD}))
}
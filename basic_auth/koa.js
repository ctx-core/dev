import 'ctx-core/basic_auth/env'
import {throw__error} from 'ctx-core/error/lib'
import basic_auth__koa from 'koa-basic-auth'
import env from 'ctx-core/basic_auth/env'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/basic_auth/koa'
export function use__basic_auth(app) {
  log(`${logPrefix}|use__basic_auth`)
  app.use(async function basic_auth(ctx, next){
    log(`${logPrefix}|use__basic_auth|basic_auth`)
    try {
      await next
    } catch (ctx__error) {
      error(`${logPrefix}|use__basic_auth|basic_auth|error`, ctx__error)
      const ctx__error__http$status = ctx__error.http$status
      if (401 == ctx__error__http$status || ctx__error.toString() === 'UnauthorizedError: Unauthorized') {
        ctx.status = parseInt(ctx__error__http$status) || 401
        ctx.set('WWW-Authenticate', 'Basic')
        ctx.body = 'unauthorized'
      } else {
        throw__error(ctx, ctx__error)
      }
    }
  })
  app.use(basic_auth__koa({name: env.BASIC_AUTH_LOGIN, pass: env.BASIC_AUTH_PASSWORD}))
}
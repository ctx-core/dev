import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/debug/koa'
export default use__debug
export function use__debug(app) {
  log(`${logPrefix}|use__debug`)
  app.use(http__debug)
}
export async function http__debug(ctx, next) {
  log(`${logPrefix}|http__debug`)
  ctx.debug = ctx.query.debug || false
  await next()
}
import 'version/env'
import route__koa from 'koa-route'
import {$version} from 'ctx-core/version/lib'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/version/koa'
export default app$use__version
export function app$use__version(app) {
  log(`${logPrefix}|app$use__version`)
  app.use(route__koa.get('/version', koa$get__version))
}
export async function koa$get__version(ctx) {
  info(`${logPrefix}|koa$get__version`)
  ctx.body = $version()
}
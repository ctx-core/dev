import 'version/env'
import route__koa from 'koa-route'
import {$version} from 'ctx-core/version/lib'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/version/koa'
export default app$use__version
export function app$use__version(ctx) {
  log(`${logPrefix}|app$use__version`)
  const {app} = ctx
  app.use(route__koa.get('/version', koa$get__version))
}
export function *koa$get__version() {
  info(`${logPrefix}|*koa$get__version`)
  this.body = $version()
}
import {http$koa} from 'ctx-core/koa/lib'
import {quovo_demo$html} from 'ctx-core/quovo-demo/html'
import route__koa from 'koa-route'
import 'ctx-core/quovo/rpc'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/koa'
export default app$use__quovo_demo
export function app$use__quovo_demo(ctx) {
  log(`${logPrefix}|app$use__quovo_demo`)
  const {app} = ctx
  app.use(route__koa.get('/test.quovo', function *() {
    this.redirects('/quovo-demo')
  }))
  app.use(route__koa.get('/quovo-demo', koa$get__quovo_demo))
  app.use(route__koa.get('/quovo-demo', redirects__quovo$demo))
  app.use(route__koa.get('/quovo_test', redirects__quovo$demo))
}
function *redirects__quovo$demo() {
  this.redirects('/quovo-demo')
}
//GET /quovo-demo
export function *koa$get__quovo_demo() {
  info(`${logPrefix}|koa$get__quovo_demo`)
  return yield http$koa(this, function *(ctx) {
    log(`${logPrefix}|koa$get__quovo_demo|fn`)
    this.body = quovo_demo$html(ctx)
  })
}
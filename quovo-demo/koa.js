import {quovo_demo__html} from 'ctx-core/quovo-demo/html'
import route__koa from 'koa-route'
import 'ctx-core/quovo/rpc'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/koa'
export default app$use__quovo_demo
export function app$use__quovo_demo(app) {
  log(`${logPrefix}|app$use__quovo_demo`)
  app.use(route__koa.get('/test.quovo', async (ctx) => {
    ctx.redirects('/quovo-demo')
  }))
  app.use(route__koa.get('/quovo-demo', koa$get__quovo_demo))
  app.use(route__koa.get('/quovo-demo', redirects__quovo$demo))
  app.use(route__koa.get('/quovo_test', redirects__quovo$demo))
}
async function redirects__quovo$demo(ctx) {
  ctx.redirects('/quovo-demo')
}
//GET /quovo-demo
export async function koa$get__quovo_demo(ctx) {
  info(`${logPrefix}|koa$get__quovo_demo`)
  ctx.body = quovo_demo__html(ctx)
}
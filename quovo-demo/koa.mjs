import {quovo_demo__html} from 'ctx-core/quovo-demo/html'
import route__koa from 'koa-route'
import 'ctx-core/quovo/rpc'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/koa.mjs'
export default use__quovo_demo
export function use__quovo_demo(app) {
  log(`${logPrefix}|use__quovo_demo`)
  app.use(route__koa.get('/test.quovo', async (ctx) => {
    ctx.redirect('/quovo-demo')
  }))
  app.use(route__koa.get(
    '/quovo-demo',
    get__quovo_demo))
  app.use(route__koa.get(
    '/quovo-demo',
    redirects__quovo__demo))
  app.use(route__koa.get(
    '/quovo_test',
    redirects__quovo__demo))
}
async function redirects__quovo__demo(ctx) {
  ctx.redirect('/quovo-demo')
}
//GET /quovo-demo
export async function get__quovo_demo(ctx) {
  info(`${logPrefix}|get__quovo_demo`)
  ctx.body = quovo_demo__html(ctx)
}
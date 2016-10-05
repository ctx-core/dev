/** @module ctx-core/rpc/koa */
import {assign} from 'ctx-core/object/lib'
import {http$koa} from 'ctx-core/koa/lib'
import {delegate__rpc} from './lib'
import koa$route from 'koa-route'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/rpc/koa'
/**
 * koa handler for POST /rpc
 * @see module:ctx-core/rpc/lib.delegate__rpc
 * @listens {http} listens to http requests
 */
export default function app$use__rpc(ctx) {
  log(`${logPrefix}|app$use__rpc`)
  const {app} = ctx
  app.use(koa$route.post('/rpc', koa$post__rpc))
}
/**
 * HTTP POST /rpc
 */
export function *koa$post__rpc(next) {
  info(`${logPrefix}|koa$post__rpc`)
  yield http$koa(this, function *(ctx) {
    log(`${logPrefix}|koa$post__rpc|http$koa`)
    const request$ctx = assign(ctx, this.request.body, {
      request: this.request,
      session: this.session
    })
    info(`${logPrefix}|koa$post__rpc|rpc`, JSON.stringify(request$ctx.rpc))
    const rpc$ctx = yield delegate__rpc(ctx)
    this.body = JSON.stringify(rpc$ctx)
  })
}

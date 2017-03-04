/** @module ctx-core/rpc/koa */
import {assign} from 'ctx-core/object/lib'
import {delegate__rpc} from './lib'
import route__koa from 'koa-route'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/rpc/koa'
/**
 * koa handler for POST /rpc
 * @see module:ctx-core/rpc/lib.delegate__rpc
 * @listens {http} listens to http requests
 */
export default function app$use__rpc(app) {
  log(`${logPrefix}|app$use__rpc`)
  app.use(route__koa.post('/rpc', koa$post__rpc))
}
/**
 * HTTP POST /rpc
 */
export async function koa$post__rpc(ctx) {
  info(`${logPrefix}|koa$post__rpc`)
  const request$ctx = assign(ctx, ctx.request.body, {
    request: ctx.request,
    session: ctx.session
  })
  info(`${logPrefix}|koa$post__rpc|rpc`, JSON.stringify(request$ctx.rpc))
  const ctx__rpc = await delegate__rpc(ctx)
  ctx.body = JSON.stringify(ctx__rpc)
}

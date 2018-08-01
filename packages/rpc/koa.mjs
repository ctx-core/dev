/** @module ctx-core/rpc/koa */
import { assign } from '@ctx-core/object/lib.mjs'
import { delegate__rpc } from './lib.mjs'
import route__koa from 'koa-route'
import { log, info, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/rpc/koa.mjs'
/**
 * koa handler for POST /rpc
 * @see module:ctx-core/rpc/lib.delegate__rpc
 * @listens {http} listens to http requests
 */
export default function use__rpc(app) {
	log(`${logPrefix}|use__rpc`)
	app.use(route__koa.post('/rpc', post__rpc))
}
/**
 * HTTP POST /rpc
 */
export async function post__rpc(ctx) {
	info(`${logPrefix}|post__rpc`)
	const ctx__request =
		assign(ctx, ctx.request.body, {
			request: ctx.request,
			session: ctx.session
		})
	info(`${logPrefix}|post__rpc|rpc`, JSON.stringify(ctx__request.rpc))
	const ctx__rpc = await delegate__rpc(ctx)
	ctx.body = JSON.stringify(ctx__rpc)
}

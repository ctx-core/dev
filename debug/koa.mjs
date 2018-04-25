import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/debug/koa.mjs'
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
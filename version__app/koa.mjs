import 'ctx-core/version__app/env.mjs'
import route__koa from 'koa-route'
import { _version } from 'ctx-core/version__app/lib.mjs'
import { log, info, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/version__app/koa.mjs'
export default use__version
export function use__version(app) {
	log(`${logPrefix}|use__version`)
	app.use(route__koa.get('/version', get__version))
}
export async function get__version(ctx) {
	info(`${logPrefix}|get__version`)
	ctx.body = _version()
}
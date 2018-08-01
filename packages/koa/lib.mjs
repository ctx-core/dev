import { assign } from '@ctx-core/object/lib.mjs'
import send__koa from 'koa-send'
import { log, info, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/koa/lib.mjs'
export function use__send(app, opts__ = {}) {
	log(`${logPrefix}|use__send`)
	const opts =
		assign(
			{
				root: './public',
				index: 'index.html'
			},
			opts__)
	app.use(send)
	async function send(ctx, next) {
		ctx.compress = true
		try {
			await send__koa(ctx, ctx.path, opts)
		} catch (e) {
			if (e.code !== 'ENOENT') {
				throw e
			}
		}
		await next()
	}
}
export function use__log__time__request(app) {
	log(`${logPrefix}|use__log__time__request`)
	app.use(log__time__request)
	async function log__time__request(ctx, next) {
		const start = new Date()
		try {
			await next()
		} finally {
			const ms = new Date - start
			info(
				`${logPrefix}|log__time__request`,
				`${ms}ms`,
				ctx.method,
				ctx.url)
		}
	}
}
export function use__echo(app) {
	log(`${logPrefix}|use__echo`)
	app.use(echo)
	async function echo(ctx) {
		if (!ctx.body) {
			const { method, url } = ctx
			info(`${logPrefix}|default|${method} ${url}`)
			ctx.body = `${method} ${url}`
		}
	}
}
export function set__cache_control(
	self,
	cache_control = 'public, max-age=3600'
) {
	log(`${logPrefix}|set__cache_control`)
	self.set('Cache-Control', cache_control)
}
export function set__cache_control__5min(self) {
	log(`${logPrefix}|set__cache_control__5min`)
	set__cache_control(self, 'public, max-age=300')
}
export function set__cache_control__1hour(self) {
	log(`${logPrefix}|set__cache_control__5min`)
	set__cache_control(self, 'public, max-age=3600')
}
export function set__cache_control__1day(self) {
	log(`${logPrefix}|set__cache_control__5min`)
	set__cache_control(self, 'public, max-age=86400')
}
export function set__headers(self, ...ARR__ctx) {
	log(`${logPrefix}|set__headers`)
	const ctx = assign(...ARR__ctx)
	const { headers = [] } = ctx
	for (let key in headers) {
		self.set(key, headers[key])
	}
}
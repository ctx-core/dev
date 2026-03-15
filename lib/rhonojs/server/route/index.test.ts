import { Hono } from 'hono'
import { app_ctx, middleware_ctx__new } from 'rebuildjs/server'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { hono_context_ } from '../hono/index.js'
import { html_route_, request_ctx__ensure } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('html_route_|string', async ()=>{
	const middleware_ctx = middleware_ctx__new()
	const html = `<!DOCTYPE html><html><head></head><body><div>Test</div></body></html>`
	const html_route = html_route_(middleware_ctx, ()=>
		html)
	const app = new Hono()
	app.get('/', html_route)
	const response = await app.request('/')
	equal(html, await response.text())
})
test('html_route_|toString', async ()=>{
	const middleware_ctx = middleware_ctx__new()
	const html = `<!DOCTYPE html><html><head></head><body><div>Test</div></body></html>`
	const html_route = html_route_(middleware_ctx, ()=>(
		{ toString: ()=>html }))
	const app = new Hono()
	app.get('/', html_route)
	const response = await app.request('/')
	equal(await response.text(), html)
})
test('html_route_|ReadableStream|string', async ()=>{
	const middleware_ctx = middleware_ctx__new()
	const html = `<!DOCTYPE html><html><head></head><body><div>Test</div></body></html>`
	const html_route = html_route_(middleware_ctx, ()=>
		new ReadableStream({
			start(controller) {
				let first = true
				for (const chunk of html.split('>')) {
					if (!first) controller.enqueue('>')
					first = false
					if (chunk != null) controller.enqueue(chunk)
				}
				controller.close()
			}
		}))
	const app = new Hono()
	app.get('/', html_route)
	const response = await app.request('/')
	equal(await response.text(), html)
})
test('html_route_|response_init|all', async ()=>{
	const middleware_ctx = middleware_ctx__new()
	const html = `<!DOCTYPE html><html><head></head><body><div>Test</div></body></html>`
	const html_route = html_route_(middleware_ctx, ()=>html, {
		status: 403,
		statusText: 'Forbidden',
		headers: {
			'Content-Type': 'application/json',
			'FOO': 'BAR',
		}
	})
	const app = new Hono()
	app.get('/', html_route)
	const response = await app.request('/')
	equal(response.status, 403)
	equal(response.statusText, 'Forbidden')
	equal(response.headers.get('Content-Type'), 'text/html;charset=UTF-8')
	equal(response.headers.get('FOO'), 'BAR')
})
test('html_route_|response_init|additional headers', async ()=>{
	const middleware_ctx = middleware_ctx__new()
	const html = `<!DOCTYPE html><html><head></head><body><div>Test</div></body></html>`
	const html_route = html_route_(middleware_ctx, ()=>html, {
		headers: {
			'FOO': 'BAR'
		}
	})
	const app = new Hono()
	app.get('/', html_route)
	const response = await app.request('/')
	equal(response.status, 200)
	equal(response.headers.get('Content-Type'), 'text/html;charset=UTF-8')
	equal(response.headers.get('FOO'), 'BAR')
})
test('request_ctx__ensure', async ()=>{
	const middleware_ctx = middleware_ctx__new()
	let captured_request_ctx:any
	const app = new Hono()
	app.get('/', c=>{
		const request_ctx = request_ctx__ensure(middleware_ctx, c)
		captured_request_ctx = request_ctx
		equal(c.get('request_ctx'), request_ctx)
		equal(hono_context_(request_ctx), c)
		return c.text('ok')
	})
	await app.request('/')
	equal(captured_request_ctx != null, true)
})
test.run()

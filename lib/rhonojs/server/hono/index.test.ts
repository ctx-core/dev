import { Hono } from 'hono'
import { app_ctx, ctx_, middleware_ctx__new, request_ctx__new } from 'rebuildjs/server'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import {
	hono_context$_,
	hono_context_,
	hono_context__set,
	request$_,
	request_,
	request_url$_,
	request_url_,
} from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('hono_context', async ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	equal(hono_context$_(request_ctx)(), undefined)
	equal(hono_context_(request_ctx), undefined)
	// Use a real Hono context by running through a handler
	const app = new Hono()
	let captured_c:any
	app.get('/', c=>{
		captured_c = c
		return c.text('ok')
	})
	await app.request('http://localhost:3000/')
	hono_context__set(request_ctx, captured_c)
	equal(hono_context$_(request_ctx)(), captured_c)
	equal(hono_context_(request_ctx), captured_c)
	// @ts-expect-error TS2345
	throws(()=>hono_context$_(ctx_())())
	// @ts-expect-error TS2345
	throws(()=>hono_context_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>hono_context__set(ctx_(), captured_c))
})
test('request', async ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	equal(request$_(request_ctx)(), undefined)
	equal(request_(request_ctx), undefined)
	const app = new Hono()
	let captured_c:any
	app.get('/', c=>{
		captured_c = c
		return c.text('ok')
	})
	await app.request('http://localhost:3000/')
	hono_context__set(request_ctx, captured_c)
	const req = request_(request_ctx)
	equal(req instanceof Request, true)
	equal(request$_(request_ctx)(), req)
	// @ts-expect-error TS2345
	throws(()=>request$_(ctx_())())
	// @ts-expect-error TS2345
	throws(()=>request_(ctx_()))
})
test('request_url', async ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	equal(request_url$_(request_ctx)(), undefined)
	equal(request_url_(request_ctx), undefined)
	const app = new Hono()
	let captured_c:any
	app.get('/foo/bar', c=>{
		captured_c = c
		return c.text('ok')
	})
	await app.request('http://localhost:3000/foo/bar')
	hono_context__set(request_ctx, captured_c)
	const url = request_url_(request_ctx)
	equal(url instanceof URL, true)
	equal(url!.pathname, '/foo/bar')
	equal(request_url$_(request_ctx)(), url)
	// @ts-expect-error TS2345
	throws(()=>request_url$_(ctx_())())
	// @ts-expect-error TS2345
	throws(()=>request_url_(ctx_()))
})
test.run()

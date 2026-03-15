import { Hono } from 'hono'
import { app_ctx, app_path__set, ctx_, cwd__set, server__metafile__set } from 'rebuildjs/server'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { server__metafile0 } from '../../_fixtures/metafile.js'
import {
	app$_,
	app_,
	app__set,
	server_entry__output__link__path$_,
	server_entry__output__link__path_,
	server_entry__output__path$_,
	server_entry__output__path_,
	server_entry__output__relative_path$_,
	server_entry__output__relative_path_,
	server_entry__relative_path$_,
	server_entry__relative_path_
} from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('app', ()=>{
	equal(app$_(app_ctx)(), undefined)
	equal(app_(app_ctx), undefined)
	const app = new Hono()
	app__set(app_ctx, app)
	equal(app$_(app_ctx)(), app)
	equal(app_(app_ctx), app)
	// @ts-expect-error TS2345
	throws(()=>app$_(ctx_())())
	// @ts-expect-error TS2345
	throws(()=>app_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>app__set(ctx_(), app))
})
test('server_entry__relative_path', ()=>{
	equal(server_entry__relative_path$_(app_ctx)(), 'src/app/index.ts')
	equal(server_entry__relative_path_(app_ctx), 'src/app/index.ts')
	cwd__set(app_ctx, '/cwd')
	app_path__set(app_ctx, '/cwd/src/app2')
	equal(server_entry__relative_path$_(app_ctx)(), 'src/app2/index.ts')
	equal(server_entry__relative_path_(app_ctx), 'src/app2/index.ts')
	// @ts-expect-error TS2345
	throws(()=>server_entry__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server_entry__relative_path_(ctx_()))
})
test('server_entry__output__relative_path', ()=>{
	equal(server_entry__output__relative_path$_(app_ctx)(), undefined)
	equal(server_entry__output__relative_path_(app_ctx), undefined)
	equal(server_entry__relative_path_(app_ctx), 'src/app/index.ts')
	server__metafile__set(app_ctx, server__metafile0)
	equal(server__metafile0.outputs['dist/dev-server/index-OUBLL3JD.js'].entryPoint, 'src/app/index.ts')
	equal(server_entry__output__relative_path$_(app_ctx)(), 'dist/dev-server/index-OUBLL3JD.js')
	equal(server_entry__output__relative_path_(app_ctx), 'dist/dev-server/index-OUBLL3JD.js')
	// @ts-expect-error TS2345
	throws(()=>server_entry__output__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server_entry__output__relative_path_(ctx_()))
})
test('server_entry__output__path', ()=>{
	equal(server_entry__output__path$_(app_ctx)(), undefined)
	equal(server_entry__output__path_(app_ctx), undefined)
	cwd__set(app_ctx, '/cwd')
	server__metafile__set(app_ctx, server__metafile0)
	equal(server_entry__relative_path_(app_ctx), 'src/app/index.ts')
	equal(server__metafile0.outputs['dist/dev-server/index-OUBLL3JD.js'].entryPoint, 'src/app/index.ts')
	equal(server_entry__output__path$_(app_ctx)(), '/cwd/dist/dev-server/index-OUBLL3JD.js')
	equal(server_entry__output__path_(app_ctx), '/cwd/dist/dev-server/index-OUBLL3JD.js')
	// @ts-expect-error TS2345
	throws(()=>server_entry__output__path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server_entry__output__path_(ctx_()))
})
test('server_entry__output__link__path', ()=>{
	equal(server_entry__output__link__path$_(app_ctx)(), undefined)
	equal(server_entry__output__link__path_(app_ctx), undefined)
	cwd__set(app_ctx, '/cwd')
	server__metafile__set(app_ctx, server__metafile0)
	equal(server_entry__relative_path_(app_ctx), 'src/app/index.ts')
	equal(server_entry__output__link__path$_(app_ctx)(), '/cwd/dist/dev-server/index.js')
	equal(server_entry__output__link__path_(app_ctx), '/cwd/dist/dev-server/index.js')
	// @ts-expect-error TS2345
	throws(()=>server_entry__output__link__path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server_entry__output__link__path_(ctx_()))
})
test.run()

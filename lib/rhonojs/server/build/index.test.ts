import { sleep } from 'ctx-core/function'
import { ctx_, ns_be_sig_triple_, rmemo__wait } from 'ctx-core/rmemo'
import {
	app_ctx,
	build_id_,
	build_id__refresh,
	build_id__set,
	browser__metafile__set,
	metafile__build_id_,
	rebuildjs__build_id__set,
	rebuildjs__esbuild__build_id__set,
	rebuildjs__ready__add,
	server__metafile__set,
} from 'rebuildjs/server'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { browser__metafile0, server__metafile0 } from '../../_fixtures/metafile.js'
import {
	rhonojs__build_id$_,
	rhonojs__build_id_,
	rhonojs__build_id__set,
	rhonojs__ready__wait,
} from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('rhonojs__build_id', ()=>{
	equal(rhonojs__build_id$_(app_ctx)(), undefined)
	equal(rhonojs__build_id_(app_ctx), undefined)
	build_id__refresh()
	equal(typeof build_id_(app_ctx), 'string')
	rhonojs__build_id__set(app_ctx, build_id_(app_ctx)!)
	equal(rhonojs__build_id$_(app_ctx)(), build_id_(app_ctx)!)
	equal(rhonojs__build_id_(app_ctx), build_id_(app_ctx)!)
	// @ts-expect-error TS2345
	throws(()=>rhonojs__build_id$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>rhonojs__build_id_(ctx_()))
})
test('rhonojs__ready__wait', async ()=>{
	let done = false
	const [
		plugin__ready$_,
		,
		plugin__ready__set
	] = ns_be_sig_triple_(
		'app',
		()=>false)
	rebuildjs__ready__add(plugin__ready$_)
	rhonojs__ready__wait().then(()=>done = true)
	equal(done, false)
	const build_id = server__metafile0.build_id!
	build_id__set(app_ctx, build_id)
	await sleep(0)
	equal(done, false)
	server__metafile__set(app_ctx, server__metafile0)
	await sleep(0)
	equal(done, false)
	browser__metafile__set(app_ctx, browser__metafile0)
	await sleep(0)
	equal(done, false)
	rebuildjs__esbuild__build_id__set(app_ctx, build_id)
	await sleep(0)
	equal(done, false)
	rhonojs__build_id__set(app_ctx, build_id)
	await sleep(0)
	equal(done, false)
	plugin__ready__set(app_ctx, true)
	await sleep(0)
	equal(done, false)
	rebuildjs__build_id__set(app_ctx, build_id)
	await sleep(0)
	equal(done, true)
})
test('rhonojs__ready__wait|timeout', async ()=>{
	let err:Error|undefined = undefined
	try {
		await rhonojs__ready__wait(0)
	} catch (_err) {
		err = _err as Error
	}
	equal(err!.message, 'Timeout 0ms')
})
test.run()

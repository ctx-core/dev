import { file_exists_, file_exists__waitfor } from 'ctx-core/fs'
import {
	calling,
	memo_,
	ns_id_be_memo_pair_,
	ns_id_be_sig_triple_,
	nullish__none_,
	off,
	promise__cancel,
	promise__cancel__throw,
	ref__bind,
	rmemo__wait,
	run,
	tup
} from 'ctx-core/rmemo'
import { Hono } from 'hono'
import { dirname, join } from 'node:path'
import {
	app__relative_path_,
	app_ctx,
	browser__metafile$_,
	build_id_,
	cwd_,
	metafile__wait,
	port_,
	server__metafile_,
	server__output_,
	server__output__relative_path_,
	server__output__relative_path_M_middleware_ctx_
} from 'rebuildjs/server'
export const [
	app$_,
	app_,
	app__set
] = ns_id_be_sig_triple_(
	'app',
	'app',
	()=>undefined)
export const [
	server_entry__relative_path$_,
	server_entry__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'server_entry__relative_path',
	ctx=>
		join(app__relative_path_(ctx), 'index.ts'))
export const [
	server_entry__output__relative_path$_,
	server_entry__output__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'server_entry__output__relative_path',
	ctx=>
		nullish__none_(tup(server__metafile_(ctx), server_entry__relative_path_(ctx)),
			(server__metafile, server_entry__relative_path)=>{
				const { outputs } = server__metafile
				for (const output_path in outputs) {
					const output = outputs[output_path]
					if (output.entryPoint === server_entry__relative_path) return output_path
				}
			}))
export const [
	server_entry__output__path$_,
	server_entry__output__path_,
] = ns_id_be_memo_pair_(
	'app',
	'server_entry__output__path',
	ctx=>
		nullish__none_(tup(cwd_(ctx), server_entry__output__relative_path_(ctx)),
			(cwd, server_entry__output__relative_path)=>
				join(cwd, server_entry__output__relative_path)))
export const [
	server_entry__output__link__path$_,
	server_entry__output__link__path_,
] = ns_id_be_memo_pair_(
	'app',
	'server_entry__output__link__path',
	ctx=>
		nullish__none_([server_entry__output__path_(ctx)],
			server_entry__output__path=>
				join(dirname(server_entry__output__path), 'index.js')))
/**
 * @param {Hono}[app]
 * @returns {Promise<Hono>}
 */
export async function app__attach(app) {
	await metafile__wait(app_ctx)
	const neq_undefined = val=>val !== undefined
	await rmemo__wait(browser__metafile$_(app_ctx), neq_undefined)
	const app$ = app$__new()
	const val = await rmemo__wait(app$, app=>app, 10_000)
	if (val instanceof Error) {
		throw val
	}
	return val
	function app$__new() {
		return calling(memo_(app$=>{
			app ??= new Hono()
			app._rhonojs = 1
			const build_id = build_id_(app_ctx)
			const server__output__relative_path_M_middleware_ctx = server__output__relative_path_M_middleware_ctx_(app_ctx)
			const middleware_a1 = []
			run(async ()=>{
				for (
					const middleware_ctx of server__output__relative_path_M_middleware_ctx.values()
				) {
					const output = server__output_(middleware_ctx)
					if (!output) {
						return
					}
					if (output.entryPoint !== server_entry__relative_path_(app_ctx)) {
						await file_exists__waitfor(async ()=>{
							const path = join(cwd_(app_ctx), server__output__relative_path_(middleware_ctx))
							if (!await cmd(file_exists_(path))) {
								return false
							}
							const server__middleware_ =
								await cmd(import(path).then(mod=>mod.default))
							if (server__middleware_) {
								middleware_a1.push(server__middleware_(middleware_ctx))
							} else {
								console.warn('module ' + path + ' does not export a default function')
								return false
							}
							return true
						})
					}
				}
				for (const middleware of middleware_a1) {
					if (middleware instanceof Hono || (middleware && typeof middleware.fetch === 'function' && typeof middleware.route === 'function')) {
						app.route('/', middleware)
					} else {
						app.use(middleware)
					}
				}
				app$.set(app)
			}).catch(err=>{
				app$.set(err)
			})
			return app$.val
			async function cmd(promise) {
				if (cancel_()) promise__cancel__throw(promise)
				if (!promise) return promise
				ref__bind(promise, calling(memo_(rhonojs_cancel$=>{
					if (cancel_()) {
						promise__cancel(promise)
						off(rhonojs_cancel$)
					}
				})))
				const ret = await promise
				if (cancel_()) promise__cancel__throw(promise)
				return ret
			}
			function cancel_() {
				return (
					build_id_(app_ctx) !== build_id
					|| server__output__relative_path_M_middleware_ctx_(app_ctx) !== server__output__relative_path_M_middleware_ctx
				)
			}
		}))
	}
}
/**
 * @param {Hono}[app]
 * @returns {Promise<Hono>}
 */
export async function app__start(app) {
	if (!app?._rhonojs) {
		app = await app__attach(app)
	}
	app__set(app_ctx, app)
	const port = port_(app_ctx)
	Bun.serve({
		port,
		fetch: app.fetch,
	})
	console.info(`server started on port ${port}`)
	return app
}

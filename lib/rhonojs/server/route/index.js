/// <reference types="./index.d.ts" />
import { html_route_ as _html_route_, request_ctx__new } from 'rebuildjs/server'
import { hono_context__set } from '../hono/index.js'
export { html_response__new } from 'rebuildjs/server'
/**
 * @param {middleware_ctx_T}middleware_ctx
 * @param {($p:{ ctx:request_ctx_T })=>(string|ReadableStream<string|Uint8Array>)}page_
 * @param {ResponseInit}[response_init]
 * @returns {(c:Context)=>Response}
 */
export function html_route_(
	middleware_ctx,
	page_,
	response_init
) {
	return _html_route_(middleware_ctx, page_, request_ctx__ensure, response_init)
}
/**
 * @param {middleware_ctx_T}middleware_ctx
 * @param {Context}c
 */
export function request_ctx__ensure(
	middleware_ctx,
	c,
) {
	let request_ctx = c.get('request_ctx')
	if (!request_ctx) {
		request_ctx = request_ctx__new(middleware_ctx)
		c.set('request_ctx', request_ctx)
	}
	hono_context__set(request_ctx, c)
	return request_ctx
}

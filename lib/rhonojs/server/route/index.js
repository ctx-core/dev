/// <reference types="./index.d.ts" />
import { request_ctx__new } from 'rebuildjs/server'
import { hono_context__set } from '../hono/index.js'
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
	return c=>{
		const request_ctx = request_ctx__ensure(middleware_ctx, c)
		return html_response__new(
			page_({ ctx: request_ctx }),
			response_init)
	}
}
/**
 * @param {string|ReadableStream}html_OR_stream
 * @param {ResponseInit}[response_init]
 * @returns {Response}
 */
export function html_response__new(
	html_OR_stream,
	response_init
) {
	const headers = new Headers(response_init?.headers)
	headers.set('Content-Type', 'text/html;charset=UTF-8')
	return new Response(
		html_OR_stream.pipeTo
			? html_OR_stream.pipeThrough(new TextEncoderStream())
			: new ReadableStream({
				start(controller) {
					controller.enqueue('' + html_OR_stream)
					controller.close()
				}
			}),
		{
			...(response_init ?? {}),
			headers
		}
	)
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

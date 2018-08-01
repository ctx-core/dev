import { assign } from '@ctx-core/object/lib.mjs'
import { fetch } from '@ctx-core/fetch/lib.mjs'
import { ensure__agent__fetch } from './fetch.mjs'
import { _ContentType__json } from '@ctx-core/http/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/agent/rpc.mjs'
export function ensure__agent__rpc(ctx, ...ARR__ctx__agent) {
	log(`${logPrefix}|ensure__agent__rpc`)
	return ensure__agent__fetch(ctx, {
		reset,
		reset__rpc,
		_ctx__rpc,
		reset__fetch__set
	}, ...ARR__ctx__agent)
}
export async function reset__rpc() {
	log(`${logPrefix}|reset__rpc`)
	const agent = this
	let ctx__rpc = agent._ctx__rpc({ rpc: agent.rpc }, ...arguments)
	let ctx__fetch = {
		body: JSON.stringify(ctx__rpc)
	}
	return agent.reset__fetch(ctx__fetch)
}
export const reset = reset__rpc
export function _ctx__rpc() {
	log(`${logPrefix}|_ctx__rpc`)
	return assign(...arguments)
}
export async function reset__fetch__set(ctx__fetch) {
	log(`${logPrefix}|reset__fetch__set`)
	const agent = this
	const { ctx } = agent
	const response = await post__http__rpc(ctx, ctx__fetch)
	const { status } = response || {}
	if (status === 404) {
		agent.clear()
		return
	}
	const ctx__set = await response.json()
	return agent.set(ctx__set)
}
// TODO: Extract authentication
export async function post__http__rpc(ctx, ctx__fetch) {
	log(`${logPrefix}|post__http__rpc`)
	return fetch(
		'/rpc',
		assign(
			{ method: 'POST' },
			ctx__fetch,
			{
				headers:
					assign(
						_ContentType__json(),
						ctx__fetch.headers
					)
			}))
}
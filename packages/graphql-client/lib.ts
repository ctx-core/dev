import { assign } from '@ctx-core/object'
import { _has__dom } from '@ctx-core/dom'
import { fetch } from '@ctx-core/fetch'
export function _fetch__graphql(url, headers__1 = {}, http_opts__1 = {}) {
	return async function fetch__graphql(body, headers__2 = {}, http_opts__2 = {}) {
		const response = await fetch(url, assign({
			method: 'POST',
			headers: assign({
				'Content-Type': 'application/json',
			}, headers__1, headers__2),
			body,
		}, http_opts__1, http_opts__2))
		if (!response.ok) {
			throw `Error fetching graphql`
		}
		const payload = await response.json()
		if (payload.errors) throw payload
		return payload
	}
}
export function _url__graphql(host = '127.0.0.1') {
	if (_has__dom()) return '/graphql'
	const host_port = `${host}${_txt__port__graphql()}`
	return `http://${host_port}/graphql`
}
export function _txt__port__graphql(port = process.env.PORT) {
	return (port || 80) === 80 ? '' : `:${port}`
}
export const fetch__graphql = _fetch__graphql(
	_url__graphql(),
)

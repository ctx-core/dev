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
		return response.json()
	}
}
export function _url__graphql() {
	return (
		_has__dom()
		? '/graphql'
		: `http://127.0.0.1:${process.env.PORT}/graphql`
	)
}
export const fetch__graphql = _fetch__graphql(
	_url__graphql(),
)

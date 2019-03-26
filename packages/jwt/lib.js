import { _atob } from '@ctx-core/atob/lib.js'
import { throw__bad_credentials } from '@ctx-core/error'
import { _now__millis } from '@ctx-core/time'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/jwt'
export function _token__jwt__authorization__header(authorization) {
	const ARR__authorization = authorization && authorization.split(/^Bearer */)
	const token__jwt = ARR__authorization && ARR__authorization[1]
	return token__jwt
}
export function validate__current__jwt(token__jwt) {
	log(`${logPrefix}|validate__current__jwt`)
	const exp__token__jwt = _exp__token__jwt(token__jwt)
	const exp__token__jwt__millis = exp__token__jwt * 1000
	const now__millis = _now__millis()
	if (now__millis > exp__token__jwt__millis) {
		throw__bad_credentials({ token__jwt }, {
			error_message:
				'Expired token__jwt'
		})
	}
}
export function _exp__token__jwt(token__jwt) {
	const atob = _atob()
	const data__jwt = token__jwt && JSON.parse(atob(token__jwt.split('.')[1]))
	const exp = data__jwt && data__jwt.exp
	return exp
}
import { _atob } from 'ctx-core/atob/lib.mjs'
import { throw__bad_credentials } from 'ctx-core/error/lib.mjs'
import { _now__millis } from 'ctx-core/time/lib.mjs'
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/jwt/lib.mjs'
export function _token__jwt__authorization__header(authorization__header) {
	const ARR__authorization__header =
		authorization__header
		&& authorization__header.split(/^Bearer */)
	const token__jwt =
		ARR__authorization__header
		&& ARR__authorization__header[1]
	return token__jwt
}
export function validate__current__jwt(token__jwt) {
	log(`${logPrefix}|validate__current__jwt`)
	const exp__token__jwt = _exp__token__jwt(token__jwt)
	const exp__token__jwt__millis =
		exp__token__jwt * 1000
	const now__millis = _now__millis()
	if (now__millis > exp__token__jwt__millis) {
		throw__bad_credentials(ctx, {
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
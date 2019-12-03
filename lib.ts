import { _atob } from '@ctx-core/atob'
import { throw__bad_credentials } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/jwt/lib'
export type Token = {
	error?:any
	id_token?:string
}
export function _token__jwt__authorization__header(authorization) {
	const a1__authorization = authorization && authorization.split(/^Bearer */)
	return a1__authorization && a1__authorization[1]
}
export function validate__current__jwt(token__jwt) {
	log(`${logPrefix}|validate__current__jwt`)
	const exp__token__jwt = _exp__token__jwt(token__jwt)
	const millis__exp__token__jwt = exp__token__jwt * 1000
	if (Date.now() > millis__exp__token__jwt) {
		throw__bad_credentials({ token__jwt }, {
			error_message:
				'Session Expired'
		})
	}
}
export function _exp__token__jwt(token__jwt) {
	const atob = _atob()
	const data__jwt = token__jwt && JSON.parse(atob(token__jwt.split('.')[1]))
	return data__jwt && data__jwt.exp
}

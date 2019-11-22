import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/email'
export function _valid__email(email) {
	log(`${logPrefix}|valid__email`)
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}
export const validate__email = _valid__email

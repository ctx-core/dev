import { assign } from '@ctx-core/object'
import { _valid__email } from '@ctx-core/email'
import { validate__current__jwt } from '@ctx-core/jwt'
import { throw__bad_gateway } from '@ctx-core/error'
import { log, debug, error } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/lib.js'
export function validate__signup(form) {
	const error__email = validate__email(form)
	const error__password_confirmation = validate__password_confirmation(form)
	const error__signup = {}
	let has__errors
	if (error__email || error__password_confirmation) {
		has__errors = true
		assign(error__signup, error__email, error__password_confirmation)
	}
	return has__errors && error__signup
}
export function validate__forgot_password(form) {
	return validate__email(form)
}
export function validate__change_password(form) {
	return validate__password_confirmation(form)
}
export function validate__email(form) {
	const { email } = form
	const error__email = {}
	let has__errors
	// if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
	//	 error__signup.password = 'Your password must be at least 8 characters and contain at least one upper case letter, one lower case letter, and one number.'
	//	 has__errors = true
	// }
	if (!_valid__email(email)) {
		error__email.email = 'Please enter a valid email address.'
		has__errors = true
	}
	return has__errors && error__email
}
export function validate__password_confirmation(form) {
	const {
		password,
		password_confirmation
	} = form
	const error__change_password = {}
	let has__errors
	if (password != password_confirmation) {
		error__change_password.password_confirmation = 'Your passwords do not match.'
		has__errors = true
	}
	return has__errors && error__change_password
}
export async function validate__current__token__auth0(token__auth0) {
	log(`${logPrefix}|validate__current__token__auth0`)
	const id_token = token__auth0 && token__auth0.id_token
	validate__current__jwt(id_token)
}
export function _user_id(decoded__token__jwt) {
	return (
		decoded__token__jwt
		&& (decoded__token__jwt.user_id
			|| decoded__token__jwt.sub)
	)
}
export function validate__user(user) {
	if (user && user.error) {
		error(`${logPrefix}|validate__user`)
		error(`${user.statusCode} ${user.error}`)
		error(user.message)
	}
	if (!user || !user.user_id) {
		throw__bad_gateway(user, {
			status__http: user.statusCode
		})
	}
}

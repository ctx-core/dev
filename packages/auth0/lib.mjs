import { assign } from '@ctx-core/object/lib.mjs'
import { valid__email } from '@ctx-core/email/lib.mjs'
import { validate__current__jwt } from '@ctx-core/jwt/lib.mjs'
import { throw__bad_gateway } from '@ctx-core/error/lib.mjs'
import { log, debug, error } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/lib.mjs'
export function validate__signup(form) {
	const errors__email = validate__email(form)
	const errors__password_confirmation = validate__password_confirmation(form)
	const errors__signup = {}
	let has__errors
	if (errors__email || errors__password_confirmation) {
		has__errors = true
		assign(errors__signup, errors__email, errors__password_confirmation)
	}
	return has__errors && errors__signup
}
export function validate__forgot_password(form) {
	return validate__email(form)
}
export function validate__change_password(form) {
	return validate__password_confirmation(form)
}
export function validate__email(form) {
	const { email } = form
	const errors__email = {}
	let has__errors
	// if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
	//	 errors__signup.password = 'Your password must be at least 8 characters and contain at least one upper case letter, one lower case letter, and one number.'
	//	 has__errors = true
	// }
	if (!valid__email(email)) {
		errors__email.email = 'Please enter a valid email address.'
		has__errors = true
	}
	return has__errors && errors__email
}
export function validate__password_confirmation(form) {
	const {
		password,
		password_confirmation
	} = form
	const errors__change_password = {}
	let has__errors
	if (password != password_confirmation) {
		errors__change_password.password_confirmation = 'Your passwords do not match.'
		has__errors = true
	}
	return has__errors && errors__change_password
}
export async function validate__current__token__auth0({ token__auth0 }) {
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
export function validate__user(user, ctx__request) {
	if (user.error) {
		error(`${logPrefix}|validate__user`)
		error(`${user.statusCode} ${user.error}`)
		error(user.message)
		error(JSON.stringify(ctx__request, null, 2))
	}
	if (!user.user_id) {
		throw__bad_gateway(ctx__request, {
			status__http: user.statusCode
		})
	}
}
export function _AUTH0_DOMAIN(ctx) {
  return (ctx && ctx.AUTH0_DOMAIN) || process.env.AUTH0_DOMAIN
}

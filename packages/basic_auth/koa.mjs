import { throw__error } from '@ctx-core/error/lib.mjs'
import basic_auth__koa from 'koa-basic-auth'
import env from './env.mjs'
import { log, error, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/basic_auth/koa.mjs'
export function use__basic_auth(app) {
	log(`${logPrefix}|use__basic_auth`)
	app.use(basic_auth)
	app.use(
		basic_auth__koa(
			{
				name: env.BASIC_AUTH_LOGIN,
				pass: env.BASIC_AUTH_PASSWORD
			}))
	async function basic_auth(ctx, next) {
		log(`${logPrefix}|use__basic_auth|basic_auth`)
		try {
			await next
		} catch (ctx__error) {
			error(`${logPrefix}|use__basic_auth|basic_auth|error`, ctx__error)
			const { status__http } = ctx__error
			if (
				401 == status__http
				|| ctx__error.toString() === 'UnauthorizedError: Unauthorized'
			) {
				ctx.status = parseInt(status__http) || 401
				ctx.set('WWW-Authenticate', 'Basic')
				ctx.body = 'unauthorized'
			} else {
				throw__error(ctx, ctx__error)
			}
		}
	}
}
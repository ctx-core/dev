import env from 'ctx-core/env.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth/lib.mjs'
export function assign__assert__authorization() {
	log(`${logPrefix}|assign__assert__authorization`)
	assert__array__fn__authorization().push(...arguments)
}
export async function assert__authorization(ctx, ...rest) {
	log(`${logPrefix}|assert__authorization`)
	await Promise.all(
		assert__array__fn__authorization().map(
			assert__authorization =>
				assert__authorization(ctx, ...rest)))
}
export function assert__array__fn__authorization() {
	env.assert__array__fn__authorization =
		env.assert__array__fn__authorization
		|| []
	return env.assert__array__fn__authorization
}
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth/lib.js'
export function assign__assert__authorization() {
	log(`${logPrefix}|assign__assert__authorization`)
	assert__ARR__fn__authorization().push(...arguments)
}
export async function assert__authorization(ctx, ...rest) {
	log(`${logPrefix}|assert__authorization`)
	await Promise.all(
		assert__ARR__fn__authorization().map(
			assert__authorization =>
				assert__authorization(ctx, ...rest)))
}
export function assert__ARR__fn__authorization() {
	return process.env.assert__ARR__fn__authorization || []
}
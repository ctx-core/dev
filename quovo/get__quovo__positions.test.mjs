#!/usr/bin/env babel-node
import { promise__catch } from 'ctx-core/promise/lib.mjs'
import env from 'ctx-core/quovo/env.mjs'
import { get__positions__quovo } from 'ctx-core/quovo/rpc.mjs'
import { assert__equal } from 'ctx-core/test/asserts.mjs'
import { log, info, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/get__positions__quovo.test.mjs'
let ctx = {}
promise__catch(ctx, async () => {
	log(`${logPrefix}|co`)
	const ctx = {}
	await get__positions__quovo(ctx, {
		user_id__quovo: env.QUOVO_USER_ID_DEMO
	})
	assert__equal({ actual: env.QUOVO_USER_ID_DEMO > 0, expected: true })
	assert__equal({ actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO })
	const { positions__quovo } = ctx
	assert__equal({ actual: positions__quovo.length > 0, expected: true })
	info(JSON.stringify(positions__quovo))
	return ctx
})
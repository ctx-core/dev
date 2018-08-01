#!/usr/bin/env babel-node
import { promise__catch } from '@ctx-core/promise/lib.mjs'
import 'ctx-core/quovo/env.mjs'
import { get__users__quovo } from 'ctx-core/quovo/rpc.mjs'
import { assert__equal } from '@ctx-core/test/asserts.mjs'
import { log, info, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/get__users__quovo.test.mjs'
let ctx = {}
promise__catch(ctx, async () => {
	log(`${logPrefix}|co`)
	await get__users__quovo(ctx)
	const { users__quovo } = ctx
	assert__equal({ actual: users__quovo.length > 0, expected: true })
	info(JSON.stringify(users__quovo))
	return ctx
})
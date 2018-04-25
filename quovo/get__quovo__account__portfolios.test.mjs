#!/usr/bin/env babel-node
import {promise__catch} from 'ctx-core/promise/lib.mjs'
import env from 'ctx-core/quovo/env.mjs'
import {get__quovo__account__portfolios} from 'ctx-core/quovo/rpc.mjs'
import {assert__equal} from 'ctx-core/test/asserts.mjs'
import {log,info,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/get__quovo__account__portfolios.test.mjs'
let ctx = {}
promise__catch(ctx, async () => {
	log(`${logPrefix}|co`)
	let ctx = {}
	await get__quovo__account__portfolios(ctx, {
		user_id__quovo: env.QUOVO_USER_ID_DEMO
	})
	assert__equal(
		{ actual: env.QUOVO_USER_ID_DEMO > 0,
			expected: true})
	assert__equal(
		{ actual: ctx.user_id__quovo,
			expected: env.QUOVO_USER_ID_DEMO})
	const {quovo__account__portfolios} = ctx
	assert__equal(
		{ actual: quovo__account__portfolios.length > 0,
			expected: true})
	info(JSON.stringify(quovo__account__portfolios))
	return ctx
})
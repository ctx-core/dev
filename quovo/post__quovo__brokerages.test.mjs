#!/usr/bin/env babel-node
import {promise__catch} from 'ctx-core/promise/lib.mjs'
import env from 'ctx-core/quovo/env.mjs'
import {post__brokerages__quovo} from 'ctx-core/quovo/rpc.mjs'
import {assert__equal} from 'ctx-core/test/asserts.mjs'
import {log,info,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/post__brokerages__quovo.test.mjs'
let ctx = {}
promise__catch(ctx, async () => {
	log(`${logPrefix}|co`)
	let ctx = {}
	await post__brokerages__quovo(ctx, {
		user_id__quovo: env.QUOVO_USER_ID_DEMO
	})
	assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true})
	assert__equal({actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO})
	const {brokerages__quovo} = ctx
	assert__equal({actual: brokerages__quovo.length > 0, expected: true})
	info(JSON.stringify(brokerages__quovo))
	return ctx
})
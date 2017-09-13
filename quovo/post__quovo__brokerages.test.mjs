#!/usr/bin/env babel-node
import {promise$catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {post__brokerages__quovo} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/post__brokerages__quovo.test'
let ctx = {}
promise$catch(ctx, async () => {
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
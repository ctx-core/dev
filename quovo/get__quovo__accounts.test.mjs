#!/usr/bin/env babel-node
import {promise$catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {get__accounts__quovo} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/get__accounts__quovo.test'
let ctx = {}
promise$catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await get__accounts__quovo(ctx, {
    user_id__quovo: env.QUOVO_USER_ID_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true, error_message$header: 'env.QUOVO_USER_ID_DEMO > 0'})
  assert__equal({actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO, error_message$header: 'ctx.user_id__quovo == env.QUOVO_USER_ID_DEMO'})
  const {accounts__quovo} = ctx
  assert__equal({actual: accounts__quovo.length > 0, expected: true, error_message$header: 'accounts__quovo.length > 0'})
  info(JSON.stringify(accounts__quovo))
  return ctx
})
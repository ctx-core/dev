#!/usr/bin/env babel-node
import {promise$catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {post__accounts__quovo} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/post__accounts__quovo.test'
let ctx = {}
promise$catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await post__accounts__quovo(ctx, {
    user_id__quovo: env.QUOVO_USER_ID_DEMO,
    brokerage_id__quovo: env.QUOVO_BROKERAGE_ID_DEMO,
    brokerage__quovo$username: env.QUOVO_BROKERAGE_USERNAME_DEMO,
    brokerage__quovo$password: env.QUOVO_BROKERAGE_PASSWORD_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true, error_message$header: 'env.QUOVO_USER_ID_DEMO > 0'})
  assert__equal({actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO, error_message$header: 'ctx.user_id__quovo'})
  const {quovo__account} = ctx
  assert__equal({actual: quovo__account, expected: true, error_message$header: 'quovo__account'})
  info(JSON.stringify(quovo__account))
  return ctx
})
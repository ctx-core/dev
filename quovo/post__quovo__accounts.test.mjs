#!/usr/bin/env babel-node
import {promise__catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {post__accounts__quovo} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/post__accounts__quovo.test.mjs'
let ctx = {}
promise__catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await post__accounts__quovo(ctx, {
    user_id__quovo: env.QUOVO_USER_ID_DEMO,
    brokerage_id__quovo: env.QUOVO_BROKERAGE_ID_DEMO,
    username__brokerage__quovo: env.QUOVO_BROKERAGE_USERNAME_DEMO,
    password__brokerage__quovo: env.QUOVO_BROKERAGE_PASSWORD_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true, header__error_message: 'env.QUOVO_USER_ID_DEMO > 0'})
  assert__equal({actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO, header__error_message: 'ctx.user_id__quovo'})
  const {quovo__account} = ctx
  assert__equal({actual: quovo__account, expected: true, header__error_message: 'quovo__account'})
  info(JSON.stringify(quovo__account))
  return ctx
})
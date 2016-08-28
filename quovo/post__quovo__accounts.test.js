#!/usr/bin/env babel-node
import {promise$catch__co} from 'ctx-core/co/lib'
import env from 'ctx-core/quovo/env'
import {post__quovo__accounts} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/post__quovo__accounts.test'
let ctx = {}
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`)
  let ctx = {}
  yield post__quovo__accounts(ctx, {
    quovo__user_id: env.QUOVO_USER_ID_DEMO,
    quovo$brokerage$id: env.QUOVO_BROKERAGE_ID_DEMO,
    quovo$brokerage$username: env.QUOVO_BROKERAGE_USERNAME_DEMO,
    quovo$brokerage$password: env.QUOVO_BROKERAGE_PASSWORD_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true, error_message$header: 'env.QUOVO_USER_ID_DEMO > 0'})
  assert__equal({actual: ctx.quovo__user_id, expected: env.QUOVO_USER_ID_DEMO, error_message$header: 'ctx.quovo__user_id'})
  const {quovo__account} = ctx
  assert__equal({actual: quovo__account, expected: true, error_message$header: 'quovo__account'})
  info(JSON.stringify(quovo__account))
  return ctx
})
#!/usr/bin/env babel-node
import {promise__catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {get__quovo__account__portfolios} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/get__quovo__account__portfolios.test'
let ctx = {}
promise__catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await get__quovo__account__portfolios(ctx, {
    user_id__quovo: env.QUOVO_USER_ID_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true})
  assert__equal({actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO})
  const {quovo__account__portfolios} = ctx
  assert__equal({actual: quovo__account__portfolios.length > 0, expected: true})
  info(JSON.stringify(quovo__account__portfolios))
  return ctx
})
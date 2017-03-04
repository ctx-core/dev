#!/usr/bin/env babel-node
import {promise$catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {get__portfolio_history__quovo} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/get__portfolio_history__quovo.test'
let ctx = {}
promise$catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await get__portfolio_history__quovo(ctx, {
    portfolio_id__quovo: env.QUOVO_PORTFOLIO_ID_DEMO
  })
  assert__equal({actual: env.QUOVO_PORTFOLIO_ID_DEMO >= 0, expected: true, error_message$header: 'env.QUOVO_PORTFOLIO_ID_DEMO >= 0'})
  assert__equal({actual: ctx.portfolio_id__quovo, expected: env.QUOVO_PORTFOLIO_ID_DEMO, error_message$header: 'ctx.portfolio_id__quovo == env.QUOVO_PORTFOLIO_ID_DEMO'})
  const {portfolio_history__quovo} = ctx
  assert__equal({actual: portfolio_history__quovo.length > 0, expected: true, error_message$header: 'portfolio_history__quovo.length > 0'})
  info(JSON.stringify(portfolio_history__quovo))
  return ctx
})
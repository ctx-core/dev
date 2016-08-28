#!/usr/bin/env babel-node
import {promise$catch__co} from 'ctx-core/co/lib'
import env from 'ctx-core/quovo/env'
import {get__quovo__portfolio__history} from 'ctx-core/quovo/rpc'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/get__quovo__portfolio__history.test'
let ctx = {}
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`)
  let ctx = {}
  yield get__quovo__portfolio__history(ctx, {
    quovo__portfolio_id: env.QUOVO_PORTFOLIO_ID_DEMO
  })
  assert__equal({actual: env.QUOVO_PORTFOLIO_ID_DEMO >= 0, expected: true, error_message$header: 'env.QUOVO_PORTFOLIO_ID_DEMO >= 0'})
  assert__equal({actual: ctx.quovo__portfolio_id, expected: env.QUOVO_PORTFOLIO_ID_DEMO, error_message$header: 'ctx.quovo__portfolio_id == env.QUOVO_PORTFOLIO_ID_DEMO'})
  const {quovo__portfolio__history} = ctx
  assert__equal({actual: quovo__portfolio__history.length > 0, expected: true, error_message$header: 'quovo__portfolio__history.length > 0'})
  info(JSON.stringify(quovo__portfolio__history))
  return ctx
})
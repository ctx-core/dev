#!/usr/bin/env babel-node
import {flatten__array} from 'ctx-core/array/lib'
import env from 'ctx-core/quovo/env'
import {promise$catch__co} from 'ctx-core/co/lib'
import fsp from 'fs-promise'
import {export__quovo__data} from './rpc'
import path from 'path'
import {log,info,debug} from 'ctx-core/logger/lib'
const outputDir = path.resolve(__dirname, 'data')
    , logPrefix = 'ctx-core/quovo-demo/export__quovo__data.test'
let ctx = {
  quovo__user_id: env.QUOVO_USER_ID_DEMO,
  quovo__account_id: env.QUOVO_ACCOUNT_ID_DEMO
}
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`)
  yield export__quovo__data(ctx)
  yield fsp.mkdirp(outputDir)
  yield fsp.remove(`${outputDir}/*`)
  yield flatten__array([
    json$write$file(
      ctx.quovo__accounts,
      `${outputDir}/accounts.json`),
    json$write$file(
      ctx.quovo__brokerages,
      `${outputDir}/brokerages.json`),
    json$write$file(
      ctx.quovo__portfoliosctx$$
        .map(
          o => o.quovo__portfolio),
      `${outputDir}/portfolios.json`),
    ctx.quovo__portfoliosctx$$.map(quovo__portfolio$ctx => {
      let quovo__portfolio_id = quovo__portfolio$ctx.quovo__portfolio_id
      return [
        json$write$file(
          quovo__portfolio$ctx.quovo__portfolio,
          `${outputDir}/portfolio.${quovo__portfolio_id}.json`),
        json$write$file(
          quovo__portfolio$ctx.quovo__portfolio__history,
          `${outputDir}/portfolio.${quovo__portfolio_id}.history.json`)
      ]
    }),
    json$write$file(
      ctx.quovo__positions,
      `${outputDir}/positions.json`),
    json$write$file(
      ctx.quovo__users,
      `${outputDir}/users.json`)
  ])
  return ctx
})
function *json$write$file($, file$path) {
  info(`${logPrefix}|json$write$file`, file$path)
  const $json = JSON.stringify($, null, 2)
  return yield fsp.writeFile(file$path, $json)
}
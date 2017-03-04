#!/usr/bin/env babel-node
import {flatten__array} from 'ctx-core/array/lib'
import env from 'ctx-core/quovo/env'
import {promise$catch} from 'ctx-core/promise/lib'
import fsp from 'fs-promise'
import {export__quovo__data} from './rpc'
import path from 'path'
import {log,info,debug} from 'ctx-core/logger/lib'
const outputDir = path.resolve(__dirname, 'data')
    , logPrefix = 'ctx-core/quovo-demo/export__quovo__data.test'
let ctx = {
  user_id__quovo: env.QUOVO_USER_ID_DEMO,
  account_id__quovo: env.QUOVO_ACCOUNT_ID_DEMO
}
promise$catch(ctx, (async () => {
  log(`${logPrefix}|co`)
  await export__quovo__data(ctx)
  await fsp.mkdirp(outputDir)
  await fsp.remove(`${outputDir}/*`)
  await Promise.all(flatten__array([
    json$write$file(
      ctx.accounts__quovo,
      `${outputDir}/accounts.json`),
    json$write$file(
      ctx.brokerages__quovo,
      `${outputDir}/brokerages.json`),
    json$write$file(
      ctx.ctx__portfolios__quovo$$
        .map(
          o => o.portfolio__quovo),
      `${outputDir}/portfolios.json`),
    ctx.ctx__portfolios__quovo$$.map(ctx__portfolio__quovo => {
      let portfolio_id__quovo = ctx__portfolio__quovo.portfolio_id__quovo
      return [
        json$write$file(
          ctx__portfolio__quovo.portfolio__quovo,
          `${outputDir}/portfolio.${portfolio_id__quovo}.json`),
        json$write$file(
          ctx__portfolio__quovo.portfolio_history__quovo,
          `${outputDir}/portfolio.${portfolio_id__quovo}.history.json`)
      ]
    }),
    json$write$file(
      ctx.positions__quovo,
      `${outputDir}/positions.json`),
    json$write$file(
      ctx.users__quovo,
      `${outputDir}/users.json`)
  ]))
  return ctx
})())
function json$write$file($, file$path) {
  info(`${logPrefix}|json$write$file`, file$path)
  const $json = JSON.stringify($, null, 2)
  return fsp.writeFile(file$path, $json)
}
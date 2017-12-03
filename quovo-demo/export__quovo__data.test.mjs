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
    write__file__json(
      ctx.accounts__quovo,
      `${outputDir}/accounts.json`),
    write__file__json(
      ctx.brokerages__quovo,
      `${outputDir}/brokerages.json`),
    write__file__json(
      ctx.array__ctx__portfolio__quovo
        .map(
          o => o.portfolio__quovo),
      `${outputDir}/portfolios.json`),
    ctx.array__ctx__portfolio__quovo.map(
      ctx__portfolio__quovo => {
        let portfolio_id__quovo = ctx__portfolio__quovo.portfolio_id__quovo
        return [
          write__file__json(
            ctx__portfolio__quovo.portfolio__quovo,
            `${outputDir}/portfolio.${portfolio_id__quovo}.json`),
          write__file__json(
            ctx__portfolio__quovo.portfolio_history__quovo,
            `${outputDir}/portfolio.${portfolio_id__quovo}.history.json`)
        ]}),
    write__file__json(
      ctx.positions__quovo,
      `${outputDir}/positions.json`),
    write__file__json(
      ctx.users__quovo,
      `${outputDir}/users.json`)
  ]))
  return ctx
})())
function write__file__json(obj, path__file) {
  info(`${logPrefix}|write__file__json`, path__file)
  const json = JSON.stringify(obj, null, 2)
  return fsp.writeFile(path__file, json)
}
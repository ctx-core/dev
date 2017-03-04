#!/usr/bin/env babel-node
import {promise$catch} from 'ctx-core/promise/lib'
import {delegate__rpc} from './lib'
import env from 'ctx-core/env'
import {assert__equal} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/rpc/delegate__rpc.test'
let ctx = {}
/**
 * @test ctx-core/rpc/lib delegate__rpc
 */
promise$catch(ctx, (async () => {
  log(`${logPrefix}|co`)
  ctx = await delegate__rpc({rpc: ['get__accounts__quovo']})
  assert__accounts__quovo(ctx)
  info(JSON.stringify(ctx.accounts__quovo))
  return ctx
})())
function assert__accounts__quovo(ctx) {
  assert__equal({expected: true, actual: env.QUOVO_USER_ID_DEMO > 0})
  assert__equal({expected: env.QUOVO_USER_ID_DEMO, actual: ctx.user_id__quovo})
  const {accounts__quovo} = ctx
  assert__equal({expected: true, actual: accounts__quovo.length > 0})
}
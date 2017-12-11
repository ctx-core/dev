#!/usr/bin/env babel-node
import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/quovo/env'
import {promise__catch} from 'ctx-core/promise/lib'
import {post__users__quovo} from 'ctx-core/quovo/rpc'
import {$user__quovo__demo} from 'ctx-core/quovo/env'
import {assert__equal,message__error__json__multiline} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/post__users__quovo.test'
let ctx = {}
promise__catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  assign(ctx, {
    user__quovoname: env.QUOVO_USERNAME_DEMO
  })
  await post__users__quovo(ctx, {
    data: JSON.stringify($user__quovo__demo(ctx))})
  assert__equal(
    { actual: !!(ctx.user_id__quovo),
      expected: true})
  const {user__quovo} = ctx
  assert__equal(
    { actual: ctx.user_id__quovo,
      expected: user__quovo.id})
  delete user__quovo.id
  delete user__quovo.value
  assert__equal(
    { actual: [user__quovo],
      expected:
        [ { 'username':'censible-test2',
            'phone':null,
            'email':'development@censible.com',
            'name':'Censible Test2'}],
      $error: message__error__json__multiline})
  info(JSON.stringify(user__quovo))
  return ctx
})
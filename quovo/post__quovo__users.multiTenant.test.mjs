#!/usr/bin/env babel-node
import {promise__catch} from 'ctx-core/promise/lib.mjs'
import env from 'ctx-core/quovo/env.mjs'
import {get__users__quovo,post__users__quovo} from 'ctx-core/quovo/rpc.mjs'
import {_user__quovo__demo} from 'ctx-core/quovo/env.mjs'
import {log,info,debug} from 'ctx-core/logger/lib.mjs'
import {assert__equal,message__error__json__multiline} from 'ctx-core/test/asserts.mjs'
const logPrefix = 'ctx-core/quovo/post__users__quovo.multiTenant.test.mjs'
let ctx = {}
promise__catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await get__users__quovo(ctx, {
    user__quovoname: env.QUOVO_USERNAME_DEMO
  })
  const user__quovo__demo = _user__quovo__demo(ctx)
  assert__equal({
    actual: ctx.users__quovo.map(
        user__quovo => user__quovo.username
      ).indexOf(user__quovo__demo.username) > -1,
    expected: true,
    header__error_message: 'ctx.users__quovo.map(u => u.username).indexOf(user__quovo__demo.username) == true'
  })
  await post__users__quovo(ctx, {
    body: JSON.stringify(user__quovo__demo)})
  assert__equal(
    { actual: !!(ctx.user_id__quovo),
      expected: true,
      header__error_message: '!!(ctx.user_id__quovo)'})
  let {user__quovo} = ctx
  assert__equal(
    { actual: ctx.user_id__quovo,
      expected: user__quovo.id,
      header__error_message: 'ctx.user_id__quovo == user__quovo.id'})
  delete user__quovo.id
  delete user__quovo.value
  assert__equal(
    { actual: [user__quovo],
      expected:
        [ { 'username':'censible-test2',
            'phone':null,
            'email':'development@censible.com',
            'name':'Censible Test2'}],
      _error: message__error__json__multiline})
  info(JSON.stringify(user__quovo))
  return ctx
})
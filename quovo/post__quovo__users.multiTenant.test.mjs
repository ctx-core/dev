#!/usr/bin/env babel-node
import {promise__catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {get__users__quovo,post__users__quovo} from 'ctx-core/quovo/rpc'
import {$user__quovo__demo} from 'ctx-core/quovo/env'
import {log,info,debug} from 'ctx-core/logger/lib'
import {assert__equal,error$msg__multiline$json} from 'ctx-core/test/asserts'
const logPrefix = 'ctx-core/quovo/post__users__quovo.multiTenant.test'
let ctx = {}
promise__catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await get__users__quovo(ctx, {
    user__quovoname: env.QUOVO_USERNAME_DEMO
  })
  const user__quovo$body = $user__quovo__demo(ctx)
  assert__equal({
    actual: ctx.users__quovo.map(
        user__quovo => user__quovo.username
      ).indexOf(user__quovo$body.username) > -1,
    expected: true,
    error_message$header: 'ctx.users__quovo.map(u => u.username).indexOf(user__quovo$body.username) == true'
  })
  await post__users__quovo(ctx, {
    body: JSON.stringify(user__quovo$body)})
  assert__equal({actual: !!(ctx.user_id__quovo), expected: true, error_message$header: '!!(ctx.user_id__quovo)'})
  let {user__quovo} = ctx
  assert__equal({actual: ctx.user_id__quovo, expected: user__quovo.id, error_message$header: 'ctx.user_id__quovo == user__quovo.id'})
  delete user__quovo.id
  delete user__quovo.value
  assert__equal({actual: [user__quovo], expected: [
    {'username':'censible-test2','phone':null,'email':'development@censible.com','name':'Censible Test2'}
  ], $error: error$msg__multiline$json})
  info(JSON.stringify(user__quovo))
  return ctx
})
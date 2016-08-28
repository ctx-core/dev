#!/usr/bin/env babel-node
import {promise$catch__co} from 'ctx-core/co/lib'
import env from 'ctx-core/quovo/env'
import {get__quovo__users,post__quovo__users} from 'ctx-core/quovo/rpc'
import {new__quovo__user__demo} from 'ctx-core/quovo/env'
import {log,info,debug} from 'ctx-core/logger/lib'
import {assert__equal,error$msg__multiline$json} from 'ctx-core/test/asserts'
const logPrefix = 'ctx-core/quovo/post__quovo__users.multiTenant.test'
let ctx = {}
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`)
  let ctx = {}
  yield get__quovo__users(ctx, {
    quovo__username: env.QUOVO_USERNAME_DEMO
  })
  const quovo__user$body = new__quovo__user__demo(ctx)
  assert__equal({
    actual: ctx.quovo__users.map(
        quovo__user => quovo__user.username
      ).indexOf(quovo__user$body.username) > -1,
    expected: true,
    error_message$header: 'ctx.quovo__users.map(u => u.username).indexOf(quovo__user$body.username) == true'
  })
  yield post__quovo__users(ctx, {
    body: JSON.stringify(quovo__user$body)})
  assert__equal({actual: !!(ctx.quovo__user_id), expected: true, error_message$header: '!!(ctx.quovo__user_id)'})
  let {quovo__user} = ctx
  assert__equal({actual: ctx.quovo__user_id, expected: quovo__user.id, error_message$header: 'ctx.quovo__user_id == quovo__user.id'})
  delete quovo__user.id
  delete quovo__user.value
  assert__equal({actual: [quovo__user], expected: [
    {'username':'censible-test2','phone':null,'email':'development@censible.com','name':'Censible Test2'}
  ], new__error: error$msg__multiline$json})
  info(JSON.stringify(quovo__user))
  return ctx
})
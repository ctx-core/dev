#!/usr/bin/env babel-node
import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/quovo/env'
import {promise$catch__co} from 'ctx-core/co/lib'
import {post__quovo__users} from 'ctx-core/quovo/rpc'
import {new__quovo__user__demo} from 'ctx-core/quovo/env'
import {assert__equal,error$msg__multiline$json} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/post__quovo__users.test'
let ctx = {}
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`)
  let ctx = {}
  assign(ctx, {
    quovo__username: env.QUOVO_USERNAME_DEMO
  })
  yield post__quovo__users(ctx, {
    data: JSON.stringify(new__quovo__user__demo(ctx))})
  assert__equal({actual: !!(ctx.quovo__user_id), expected: true})
  const {quovo__user} = ctx
  assert__equal({actual: ctx.quovo__user_id, expected: quovo__user.id})
  delete quovo__user.id
  delete quovo__user.value
  assert__equal({actual: [quovo__user], expected: [
    {'username':'censible-test2','phone':null,'email':'development@censible.com','name':'Censible Test2'}
  ], new__error: error$msg__multiline$json})
  info(JSON.stringify(quovo__user))
  return ctx
})
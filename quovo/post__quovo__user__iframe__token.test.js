#!/usr/bin/env babel-node
import {promise$catch__co} from 'ctx-core/co/lib'
import env from 'ctx-core/quovo/env'
import {post__quovo__user__iframe__token} from 'ctx-core/quovo/rpc'
import {assert__equal,assert__match} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const base64Regexp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    , logPrefix = 'ctx-core/quovo/post__quovo__user__iframe__token.test'
let ctx = {}
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`)
  let ctx = {}
  yield post__quovo__user__iframe__token(ctx, {
    quovo__user_id: env.QUOVO_USER_ID_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true})
  assert__equal({actual: ctx.quovo__user_id, expected: env.QUOVO_USER_ID_DEMO})
  assert__match({actual: ctx.quovo__iframe$token, match: base64Regexp})
  const {quovo__iframe$url} = ctx
  assert__match({actual: quovo__iframe$url,
    match: `https://www.quovo.com/index.php?action=remoteauth&u=${ctx.quovo__user_id}&k=${ctx.quovo__iframe$token}`})
  info(quovo__iframe$url)
  return ctx
})
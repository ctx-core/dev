#!/usr/bin/env babel-node
import {promise$catch} from 'ctx-core/promise/lib'
import env from 'ctx-core/quovo/env'
import {post__user__quovo__iframe__token} from 'ctx-core/quovo/rpc'
import {assert__equal,assert__match} from 'ctx-core/test/asserts'
import {log,info,debug} from 'ctx-core/logger/lib'
const base64Regexp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    , logPrefix = 'ctx-core/quovo/post__user__quovo__iframe__token.test'
let ctx = {}
promise$catch(ctx, async () => {
  log(`${logPrefix}|co`)
  let ctx = {}
  await post__user__quovo__iframe__token(ctx, {
    user_id__quovo: env.QUOVO_USER_ID_DEMO
  })
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true})
  assert__equal({actual: ctx.user_id__quovo, expected: env.QUOVO_USER_ID_DEMO})
  assert__match({actual: ctx.quovo__iframe$token, match: base64Regexp})
  const {quovo__iframe$url} = ctx
  assert__match({actual: quovo__iframe$url,
    match: `https://www.quovo.com/index.php?action=remoteauth&u=${ctx.user_id__quovo}&k=${ctx.quovo__iframe$token}`})
  info(quovo__iframe$url)
  return ctx
})
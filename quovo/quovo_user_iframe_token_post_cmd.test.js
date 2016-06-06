#!/usr/bin/env babel-node
import {co$catch$error$throw} from "ctx-core/co/lib";
import env from "ctx-core/quovo_demo/env";
import {quovo$user$iframe$token$post$cmd} from "./cmd";
import {assert$equal,assert$match,error$msg__multiline$json} from "ctx-core/test/asserts";
import {log,info,error,debug} from "ctx-core/logger/lib";
const base64Regexp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    , logPrefix = "ctx-core/quovo/quovo_user_iframe_token_post_cmd.test";
let ctx = {};
co$catch$error$throw(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield quovo$user$iframe$token$post$cmd(ctx, {
    quovo$user$id: env.quovo$user$id__demo
  });
  assert$equal({actual: env.quovo$user$id__demo > 0, expected: true});
  assert$equal({actual: ctx.quovo$user$id, expected: env.quovo$user$id__demo});
  assert$match({actual: ctx.quovo$iframe$token, match: base64Regexp});
  const quovo$iframe$url = ctx.quovo$iframe$url;
  assert$match({actual: quovo$iframe$url,
    match: `https://www.quovo.com/index.php?action=remoteauth&u=${ctx.quovo$user$id}&k=${ctx.quovo$iframe$token}`});
  info(quovo$iframe$url);
  return ctx;
});
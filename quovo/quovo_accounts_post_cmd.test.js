#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {quovo$account$$post$cmd} from "ctx-core/quovo/cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_accounts_post_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield quovo$account$$post$cmd(ctx, {
    quovo$user$id: env.quovo$user$id__demo,
    quovo$brokerage$id: env.quovo$brokerage$id__demo,
    quovo$brokerage$username: env.quovo$brokerage$username__demo,
    quovo$brokerage$password: env.quovo$brokerage$password__demo
  });
  assert$equal({actual: env.quovo$user$id__demo > 0, expected: true, error$message$header: "env.quovo$user$id__demo > 0"});
  assert$equal({actual: ctx.quovo$user$id, expected: env.quovo$user$id__demo, error$message$header: "ctx.quovo$user$id"});
  const quovo$account = ctx.quovo$account;
  assert$equal({actual: quovo$account, expected: true, error$message$header: "quovo$account"});
  info(JSON.stringify(quovo$account));
  return ctx;
});
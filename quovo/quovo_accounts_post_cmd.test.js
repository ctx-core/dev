#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo$account$$post} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_accounts_post_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo$account$$post(ctx, {
    quovo$user$id: env.QUOVO_USER_ID_DEMO,
    quovo$brokerage$id: env.QUOVO_BROKERAGE_ID_DEMO,
    quovo$brokerage$username: env.QUOVO_BROKERAGE_USERNAME_DEMO,
    quovo$brokerage$password: env.QUOVO_BROKERAGE_PASSWORD_DEMO
  });
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true, error$message$header: "env.QUOVO_USER_ID_DEMO > 0"});
  assert__equal({actual: ctx.quovo$user$id, expected: env.QUOVO_USER_ID_DEMO, error$message$header: "ctx.quovo$user$id"});
  const quovo$account = ctx.quovo$account;
  assert__equal({actual: quovo$account, expected: true, error$message$header: "quovo$account"});
  info(JSON.stringify(quovo$account));
  return ctx;
});
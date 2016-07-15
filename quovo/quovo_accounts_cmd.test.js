#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo__accounts} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_accounts_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo__accounts(ctx, {
    quovo__user_id: env.QUOVO_USER_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true, error$message$header: "env.QUOVO_USER_ID_DEMO > 0"});
  assert__equal({actual: ctx.quovo__user_id, expected: env.QUOVO_USER_ID_DEMO, error$message$header: "ctx.quovo__user_id == env.QUOVO_USER_ID_DEMO"});
  const quovo__accounts = ctx.quovo__accounts;
  assert__equal({actual: quovo__accounts.length > 0, expected: true, error$message$header: "quovo__accounts.length > 0"});
  info(JSON.stringify(quovo__accounts));
  return ctx;
});
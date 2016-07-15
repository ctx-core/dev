#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo__account__portfolios} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_portfolios_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo__account__portfolios(ctx, {
    quovo__user_id: env.QUOVO_USER_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true});
  assert__equal({actual: ctx.quovo__user_id, expected: env.QUOVO_USER_ID_DEMO});
  const quovo__account__portfolios = ctx.quovo__account__portfolios;
  assert__equal({actual: quovo__account__portfolios.length > 0, expected: true});
  info(JSON.stringify(quovo__account__portfolios));
  return ctx;
});
#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo$portfolio$history} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_portfolio_history_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo$portfolio$history(ctx, {
    quovo$portfolio$id: env.QUOVO_PORTFOLIO_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_PORTFOLIO_ID_DEMO >= 0, expected: true, error$message$header: "env.QUOVO_PORTFOLIO_ID_DEMO >= 0"});
  assert__equal({actual: ctx.quovo$portfolio$id, expected: env.QUOVO_PORTFOLIO_ID_DEMO, error$message$header: "ctx.quovo$portfolio$id == env.QUOVO_PORTFOLIO_ID_DEMO"});
  const quovo$portfolio$history = ctx.quovo$portfolio$history;
  assert__equal({actual: quovo$portfolio$history.length > 0, expected: true, error$message$header: "quovo$portfolio$history.length > 0"});
  info(JSON.stringify(quovo$portfolio$history));
  return ctx;
});
#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo__portfolio__history} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_portfolio_history_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo__portfolio__history(ctx, {
    quovo__portfolio_id: env.QUOVO_PORTFOLIO_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_PORTFOLIO_ID_DEMO >= 0, expected: true, error$message$header: "env.QUOVO_PORTFOLIO_ID_DEMO >= 0"});
  assert__equal({actual: ctx.quovo__portfolio_id, expected: env.QUOVO_PORTFOLIO_ID_DEMO, error$message$header: "ctx.quovo__portfolio_id == env.QUOVO_PORTFOLIO_ID_DEMO"});
  const quovo__portfolio__history = ctx.quovo__portfolio__history;
  assert__equal({actual: quovo__portfolio__history.length > 0, expected: true, error$message$header: "quovo__portfolio__history.length > 0"});
  info(JSON.stringify(quovo__portfolio__history));
  return ctx;
});
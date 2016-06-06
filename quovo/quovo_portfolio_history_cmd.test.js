#!/usr/bin/env babel-node
import {co$catch$error$throw} from "ctx-core/co/lib";
import env from "ctx-core/quovo_demo/env";
import {quovo$portfolio$history$cmd} from "./cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_portfolio_history_cmd.test";
let ctx = {};
co$catch$error$throw(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield quovo$portfolio$history$cmd(ctx, {
    quovo$portfolio$id: env.quovo$portfolio$id__demo
  });
  assert$equal({actual: env.quovo$portfolio$id__demo >= 0, expected: true, error$message$header: "env.quovo$portfolio$id__demo >= 0"});
  assert$equal({actual: ctx.quovo$portfolio$id, expected: env.quovo$portfolio$id__demo, error$message$header: "ctx.quovo$portfolio$id == env.quovo$portfolio$id__demo"});
  const quovo$portfolio$history = ctx.quovo$portfolio$history;
  assert$equal({actual: quovo$portfolio$history.length > 0, expected: true, error$message$header: "quovo$portfolio$history.length > 0"});
  info(JSON.stringify(quovo$portfolio$history));
  return ctx;
});
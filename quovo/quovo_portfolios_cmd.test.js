#!/usr/bin/env babel-node
import co from "co";
import env from "ctx-core/quovo_demo/env";
import {error$throw} from "ctx-core/error/lib";
import {quovo$account$portfolio$$cmd} from "./cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_portfolios_cmd.test";
let ctx = {};
co(function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield quovo$account$portfolio$$cmd(ctx, {
    quovo$user$id: env.quovo$user$id__demo
  });
  assert$equal({actual: env.quovo$user$id__demo > 0, expected: true});
  assert$equal({actual: ctx.quovo$user$id, expected: env.quovo$user$id__demo});
  const quovo$account$portfolio$$ = ctx.quovo$account$portfolio$$;
  assert$equal({actual: quovo$account$portfolio$$.length > 0, expected: true});
  info(JSON.stringify(quovo$account$portfolio$$));
  return ctx;
}).catch(
  error$ctx =>
    error$throw(ctx, error$ctx));
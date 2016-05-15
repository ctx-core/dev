#!/usr/bin/env babel-node
import {co$catch$error$throw} from "ctx-core/co/lib";
import env from "ctx-core/quovo_demo/env";
import {quovo$position$$cmd} from "./cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_positions_cmd.test";
let ctx = {};
co$catch$error$throw(function *() {
  log(`${logPrefix}|co`);
  const ctx = {};
  yield quovo$position$$cmd(ctx, {
    quovo$user$id: env.quovo$user$id__demo
  });
  assert$equal({actual: env.quovo$user$id__demo > 0, expected: true});
  assert$equal({actual: ctx.quovo$user$id, expected: env.quovo$user$id__demo});
  const quovo$position$$ = ctx.quovo$position$$;
  assert$equal({actual: quovo$position$$.length > 0, expected: true});
  info(JSON.stringify(quovo$position$$));
  return ctx;
}, ctx);
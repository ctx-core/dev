#!/usr/bin/env babel-node
import {co$catch$error$throw} from "ctx-core/co/lib";
import env from "ctx-core/quovo_demo/env";
import {quovo$brokerage$$post$cmd} from "./cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_brokerages_post_cmd.test";
let ctx = {};
co$catch$error$throw(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield quovo$brokerage$$post$cmd(ctx, {
    quovo$user$id: env.quovo$user$id__demo
  });
  assert$equal({actual: env.quovo$user$id__demo > 0, expected: true});
  assert$equal({actual: ctx.quovo$user$id, expected: env.quovo$user$id__demo});
  const quovo$brokerage$$ = ctx.quovo$brokerage$$;
  assert$equal({actual: quovo$brokerage$$.length > 0, expected: true});
  info(JSON.stringify(quovo$brokerage$$));
  return ctx;
});
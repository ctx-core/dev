#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {post__quovo__brokerages} from "ctx-core/quovo/rpc";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/post__quovo__brokerages.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield post__quovo__brokerages(ctx, {
    quovo__user_id: env.QUOVO_USER_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true});
  assert__equal({actual: ctx.quovo__user_id, expected: env.QUOVO_USER_ID_DEMO});
  const quovo__brokerages = ctx.quovo__brokerages;
  assert__equal({actual: quovo__brokerages.length > 0, expected: true});
  info(JSON.stringify(quovo__brokerages));
  return ctx;
});
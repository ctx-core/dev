#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {get__quovo__positions} from "ctx-core/quovo/rpc";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/get__quovo__positions.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  const ctx = {};
  yield get__quovo__positions(ctx, {
    quovo__user_id: env.QUOVO_USER_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true});
  assert__equal({actual: ctx.quovo__user_id, expected: env.QUOVO_USER_ID_DEMO});
  const quovo__positions = ctx.quovo__positions;
  assert__equal({actual: quovo__positions.length > 0, expected: true});
  info(JSON.stringify(quovo__positions));
  return ctx;
});
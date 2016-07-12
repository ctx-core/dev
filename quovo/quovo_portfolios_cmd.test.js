#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo$account$portfolio$$} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_portfolios_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo$account$portfolio$$(ctx, {
    quovo$user$id: env.QUOVO_USER_ID_DEMO
  });
  assert__equal({actual: env.QUOVO_USER_ID_DEMO > 0, expected: true});
  assert__equal({actual: ctx.quovo$user$id, expected: env.QUOVO_USER_ID_DEMO});
  const quovo$account$portfolio$$ = ctx.quovo$account$portfolio$$;
  assert__equal({actual: quovo$account$portfolio$$.length > 0, expected: true});
  info(JSON.stringify(quovo$account$portfolio$$));
  return ctx;
});
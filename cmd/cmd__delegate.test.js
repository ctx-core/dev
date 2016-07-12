#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import {cmd__delegate} from "./lib";
import env from "ctx-core/env";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/cmd/delegate_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  ctx = yield cmd__delegate({cmd: ["cmd__quovo$account$$"]});
  assert__cmd__quovo$account$$(ctx);
  info(JSON.stringify(ctx.quovo$account$$));
  return ctx;
});
function assert__cmd__quovo$account$$(ctx) {
  assert__equal({expected: true, actual: env.QUOVO_USER_ID_DEMO > 0});
  assert__equal({expected: env.QUOVO_USER_ID_DEMO, actual: ctx.quovo$user$id});
  const quovo$account$$ = ctx.quovo$account$$;
  assert__equal({expected: true, actual: quovo$account$$.length > 0});
}
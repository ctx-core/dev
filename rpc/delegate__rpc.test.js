#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import {delegate__rpc} from "./lib";
import env from "ctx-core/env";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/rpc/delegate__rpc.test";
let ctx = {};
/**
 * @test ctx-core/rpc/lib delegate__rpc
 */
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  ctx = yield delegate__rpc({rpc: ["get__quovo__accounts"]});
  assert__quovo__accounts(ctx);
  info(JSON.stringify(ctx.quovo__accounts));
  return ctx;
});
function assert__quovo__accounts(ctx) {
  assert__equal({expected: true, actual: env.QUOVO_USER_ID_DEMO > 0});
  assert__equal({expected: env.QUOVO_USER_ID_DEMO, actual: ctx.quovo__user_id});
  const quovo__accounts = ctx.quovo__accounts;
  assert__equal({expected: true, actual: quovo__accounts.length > 0});
}
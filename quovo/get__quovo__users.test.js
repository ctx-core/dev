#!/usr/bin/env babel-node
import {promise$catch__co} from "ctx-core/co/lib";
import "ctx-core/quovo/env";
import {get__quovo__users} from "ctx-core/quovo/rpc";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/get__quovo__users.test";
let ctx = {};
promise$catch__co(ctx, function *() {
  log(`${logPrefix}|co`);
  yield get__quovo__users(ctx);
  const quovo__users = ctx.quovo__users;
  assert__equal({actual: quovo__users.length > 0, expected: true});
  info(JSON.stringify(quovo__users));
  return ctx;
});
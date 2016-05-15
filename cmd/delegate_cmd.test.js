#!/usr/bin/env babel-node
import {co$catch$error$throw} from "ctx-core/co/lib";
import {error$throw} from "ctx-core/error/lib";
import {delegate$cmd} from "./lib";
import env from "ctx-core/env";
import {assert$equal} from "ctx-core/test/asserts";
import {info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/cmd/delegate_cmd.test";
let ctx = {};
co$catch$error$throw(function *() {
  log(`${logPrefix}|co`);
  ctx = yield delegate$cmd({cmd: ["quovo$account$$cmd"]});
  assert$quovo$account$$cmd(ctx);
  info(JSON.stringify(ctx.quovo$account$$));
  return ctx;
}, ctx);
function assert$quovo$account$$cmd(ctx) {
  assert$equal({expected: true, actual: env.quovo$user$id__demo > 0});
  assert$equal({expected: env.quovo$user$id__demo, actual: ctx.quovo$user$id});
  const quovo$account$$ = ctx.quovo$account$$;
  assert$equal({expected: true, actual: quovo$account$$.length > 0});
}
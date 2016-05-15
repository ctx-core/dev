#!/usr/bin/env babel-node
import {co$catch$error$throw} from "ctx-core/co/lib";
import env from "ctx-core/quovo_demo/env";
import {quovo$user$$cmd} from "./cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_users_cmd.test";
let ctx = {};
co$catch$error$throw(function *() {
  log(`${logPrefix}|co`);
  yield quovo$user$$cmd(ctx);
  const quovo$user$$ = ctx.quovo$user$$;
  assert$equal({actual: quovo$user$$.length > 0, expected: true});
  info(JSON.stringify(quovo$user$$));
  return ctx;
}, ctx);
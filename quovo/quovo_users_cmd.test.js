#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import "ctx-core/quovo/env";
import {quovo$user$$cmd} from "ctx-core/quovo/cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_users_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  yield quovo$user$$cmd(ctx);
  const quovo$user$$ = ctx.quovo$user$$;
  assert$equal({actual: quovo$user$$.length > 0, expected: true});
  info(JSON.stringify(quovo$user$$));
  return ctx;
});
#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import "ctx-core/quovo/env";
import {cmd__quovo$user$$} from "ctx-core/quovo/cmd";
import {assert__equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_users_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  yield cmd__quovo$user$$(ctx);
  const quovo$user$$ = ctx.quovo$user$$;
  assert__equal({actual: quovo$user$$.length > 0, expected: true});
  info(JSON.stringify(quovo$user$$));
  return ctx;
});
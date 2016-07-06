#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {quovo$account$$cmd} from "ctx-core/quovo/cmd";
import {assert$equal} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_accounts_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield quovo$account$$cmd(ctx, {
    quovo$user$id: env.quovo$user$id__demo
  });
  assert$equal({actual: env.quovo$user$id__demo > 0, expected: true, error$message$header: "env.quovo$user$id__demo > 0"});
  assert$equal({actual: ctx.quovo$user$id, expected: env.quovo$user$id__demo, error$message$header: "ctx.quovo$user$id == env.quovo$user$id__demo"});
  const quovo$account$$ = ctx.quovo$account$$;
  assert$equal({actual: quovo$account$$.length > 0, expected: true, error$message$header: "quovo$account$$.length > 0"});
  info(JSON.stringify(quovo$account$$));
  return ctx;
});
#!/usr/bin/env babel-node
import {assign} from "ctx-core/object/lib";
import env from "ctx-core/quovo/env";
import {co__promise$catch} from "ctx-core/co/lib";
import {quovo$user$$post$cmd} from "ctx-core/quovo/cmd";
import {new__quovo$user__demo} from "ctx-core/quovo/env";
import {assert$equal,error$msg__multiline$json} from "ctx-core/test/asserts";
import {log,info,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/quovo_users_post_cmd.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  assign(ctx, {
    quovo$username: env.quovo$username__demo
  });
  yield quovo$user$$post$cmd(ctx, {
    data: JSON.stringify(new__quovo$user__demo(ctx))});
  assert$equal({actual: !!(ctx.quovo$user$id), expected: true});
  const quovo$user = ctx.quovo$user;
  assert$equal({actual: ctx.quovo$user$id, expected: quovo$user.id});
  delete quovo$user.id;
  delete quovo$user.value;
  assert$equal({actual: [quovo$user], expected: [
    {"username":"censible-test2","phone":null,"email":"development@censible.com","name":"Censible Test2"}
  ], new__error: error$msg__multiline$json});
  info(JSON.stringify(quovo$user));
  return ctx;
});
#!/usr/bin/env babel-node
import {co__promise$catch} from "ctx-core/co/lib";
import env from "ctx-core/quovo/env";
import {cmd__quovo$user$$,cmd__quovo$user$$post} from "ctx-core/quovo/cmd";
import {new__quovo$user__demo} from "ctx-core/quovo/env";
import {log,info,debug} from "ctx-core/logger/lib";
import {assert__equal,error$msg__multiline$json} from "ctx-core/test/asserts";
const logPrefix = "ctx-core/quovo/quovo_users_post_cmd.multiTenant.test";
let ctx = {};
co__promise$catch(ctx, function *() {
  log(`${logPrefix}|co`);
  let ctx = {};
  yield cmd__quovo$user$$(ctx, {
    quovo$username: env.QUOVO_USERNAME_DEMO
  });
  const quovo$user$body = new__quovo$user__demo(ctx);
  assert__equal({
    actual: ctx.quovo$user$$.map(
        quovo$user => quovo$user.username
      ).indexOf(quovo$user$body.username) > -1,
    expected: true,
    error$message$header: "ctx.quovo$user$$.map(u => u.username).indexOf(quovo$user$body.username) == true"
  });
  yield cmd__quovo$user$$post(ctx, {
    body: JSON.stringify(quovo$user$body)});
  assert__equal({actual: !!(ctx.quovo$user$id), expected: true, error$message$header: "!!(ctx.quovo$user$id)"});
  let quovo$user = ctx.quovo$user;
  assert__equal({actual: ctx.quovo$user$id, expected: quovo$user.id, error$message$header: "ctx.quovo$user$id == quovo$user.id"});
  delete quovo$user.id;
  delete quovo$user.value;
  assert__equal({actual: [quovo$user], expected: [
    {"username":"censible-test2","phone":null,"email":"development@censible.com","name":"Censible Test2"}
  ], new__error: error$msg__multiline$json});
  info(JSON.stringify(quovo$user));
  return ctx;
});
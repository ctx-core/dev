import {assign,clone,assign__keys$public,keys} from "ctx-core/object/lib";
import {array$concat$$,array$uniq$$} from "ctx-core/array/lib";
import {pick__cmd$api$whitelist,assert__cmd$api$whitelist$salt} from "ctx-core/security/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/cmd/lib";
let delegate$cmd$map = {}
  , assert__authorization$$ = [];
export function delegate$cmd$map__assign() {
  log(`${logPrefix}|delegate$cmd$map__assign`);
  assign(delegate$cmd$map, ...arguments);
  return delegate$cmd$map;
}
export function assign__assert__authorization() {
  log(`${logPrefix}|assign__assert__authorization`);
  assert__authorization$$.push(...arguments);
}
export function *assert__authorization(ctx, ...rest) {
  log(`${logPrefix}|assert__authorization`);
  yield assert__authorization$$.map(
   assert__authorization =>
     assert__authorization(ctx, ...rest));
}
export function *delegate$cmd() {
  log(`${logPrefix}|delegate$cmd`);
  let ctx = assign(...arguments)
    , cmd$$invalid$$ = []
    , ctx$cmd = ctx.cmd;
  array$concat$$([], ctx$cmd)
    .forEach(
      cmd$key => {
        if (!delegate$cmd$map[cmd$key]) {
          cmd$$invalid$$.push(cmd$key);
        }
      });
  if (cmd$$invalid$$.length) {
    error$throw(ctx, {
      http$status: 400,
      error$message: `Invalid cmd keys: ${JSON.stringify(cmd$$invalid$$)}`
    });
  }
  const cmd$$ctx$$fn$$ = ctx$cmd.map(
          cmd$key =>
            delegate$cmd$map[cmd$key](ctx))
      , cmd$$ctx$$ = yield cmd$$ctx$$fn$$;
  return pick$keys$public(ctx, ...cmd$$ctx$$);
}
export function *cmd$api(ctx, ...cmd$api$ctx$$) {
  log(`${logPrefix}|cmd$api`);
  assign(...arguments);
  const cmd$key = ctx.cmd$key;
  if (!cmd$key) error$throw(ctx, {error$message: "cmd$key not defined", http$status: 500});
  const cmd$api$whitelist = array$concat$$(
          ["authentication", "cmd$key", "http$request", "session"],
          ctx.cmd$api$whitelist)
      , cmd$fn = ctx.cmd$fn;
  let cmd$ctx = pick__cmd$api$whitelist(ctx, "keys$public", ...cmd$api$whitelist);
  yield assert__authorization(ctx, cmd$ctx);
  const cmd$fn$ = yield cmd$fn(cmd$ctx);
  assert__cmd$api$whitelist$salt(cmd$ctx);
  assign__keys$public(ctx, cmd$fn$);
  return ctx;
}
export function pick$keys$public(...ctx$$) {
  log(`${logPrefix}|pick$keys$public`);
  const keys$public = array$uniq$$(
    ["keys$public"],
    ...ctx$$.map(cmd => cmd.keys$public));
  let ctx = clone(...ctx$$)
    , public$ctx = {};
  keys(ctx).forEach(key => {
    if (keys$public.indexOf(key) > -1) {
      public$ctx[key] = ctx[key];
    }
  });
  return public$ctx;
}
import {assign,clone,assign__publicKeys,keys} from "ctx-core/object/lib";
import {array$concat$$,array$uniq$$} from "ctx-core/array/lib";
import {security$pick,assert$security} from "ctx-core/security/lib";
import {error$throw} from "ctx-core/error/lib";
import env from "ctx-core/env";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/cmd/lib";
let delegate$cmd$map = {};
export function delegate$cmd$map__assign() {
  log(`${logPrefix}|delegate$cmd$map__assign`);
  assign(delegate$cmd$map, ...arguments);
  return delegate$cmd$map;
}
export function *delegate$cmd() {
  log(`${logPrefix}|delegate$cmd`);
  let ctx = assign(...arguments)
    , cmd$$fn$$ = []
    , cmd$$invalid$$ = [];
  array$concat$$([], ctx.cmd)
    .forEach(
      cmd$key => {
        const cmd$fn = delegate$cmd$map[cmd$key];
        if (cmd$fn) {
          cmd$$fn$$.push(cmd$fn);
        } else {
          cmd$$invalid$$.push(cmd$key);
        }
      });
  if (cmd$$invalid$$.length) {
    error$throw(ctx, {
      http$status: 400,
      error$message: `Invalid cmd keys: ${JSON.stringify(cmd$$invalid$$)}`
    });
  } else {
    const cmd$$ctx$$fn$$ = cmd$$fn$$
            .map(cmd$$fn => cmd$$fn(ctx))
        , cmd$$ctx$$ = yield cmd$$ctx$$fn$$;
    cmd$$ctx$$.forEach(
      cmd$$ctx => assert$security(cmd$$ctx)
    );
    return pick$publicKeys(ctx, ...cmd$$ctx$$);
  }
}
export function *cmd$security(ctx, ...security$ctx$$) {
  log(`${logPrefix}|cmd$security`);
  const security$ctx = clone(...security$ctx$$)
      , ctx$key$whitelist = security$ctx.ctx$key$whitelist
      , cmd$fn = security$ctx.cmd$fn;
  let cmd$ctx = security$pick(ctx, "publicKeys", ...ctx$key$whitelist);
  assign(ctx, {process$security$key: cmd$ctx.process$security$key});
  const cmd$fn$ = yield cmd$fn(cmd$ctx);
  assign__publicKeys(ctx, cmd$fn$);
  return ctx;
}
function pick$publicKeys(...ctx$$) {
  log(`${logPrefix}|pick$publicKeys`);
  const publicKeys = array$uniq$$(["publicKeys"], ...ctx$$.map(cmd => cmd.publicKeys));
  let ctx = clone(...ctx$$)
    , public$ctx = {};
  keys(ctx).forEach(key => {
    if (publicKeys.indexOf(key) > -1) {
      public$ctx[key] = ctx[key];
    }
  });
  return public$ctx;
}
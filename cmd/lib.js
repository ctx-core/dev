import {assign,clone,assign__keys$public,keys} from "ctx-core/object/lib";
import {array$concat,array$uniq} from "ctx-core/array/lib";
import {pick__cmd$whitelist,assert__cmd$whitelistSalt} from "ctx-core/security/lib";
import {throw__error} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/cmd/lib";
let table__name__cmd = {};
export function table__name__cmd__assign() {
  log(`${logPrefix}|table__name__cmd__assign`);
  assign(table__name__cmd, ...arguments);
  return table__name__cmd;
}
export function *cmd__delegate() {
  log(`${logPrefix}|cmd__delegate`);
  let ctx = assign(...arguments)
    , cmd$$invalid$$ = []
    , ctx$cmd = ctx.cmd;
  array$concat([], ctx$cmd)
    .forEach(
      cmd$key => {
        if (!table__name__cmd[cmd$key]) {
          cmd$$invalid$$.push(cmd$key);
        }
      });
  if (cmd$$invalid$$.length) {
    throw__error(ctx, {
      http$status: 400,
      error$message: `Invalid cmd keys: ${JSON.stringify(cmd$$invalid$$)}`
    });
  }
  const cmd$$ = ctx$cmd.map(
          cmd$key =>
            table__name__cmd[cmd$key](ctx))
      , cmd$$ctx$$ = yield cmd$$;
  return pick__keys$public(ctx, ...cmd$$ctx$$);
}
export function *call__cmd(ctx) {
  log(`${logPrefix}|call__cmd`);
  const ctx$clone = clone(...arguments)
      , cmd$key = ctx$clone.cmd$key;
  if (!cmd$key) throw__error(ctx$clone, {error$message: "cmd$key not defined", http$status: 500});
  const cmd$whitelist = array$concat(
          ["authentication", "cmd$key", "http$request", "session"],
          ctx$clone.cmd$whitelist)
      , cmd = ctx$clone.cmd;
  let cmd$ctx = pick__cmd$whitelist(ctx$clone, "keys$public", ...cmd$whitelist);
  const cmd$ = yield cmd(cmd$ctx);
  assert__cmd$whitelistSalt(cmd$ctx);
  assign__keys$public(ctx, cmd$);
  return ctx;
}
export function pick__keys$public(...ctx$$) {
  log(`${logPrefix}|pick__keys$public`);
  const keys$public = array$uniq(
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
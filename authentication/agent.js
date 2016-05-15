import {assign} from "ctx-core/object/lib";
import {assign__agent_cmd} from "ctx-core/agent/lib";
import {co$catch$error$throw} from "ctx-core/co/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/authentication/agent";
export function assign__authentication_agent() {
  log(`${logPrefix}|assign__authentication_agent`);
  let ctx = assign(...arguments);
  if (!ctx.authentication_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__authentication_agent|init`);
    assign__agent_cmd(ctx, {
      key$agent: "authentication_agent",
      agent$keys: ["authentication"],
      cmd: ["oauth2$cmd"],
      fn$cmd$ctx: fn$cmd$ctx,
      agent$refresh$guard: agent$refresh$guard
    });
    assign(ctx.authentication_agent, {
      authenticate: authenticate
    });
  }
  function fn$cmd$ctx(refresh$ctx, ...refresh$ctx$rest$$) {
    log(`${logPrefix}|assign__authentication_agent|fn$cmd$ctx`);
    return assign(refresh$ctx, {
      grant_type: "password",
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...refresh$ctx$rest$$);
  }
  function agent$refresh$guard(ctx$, refresh$ctx) {
    log(`${logPrefix}|assign__authentication_agent|agent$refresh$guard`);
    return !!(refresh$ctx.username && refresh$ctx.password);
  }
  function authenticate(refresh$ctx) {
    log(`${logPrefix}|authenticate`);
    return co$catch$error$throw(function *() {
      return yield ctx.authentication_agent.agent$refresh(refresh$ctx);
    }, ctx);
  }
}
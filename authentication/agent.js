// TODO: move to cmd authentication
import {assign,clone,pick} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {assign__agent,fn$cmd_Agent$ctx,agent$$trigger$change} from "ctx-core/agent/lib";
import {localStorage$load,localStorage$assign,localStorage$remove} from "ctx-core/localStorage/lib";
import {co$catch$error$throw} from "ctx-core/co/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/authentication/agent";
export function fn$authentication_Agent$ctx(ctx) {
  log(`${logPrefix}|fn$authentication_Agent$ctx`);
  let agent, scope$key;
  return {
    init: init,
    scope$reset: scope$reset
  };
  function init(agent$) {
    log(`${logPrefix}|fn$authentication_Agent$ctx|init`);
    agent = agent$;
    scope$key = agent.scope[0];
    assign(agent, {
      authenticate: authenticate
    });
    agent$$trigger$change(ctx, pick(localStorage$load(), scope$key));
  }
  function authenticate(reset$ctx) {
    log(`${logPrefix}|fn$authentication_Agent$ctx|authenticate`);
    return co$catch$error$throw(ctx, function *() {
      yield agent.reset(reset$ctx);
      let localStorage$ctx = {};
      localStorage$ctx[scope$key] = ctx[scope$key];
      localStorage$assign(localStorage$ctx);
      return ctx;
    });
  }
  function scope$reset() {
    log(`${logPrefix}|fn$authentication_Agent$ctx|scope$reset`);
    localStorage$remove(scope$key);
    agent.core__scope$reset();
  }
}
export function assign__cmd$authentication_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__cmd$authentication_agent`);
  const Agent$ctx = clone(...Agent$ctx$$);
  let cmd$authentication_agent;
  const agent$key = Agent$ctx.key || "cmd$authentication";
  assign__agent(ctx, fn$cmd_Agent$ctx(ctx), fn$authentication_Agent$ctx(ctx), {
    key: "cmd$authentication_agent",
    scope: [agent$key],
    cmd: ["oauth2$cmd"],
    init: init,
    fn$cmd$ctx: fn$cmd$ctx,
    fn$reset$guard: fn$reset$guard
  }, Agent$ctx);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__cmd$authentication_agent|init`);
    cmd$authentication_agent = agent;
  }
  function fn$cmd$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|assign__cmd$authentication_agent|fn$cmd$ctx`);
    return assign(reset$ctx, {
      grant_type: "password",
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...reset$ctx$rest$$);
  }
  function fn$reset$guard(ctx$, reset$ctx) {
    log(`${logPrefix}|assign__cmd$authentication_agent|fn$reset$guard`);
    return !!(reset$ctx.username && reset$ctx.password) ||
      cmd$authentication_agent.noop;
  }
}
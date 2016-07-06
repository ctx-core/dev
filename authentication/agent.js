// TODO: move to cmd authentication
import {assign,clone,pick} from "ctx-core/object/lib";
import {assign__agent,new__cmd_Agent$ctx,change__agent$$} from "ctx-core/agent/lib";
import {localStorage$load,localStorage$assign,localStorage$remove} from "ctx-core/localStorage/lib";
import {co__promise$catch} from "ctx-core/co/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/authentication/agent";
export function new__authentication__agent$ctx(ctx) {
  log(`${logPrefix}|new__authentication__agent$ctx`);
  let agent, scope$key;
  return {
    init: init,
    scope$reset: scope$reset
  };
  function init(agent$) {
    log(`${logPrefix}|new__authentication__agent$ctx|init`);
    agent = agent$;
    scope$key = agent.scope[0];
    assign(agent, {
      authenticate: authenticate
    });
    change__agent$$(ctx, pick(localStorage$load(), scope$key));
  }
  function authenticate(reset$ctx) {
    log(`${logPrefix}|new__authentication__agent$ctx|authenticate`);
    return co__promise$catch(ctx, function *() {
      yield agent.reset(reset$ctx);
      let localStorage$ctx = {};
      localStorage$ctx[scope$key] = ctx[scope$key];
      localStorage$assign(localStorage$ctx);
      return ctx;
    });
  }
  function scope$reset() {
    log(`${logPrefix}|new__authentication__agent$ctx|scope$reset`);
    localStorage$remove(scope$key);
    agent.core__scope$reset();
  }
}
export function assign__agent__cmd__authentication(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__agent__cmd__authentication`);
  const Agent$ctx = clone(...Agent$ctx$$);
  let agent__cmd__authentication;
  const agent$key = Agent$ctx.key || "cmd$authentication";
  assign__agent(ctx, new__cmd_Agent$ctx(ctx), new__authentication__agent$ctx(ctx), {
    key: "agent__cmd__authentication",
    scope: [agent$key],
    cmd: ["oauth2$cmd"],
    init: init,
    new__cmd$ctx: new__cmd$ctx,
    reset$guard: reset$guard
  }, Agent$ctx);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__cmd__authentication|init`);
    agent__cmd__authentication = agent;
  }
  function new__cmd$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|assign__agent__cmd__authentication|new__cmd$ctx`);
    return assign(reset$ctx, {
      grant_type: "password",
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...reset$ctx$rest$$);
  }
  function reset$guard(ctx$, reset$ctx) {
    log(`${logPrefix}|assign__agent__cmd__authentication|reset$guard`);
    return !!(reset$ctx.username && reset$ctx.password) ||
      agent__cmd__authentication.noop;
  }
}
import {assign,clone,pick} from "ctx-core/object/lib";
import {assign__agent,new__rpc__agent$ctx,change__agents} from "ctx-core/agent/lib";
import {load__localStorage$ctx,assign__localStorage$ctx,remove__localStorage$ctx} from "ctx-core/localStorage/lib";
import {co__promise$catch} from "ctx-core/co/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/auth/agent";
export function new__agent$ctx__authentication(ctx) {
  log(`${logPrefix}|new__agent$ctx__authentication`);
  let agent, scope$key;
  return {
    init: init,
    reset__scope: reset__scope
  };
  function init() {
    log(`${logPrefix}|new__agent$ctx__authentication|init`);
    agent = arguments[0];
    scope$key = agent.scope[0];
    assign(agent, {
      authenticate: authenticate
    });
    change__agents(ctx, pick(load__localStorage$ctx(), scope$key));
  }
  function authenticate(reset$ctx) {
    log(`${logPrefix}|new__agent$ctx__authentication|authenticate`);
    return co__promise$catch(ctx, function *() {
      yield agent.reset(reset$ctx);
      let localStorage$ctx = {};
      localStorage$ctx[scope$key] = ctx[scope$key];
      assign__localStorage$ctx(localStorage$ctx);
      return ctx;
    });
  }
  function reset__scope() {
    log(`${logPrefix}|new__agent$ctx__authentication|reset__scope`);
    remove__localStorage$ctx(scope$key);
    agent.core__reset__scope();
  }
}
export function assign__agent__rpc__authentication(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__rpc__authentication`);
  const agent$ctx = clone(...agent$ctx$$);
  let agent__rpc__authentication;
  const agent$key = agent$ctx.key || "cmd$authentication";
  assign__agent(ctx, new__rpc__agent$ctx(ctx), new__agent$ctx__authentication(ctx), {
    key: "agent__rpc__authentication",
    scope: [agent$key],
    rpc: ["rpc__oauth2"],
    init: init,
    new__rpc$ctx: new__rpc$ctx,
    reset$guard: reset$guard
  }, agent$ctx);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__rpc__authentication|init`);
    agent__rpc__authentication = agent;
  }
  function new__rpc$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|assign__agent__rpc__authentication|new__rpc$ctx`);
    return assign(reset$ctx, {
      grant_type: "password",
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...reset$ctx$rest$$);
  }
  function reset$guard(ctx$, reset$ctx) {
    log(`${logPrefix}|assign__agent__rpc__authentication|reset$guard`);
    return !!(reset$ctx.username && reset$ctx.password) ||
      agent__rpc__authentication.noop;
  }
}
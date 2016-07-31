import {assign,clone,pick} from "ctx-core/object/lib";
import {change__agents} from "ctx-core/agent/lib";
import {agent__rpc} from "ctx-core/agent/rpc";
import {load__localStorage$ctx,assign__localStorage$ctx,remove__localStorage$ctx} from "ctx-core/localStorage/lib";
import {co__promise$catch} from "ctx-core/co/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/auth/agent";
export function agent$ctx__authentication(ctx) {
  log(`${logPrefix}|agent$ctx__authentication`);
  let agent, scope$key;
  return {
    init: init,
    authenticate: authenticate
  };
  function init() {
    log(`${logPrefix}|agent$ctx__authentication|init`);
    agent = this;
    scope$key = agent.scope[0];
    change__agents(ctx, pick(load__localStorage$ctx(), scope$key));
  }
  function authenticate(reset$ctx) {
    log(`${logPrefix}|agent$ctx__authentication|authenticate`);
    return co__promise$catch(ctx, function *() {
      yield agent.reset(reset$ctx);
      let localStorage$ctx = {};
      localStorage$ctx[scope$key] = ctx[scope$key];
      assign__localStorage$ctx(localStorage$ctx);
      return ctx;
    });
  }
}
export function agent__rpc__authentication(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__rpc__authentication`);
  const agent$ctx = clone(...agent$ctx$$);
  let agent;
  const agent$key = agent$ctx.key || "cmd$authentication";
  return agent__rpc(ctx, agent$ctx__authentication(ctx), {
    key: "agent__rpc__authentication",
    scope: [agent$key],
    rpc: ["rpc__oauth2"],
    init: init,
    reset: reset,
    new__rpc$ctx: new__rpc$ctx
  }, agent$ctx);
  function init() {
    log(`${logPrefix}|agent__rpc__authentication|init`);
    agent = this;
  }
  function *reset() {
    log(`${logPrefix}|agent__rpc__authentication|reset`);
    const reset$ctx = clone(...arguments);
    if (!!(reset$ctx.username && reset$ctx.password)) {
      return yield agent.reset__rpc(reset$ctx);
    } else {
      return yield agent.reset__noop();
    }
  }
  function new__rpc$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|agent__rpc__authentication|new__rpc$ctx`);
    return assign(reset$ctx, {
      grant_type: "password",
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...reset$ctx$rest$$);
  }
}
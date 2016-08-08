import {assign,clone,pick} from "ctx-core/object/lib";
import {clear__core} from "ctx-core/agent/lib";
import {rpc__agent} from "ctx-core/agent/rpc";
import {load__localStorage$ctx,assign__localStorage$ctx,remove__localStorage$ctx} from "ctx-core/localStorage/lib";
import {promise$catch__co} from "ctx-core/co/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/auth/agent";
export function agent$ctx__authentication(ctx) {
  log(`${logPrefix}|agent$ctx__authentication`);
  let agent, scope$;
  return {
    init: init,
    authenticate: authenticate,
    clear: clear
  };
  function init() {
    log(`${logPrefix}|agent$ctx__authentication|init`);
    agent = this;
    scope$ = agent.scope$();
    agent.set(load__localStorage$ctx());
  }
  function authenticate(reset$ctx) {
    log(`${logPrefix}|agent$ctx__authentication|authenticate`);
    return promise$catch__co(ctx, function *() {
      yield agent.reset(reset$ctx);
      let localStorage$ctx = {};
      localStorage$ctx[scope$] = ctx[scope$];
      assign__localStorage$ctx(localStorage$ctx);
      return ctx;
    });
  }
  function clear() {
    log(`${logPrefix}|agent$ctx__authentication|clear`);
    remove__localStorage$ctx(scope$);
    return clear__core.apply(agent, arguments);
  }
}
export function rpc__authentication__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|rpc__authentication__agent`);
  const agent$ctx = clone(...agent$ctx$$);
  let agent;
  const agent$key = agent$ctx.key || "cmd$authentication";
  return rpc__agent(ctx, agent$ctx__authentication(ctx), {
    key: "rpc__authentication__agent",
    scope: [agent$key],
    rpc: ["rpc__oauth2"],
    init: init,
    reset: reset,
    new__rpc$ctx: new__rpc$ctx
  }, agent$ctx);
  function init() {
    log(`${logPrefix}|rpc__authentication__agent|init`);
    agent = this;
  }
  function *reset() {
    log(`${logPrefix}|rpc__authentication__agent|reset`);
    const reset$ctx = clone(...arguments);
    if (!!(reset$ctx.username && reset$ctx.password)) {
      return yield agent.reset__rpc(reset$ctx);
    } else {
      return yield agent.reset__noop();
    }
  }
  function new__rpc$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|rpc__authentication__agent|new__rpc$ctx`);
    return assign(reset$ctx, {
      grant_type: "password",
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...reset$ctx$rest$$);
  }
}
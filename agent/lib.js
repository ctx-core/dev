import {assign,clone,keys,pick,some} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {cloneFn} from "ctx-core/function/lib";
import {array$some$$,array$every$$} from "ctx-core/array/lib";
import {assign__http$headers__contentType$json} from "ctx-core/xhr/lib";
import deepEqual from "deep-equal";
import {xhr} from "ctx-core/xhr/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import riot from "riot";
import co from "co";
const observable = riot.observable
    , logPrefix = "ctx-core/agent/lib";
export const ttl$default = 3600000;
export const assign__agent$$ = assign__agent$$fn(assign__agent);
export function assign__agent$$fn(fn) {
  return function assign__agent$$fn$(ctx, ...Agent$ctx$$) {
    Agent$ctx$$.forEach(Agent$ctx => fn(ctx, Agent$ctx));
    return ctx;
  }
}
export function assign__agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__agent`);
  const Agent$ctx = clone(...Agent$ctx$$)
      , key$agent = Agent$ctx.key$agent
      , Agent$ = Agent$ctx.Agent || Agent;
  if (!key$agent) error$throw(clone(ctx, Agent$ctx), {error$message: "Agent$ctx.key$agent not present"});
  ctx[key$agent] = Agent$(ctx, Agent$ctx, {self: ctx, key$agent: key$agent});
  return ctx;
}
export function agent$$trigger$change(ctx, ctx$rest, fn) {
  log(`${logPrefix}|agent$$trigger$change`);
  const ctx$clone = clone(ctx);
  assign(ctx, ctx$rest);
  if (fn) fn(ctx);
  ctx$clone_agent$$trigger$change(ctx$clone);
  return ctx;
}
export function ctx$clone_agent$$trigger$change(ctx$clone) {
  log(`${logPrefix}|ctx$clone_agent$$trigger$change`);
  fn$agent$$(ctx$clone).forEach(
    agent =>
      agent.ctx$clone_agent$trigger$change(ctx$clone));
}
export function fn$agent$$() {
  log(`${logPrefix}|fn$agent$$`);
  let ctx = assign(...arguments);
  return keys(ctx).reduce(
    (memo, key) => {
      const maybe$agent = ctx[key];
      if (maybe$agent && maybe$agent.key$agent) memo.push(maybe$agent);
      return memo;
    }, []);
}
export function Agent() {
  log(`${logPrefix}|Agent`);
  observable(agent);
  const Agent$ctx = clone(...arguments)
      , self = Agent$ctx.self
      , Agent$ctx$agent$keys = Agent$ctx.agent$keys
      , key$agent = Agent$ctx.key$agent
      , agent$key$expires = `${key$agent}$expires`
      , agent$refresh$fn = Agent$ctx.agent$refresh$fn || agent$lib_agent$refresh$fn
      , Agent$ctx$agent$ttl = Agent$ctx.agent$ttl
      , Agent$ttl = (Agent$ctx$agent$ttl === true && ttl$default) || Agent$ctx$agent$ttl
      , no$agent$co$init = Agent$ctx.no$agent$co$init;
  if (!self) error$throw(Agent$ctx, {error$message: "Agent$ctx.self not present"});
  if (!key$agent) error$throw(Agent$ctx, {error$message: "Agent$ctx.key$agent not present"});
  if (!Agent$ctx$agent$keys || !Agent$ctx$agent$keys.length) error$throw(Agent$ctx, {error$message: "Agent$ctx.agent$keys not present"});
  assign(agent, {
    self: self,
    co: agent$co,
    agent$keys$reset: Agent$ctx$agent$keys$reset,
    set: agent$set,
    key$agent: key$agent,
    agent$keys: Agent$ctx$agent$keys,
    agent$trigger$change: agent$trigger$change,
    ctx$clone_agent$trigger$change: ctx$clone_agent$trigger$change,
    agent$refresh: agent$refresh,
    agent$lib_agent$refresh$fn: agent$lib_agent$refresh$fn});
  if (!no$agent$co$init) {
    const co$init$fn = Agent$ctx.co$init$fn || agent$co;
    setTimeout(co$init$fn, 0); // wait for the agent to be assigned to the ctx
  }
  return agent;
  function agent$co() {
    log(`${logPrefix}|agent$co`);
    return co(agent)
      .catch(
        error$ctx =>
          error$throw(Agent$ctx, error$ctx));
  }
  function *agent() {
    log(`${logPrefix}|Agent|agent`, key$agent);
    const ctx = clone(...arguments)
        , ctx$keys = keys(ctx)
        , expires = self[agent$key$expires]
        , expired = expires && expires <= new Date()
        , ctx$key$has = ctx$key => ctx[ctx$key] != null
        , ctx$key$notHas = ctx$key => ctx[ctx$key] == null
        , ctx$key$notEq = ctx$key => ctx[ctx$key] != self[ctx$key];
    if (array$every$$(ctx$keys, ctx$key$has) && array$some$$(ctx$keys, ctx$key$notEq)) {
      log(`${logPrefix}|Agent|agent|assign__agent`, key$agent, ctx$keys, array$every$$(ctx$keys, ctx$key$has), array$some$$(ctx$keys, ctx$key$notEq));
      agent$set(ctx);
    } else if (expired || !ctx$keys.length || array$some$$(ctx$keys, ctx$key$notHas)) {
      log(`${logPrefix}|Agent|agent|agent$refresh`, key$agent);
      yield agent.agent$refresh(ctx);
    } else {
      log(`${logPrefix}|Agent|agent|noop`, key$agent);
    }
    return self;
  }
  function agent$set() {
    log(`${logPrefix}|Agent|agent$set`, key$agent);
    agent$$trigger$change(
      self,
      pick(clone(...arguments), ...Agent$ctx$agent$keys),
      () => {
        if (Agent$ttl) self[agent$key$expires] = new Date(new Date().getTime + Agent$ttl);
      });
    return self;
  }
  function agent$trigger$change() {
    log(`${logPrefix}|Agent|agent$trigger$change`, key$agent);
    setTimeout(() => {
      log(`${logPrefix}|Agent|agent$trigger$change|setTimeout`, key$agent);
      agent.trigger("change", self);
    }, 0);
  }
  function ctx$clone_agent$trigger$change(clone$ctx) {
    log(`${logPrefix}|Agent|ctx$clone_agent$trigger$change`);
    if (agent.agent$keys.some(
      agent$key =>
        !deepEqual(self[agent$key], clone$ctx[agent$key]))
    ) {
      agent.agent$trigger$change();
    }
  }
  function *agent$refresh() {
    log(`${logPrefix}|Agent|agent$refresh`, key$agent);
    let refresh$ctx = clone(...arguments);
    const agent$set$ctx = yield agent$refresh$fn(self, refresh$ctx);
    return agent$set(agent$set$ctx);
  }
  function *agent$lib_agent$refresh$fn(self, refresh$ctx) {
    log(`${logPrefix}|Agent|agent$lib_agent$refresh$fn`, key$agent, refresh$ctx);
    return refresh$ctx;
  }
  function Agent$ctx$agent$keys$reset() {
    log(`${logPrefix}|Agent|Agent$ctx$agent$keys$reset`);
    Agent$ctx.agent$keys.forEach(key => {
      self[key] = null; });
  }
}
export function *agent$lib__Agent$load(agent) {
  log(`${logPrefix}|agent$lib__Agent$load`, agent.key$agent);
  return agent();
}
// TODO: extract protocol: in process cmd, http cmd
export function assign__agent_cmd(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__agent_cmd`);
  const ctx$rest = assign({
            agent$refresh$fn: agent$refresh$fn,
            fn$cmd$ctx: fn$cmd$ctx
          }, ...ctx$rest$$)
      , key$agent = ctx$rest.key$agent
      , agent$keys = ctx$rest.agent$keys
      , cmd = ctx$rest.cmd
      , fn$cmd$ctx$ = ctx$rest.fn$cmd$ctx;
  assign__agent(ctx, ctx$rest);
  let agent = ctx[key$agent];
  agent.assign__agent_cmd__refresh$fn = agent$refresh$fn;
  return ctx;
  function *agent$refresh$fn(self) {
    log(`${logPrefix}|assign__agent_cmd|agent$refresh$fn`, key$agent, cmd);
    const self$clone = clone(...arguments)
        , cmd$ctx = fn$cmd$ctx$({
            cmd: cmd,
            log: `${logPrefix}|assign__agent_cmd|agent$refresh$fn|POST /quovo/cmd|${key$agent}|${JSON.stringify(cmd)}`
          })
        , assign__agent_cmd__debounce$map = ctx.assign__agent_cmd__debounce$map || {}
        , cmd$ctx$json = JSON.stringify(cmd$ctx);
    ctx.assign__agent_cmd__debounce$map = assign__agent_cmd__debounce$map;
    const cmd$debounce = assign__agent_cmd__debounce$map[cmd$ctx$json];
    if (!cmd$debounce) {
      log(`${logPrefix}|assign__agent_cmd|agent$refresh$fn|!cmd$debounce`, key$agent, cmd);
      assign__agent_cmd__debounce$map[cmd$ctx$json] = cmd$ctx;
      const response$ctx = yield xhr.http$post(
              assign__http$headers__contentType$json(self$clone),
              {
                path: "/cmd",
                body: cmd$ctx$json})
          , value = refresh$ctx(response$ctx);
      delete assign__agent_cmd__debounce$map[cmd$ctx$json];
      return value;
    }
  }
  function fn$cmd$ctx() {
    log(`${logPrefix}|fn$cmd$ctx`);
    return assign(...arguments);
  }
  function refresh$ctx(response$ctx) {
    log(`${logPrefix}|assign__agent_cmd|refresh$ctx`);
    const request = response$ctx.request
        , responseText = request && request.responseText
        , responseText$ctx = (responseText && JSON.parse(responseText)) || {}
        , refresh$ctx$fn = ctx$rest.refresh$ctx$fn || agent$lib__refresh$ctx$fn;
    return agent$keys.reduce((memo, agent$key) => {
      memo[agent$key] = refresh$ctx$fn(responseText$ctx, agent$key);
      return memo;
    }, {});
  }
}
export function agent$lib__refresh$ctx$fn(responseText$ctx, agent$key) {
  log(`${logPrefix}|agent$lib__refresh$ctx$fn`);
  return responseText$ctx[agent$key];
}
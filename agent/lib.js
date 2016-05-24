import {assign,clone,keys,pick,some} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {cloneFn} from "ctx-core/function/lib";
import {array$some$$,array$every$$,array$remove,array$concat$$} from "ctx-core/array/lib";
import {co$catch$error$throw} from "ctx-core/co/lib";
import {assign__http$headers,contentType$json} from "ctx-core/xhr/lib";
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
  const Agent$ctx = assign(...Agent$ctx$$)
      , key$agent = Agent$ctx.key$agent
      , Agent$ = Agent$ctx.Agent || Agent;
  if (!key$agent) error$throw(clone(ctx, Agent$ctx), {error$message: "Agent$ctx.key$agent not present"});
  ctx[key$agent] = Agent$(ctx, Agent$ctx, {self: ctx, key$agent: key$agent});
  return ctx;
}
export function assign__array$agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__array$agent`);
  const Agent$ctx = assign(...Agent$ctx$$)
      , agent$keys = Agent$ctx.agent$keys;
  assign__agent(ctx, Agent$ctx);
  let agent = ctx[Agent$ctx.key$agent];
  assign(agent, {
    push: push,
    remove: remove,
    clear: clear
  });
  clear();
  return ctx;
  function push(...push$ctx$$) {
    log(`${logPrefix}|assign__array$agent|push`);
    let agent$set$ctx = {};
    push$ctx$$.forEach(
      push$ctx => {
        keys(push$ctx).forEach(
          array$key => {
            agent$set$ctx[array$key] = array$concat$$(
              ctx[array$key]||[],
              push$ctx[array$key]);
          }
        );
      }
    );
    agent.set(agent$set$ctx);
    return agent$set$ctx;
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|assign__array$agent|remove`);
    let agent$set$ctx = {};
    remove$ctx$$.forEach(
      remove$ctx => {
        keys(remove$ctx).forEach(
          array$key => {
            agent$set$ctx[array$key] = array$remove(
              agent$set$ctx[array$key]||[],
              ...remove$ctx[array$key]);
          }
        );
      }
    );
    agent.set(agent$set$ctx);
    return agent$set$ctx;
  }
  function clear() {
    log(`${logPrefix}|assign__array$agent|clear`);
    agent.set(agent$keys.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {}));
  }
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
      , agent$reset$guard = Agent$ctx.agent$reset$guard || (() => true)
      , agent$key$expires = `${key$agent}$expires`
      , agent$reset$fn = Agent$ctx.agent$reset$fn || agent$lib__agent$reset$fn
      , Agent$ctx$agent$ttl = Agent$ctx.agent$ttl
      , Agent$ttl = (Agent$ctx$agent$ttl === true && ttl$default) || Agent$ctx$agent$ttl;
  if (!self) error$throw(Agent$ctx, {error$message: "Agent$ctx.self not present"});
  if (!key$agent) error$throw(Agent$ctx, {error$message: "Agent$ctx.key$agent not present"});
  if (!Agent$ctx$agent$keys || !Agent$ctx$agent$keys.length) error$throw(Agent$ctx, {error$message: "Agent$ctx.agent$keys not present"});
  assign(agent, {
    self: self,
    co: agent$co,
    agent$keys$reset: Agent$ctx.agent$keys$reset || agent$lib__agent$keys$reset,
    agent$lib__agent$keys$reset: agent$lib__agent$keys$reset,
    set: agent$set,
    key$agent: key$agent,
    agent$keys: Agent$ctx$agent$keys,
    agent$trigger$change: agent$trigger$change,
    ctx$clone_agent$trigger$change: ctx$clone_agent$trigger$change,
    agent$reset: agent$reset,
    agent$reset$guard: agent$reset$guard,
    agent$lib__agent$reset$fn: agent$lib__agent$reset$fn});
  setTimeout(agent$co, 0); // wait for the agent to be assigned to the ctx
  return agent;
  function agent$co() {
    log(`${logPrefix}|agent$co`);
    return co$catch$error$throw(agent, Agent$ctx);
  }
  function *agent() {
    log(`${logPrefix}|Agent|agent`, key$agent);
    const self = clone(...arguments)
        , self$keys = keys(self)
        , expires = self[agent$key$expires]
        , expired = expires && expires <= new Date()
        , ctx$key$has = ctx$key => self[ctx$key] != null
        , ctx$key$notHas = ctx$key => self[ctx$key] == null
        , ctx$key$notEq = ctx$key => self[ctx$key] != self[ctx$key];
    if (array$every$$(self$keys, ctx$key$has) && array$some$$(self$keys, ctx$key$notEq)) {
      log(`${logPrefix}|Agent|agent|assign__agent`, key$agent, self$keys, array$every$$(self$keys, ctx$key$has), array$some$$(self$keys, ctx$key$notEq));
      agent$set(self);
    } else if (expired || !self$keys.length || array$some$$(self$keys, ctx$key$notHas)) {
      log(`${logPrefix}|Agent|agent|agent$reset`, key$agent);
      yield agent.agent$reset(self);
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
  function *agent$reset() {
    log(`${logPrefix}|Agent|agent$reset`, key$agent);
    let refresh$ctx = clone(...arguments)
      , agent$set$ctx;
    const agent$reset$guard$ = agent$reset$guard(self, refresh$ctx);
    if (agent$reset$guard$ === agent.noop) {
      agent$set$ctx = {}
    } else if (agent$reset$guard$) {
      agent$set$ctx = yield agent$reset$fn(self, refresh$ctx);
    } else {
      // clears out all of the data
      agent$set$ctx = agent$reset$ctx();
    }
    return agent$$trigger$change(self, agent$set$ctx);
  }
  function *agent$lib__agent$reset$fn(self, refresh$ctx) {
    log(`${logPrefix}|Agent|agent$lib__agent$reset$fn`, key$agent, refresh$ctx);
    return refresh$ctx;
  }
  function agent$lib__agent$keys$reset() {
    log(`${logPrefix}|Agent|agent$lib__agent$keys$reset`);
    return agent$$trigger$change(ctx, agent$reset$ctx());
  }
  function agent$reset$ctx() {
    return agent.agent$keys.reduce(
      (memo, agent$key) => {
        memo[agent$key] = null;
        return memo;
      }, {}
    );
  }
}
// TODO: extract protocol: in process cmd, http cmd
export function assign__cmd_agent(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__cmd_agent`);
  const ctx$rest = assign({
            agent$reset$fn: agent$lib$cmd__agent$reset$fn,
            fn$cmd$ctx: agent$lib__fn$cmd$ctx
          }, ...ctx$rest$$)
      , key$agent = ctx$rest.key$agent
      , agent$keys = ctx$rest.agent$keys
      , cmd = ctx$rest.cmd
      , fn$cmd$ctx = ctx$rest.fn$cmd$ctx;
  assign__agent(ctx, ctx$rest);
  let agent = ctx[key$agent];
  assign(agent, {
    noop: "noop",
    agent$lib$cmd__agent$reset$fn: agent$lib$cmd__agent$reset$fn
  });
  return ctx;
  function *agent$lib$cmd__agent$reset$fn(self, refresh$ctx) {
    log(`${logPrefix}|assign__cmd_agent|agent$lib$cmd__agent$reset$fn`, key$agent, cmd);
    const self$clone = clone(...arguments)
        , cmd$ctx = fn$cmd$ctx(refresh$ctx, {
            cmd: cmd,
            log: `${logPrefix}|assign__cmd_agent|agent$lib$cmd__agent$reset$fn|POST /quovo/cmd|${key$agent}|${JSON.stringify(cmd)}`
          })
        , agent$lib__debounce$map = ctx.agent$lib__debounce$map || {}
        , cmd$ctx$json = JSON.stringify(cmd$ctx);
    ctx.agent$lib__debounce$map = agent$lib__debounce$map;
    const cmd$debounce = agent$lib__debounce$map[cmd$ctx$json];
    if (!cmd$debounce) {
      log(`${logPrefix}|assign__cmd_agent|agent$lib$cmd__agent$reset$fn|!cmd$debounce`, key$agent, cmd);
      agent$lib__debounce$map[cmd$ctx$json] = cmd$ctx;
      const response$ctx = yield http$post$cmd(self$clone, cmd$ctx$json)
          , response$ctx$json = yield response$ctx.response.json()
          , refresh$ctx$fn = ctx$rest.refresh$ctx$fn || agent$lib__refresh$ctx$fn
          , agent$values = agent$keys.reduce((memo, agent$key) => {
              memo[agent$key] = refresh$ctx$fn(response$ctx$json, agent$key);
              return memo;
            }, {});
      delete agent$lib__debounce$map[cmd$ctx$json];
      return agent$values;
    }
  }
  function agent$lib__fn$cmd$ctx() {
    log(`${logPrefix}|agent$lib__fn$cmd$ctx`);
    return assign(...arguments);
  }
}
export function http$post$cmd(ctx, cmd$json) {
  log(`${logPrefix}|http$post$cmd`);
  const cmd$json$ = (typeof cmd$json === "string") ?
          cmd$json :
          JSON.stringify(cmd$json)
      , authentication = ctx.authentication
      , authorization$header = authentication &&
          {"Authorization": `${authentication.token_type} ${authentication.access_token}`};
  return xhr.http$post(
    ctx,
    assign__http$headers({
      path: "/cmd",
      body: cmd$json$
    }, contentType$json, authorization$header));
}
export function agent$lib__refresh$ctx$fn(response$ctx, agent$key) {
  log(`${logPrefix}|agent$lib__refresh$ctx$fn`);
  return response$ctx[agent$key];
}
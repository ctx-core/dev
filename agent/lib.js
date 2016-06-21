import {assign,clone,keys,pick} from "ctx-core/object/lib";
import {array$} from "ctx-core/array/lib";
import {error$throw} from "ctx-core/error/lib";
import {array$remove,array$concat$$} from "ctx-core/array/lib";
import {co$catch$error$throw} from "ctx-core/co/lib";
import {assign__http$headers,contentType$json} from "ctx-core/http/lib";
import deepEqual from "deep-equal";
import {xhr,fn$http$descriptor} from "ctx-core/xhr/lib";
import {log,debug} from "ctx-core/logger/lib";
import riot from "riot";
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
export function assign__agent(ctx) {
  log(`${logPrefix}|assign__agent`);
  const Agent$ctx = clone(...arguments)
      , Agent$ = Agent$ctx.Agent || Agent;
  Agent$(...arguments);
  return ctx;
}
export function assign__array$agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__array$agent`);
  const Agent$ctx = assign(...Agent$ctx$$)
      , scope = Agent$ctx.scope;
  assign__agent(ctx, Agent$ctx);
  let agent = ctx[Agent$ctx.key];
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
    agent.set(scope.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {}));
  }
}
// TODO: agent$ctx clones snapshot of ctx sans agent$ctx
// Updates occur from difference between ctx & agent$ctx
// Then update agent$ctx to ctx clone
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
      if (maybe$agent && maybe$agent.key) memo.push(maybe$agent);
      return memo;
    }, []);
}
export function Agent(ctx) {
  log(`${logPrefix}|Agent`);
  const Agent$ctx = clone(...arguments)
      , key = Agent$ctx.key
      , force = Agent$ctx.force;
  if (!key) error$throw(Agent$ctx, {error$message: "Agent$ctx.key not present"});
  if (!force && ctx[key]) return ctx;
  observable(agent);
  const scope = Agent$ctx.scope
      , before$set = Agent$ctx.before$set
      , fn$reset$guard = Agent$ctx.fn$reset$guard || (() => true)
      , expires$key = `${key}$expires`
      , reset$fn = Agent$ctx.reset$fn ||
          (Agent$ctx.fn$reset$fn && Agent$ctx.fn$reset$fn(ctx, Agent$ctx)) ||
          core__reset$fn
      , Agent$ctx$agent$ttl = Agent$ctx.agent$ttl
      , Agent$ttl = (Agent$ctx$agent$ttl === true && ttl$default) || Agent$ctx$agent$ttl;
  let init$$ = [];
  array$(arguments).forEach(arg => {
    if (arg.init) init$$.push(arg.init);
  });
  if (!ctx) error$throw(Agent$ctx, {error$message: "Agent$ctx.ctx not present"});
  if (!key) error$throw(Agent$ctx, {error$message: "Agent$ctx.key not present"});
  if (!scope || !scope.length) error$throw(Agent$ctx, {error$message: "Agent$ctx.scope not present"});
  assign(agent, {
    noop: "noop",
    scope$reset: Agent$ctx.scope$reset || core__scope$reset,
    core__scope$reset: core__scope$reset,
    before$set: before$set,
    set: agent$set,
    key: key,
    scope: scope,
    agent$trigger$change: agent$trigger$change,
    ctx$clone_agent$trigger$change: ctx$clone_agent$trigger$change,
    clear: clear,
    reset: reset,
    co$reset: co$reset,
    fn$reset$guard: fn$reset$guard,
    core__reset$fn: core__reset$fn});
  setTimeout(co$reset, 0); // wait for the agent to be assigned to the ctx
  ctx[key] = agent;
  init$$.forEach(init => init(agent));
  return agent;
  function *agent() {
    log(`${logPrefix}|Agent|agent`, key);
    if (arguments.length) {
      agent$set(...arguments);
    }
    return pick(ctx, key, ...scope);
  }
  function agent$co() {
    log(`${logPrefix}|agent$co`);
    return co$catch$error$throw(Agent$ctx, agent);
  }
  function co$reset() {
    log(`${logPrefix}|co$reset`);
    return co$catch$error$throw(Agent$ctx, agent.reset);
  }
  function agent$set() {
    log(`${logPrefix}|Agent|agent$set`, key);
    let set$ctx = clone(...arguments);
    if (agent.before$set) set$ctx = agent.before$set(set$ctx);
    agent$$trigger$change(
      ctx,
      pick(set$ctx, ...scope),
      () => {
        if (Agent$ttl) ctx[expires$key] = new Date(new Date().getTime + Agent$ttl);
      });
    return ctx;
  }
  function agent$trigger$change() {
    log(`${logPrefix}|Agent|agent$trigger$change`, key);
    setTimeout(() => {
      log(`${logPrefix}|Agent|agent$trigger$change|setTimeout`, key);
      agent.trigger("change", ctx);
    }, 0);
  }
  function ctx$clone_agent$trigger$change(clone$ctx) {
    log(`${logPrefix}|Agent|ctx$clone_agent$trigger$change`);
    if (agent.scope.some(
      scope$key =>
        !deepEqual(ctx[scope$key], clone$ctx[scope$key]))
    ) {
      agent.agent$trigger$change();
    }
  }
  function clear() {
    log(`${logPrefix}|Agent|clear`);
    return agent$$trigger$change(ctx, fn$clear$ctx());
  }
  function *reset() {
    log(`${logPrefix}|Agent|reset`, key);
    let reset$ctx = clone(...arguments)
      , agent$set$ctx;
    const reset$guard = fn$reset$guard(ctx, reset$ctx);
    if (reset$guard === agent.noop) {
      agent$set$ctx = {}
    } else if (reset$guard) {
      agent$set$ctx = yield reset$fn(ctx, reset$ctx);
    } else {
      // clears out all of the data
      agent$set$ctx = fn$clear$ctx();
    }
    return agent$$trigger$change(ctx, agent$set$ctx);
  }
  function *core__reset$fn(ctx, reset$ctx) {
    log(`${logPrefix}|Agent|core__reset$fn`, key, reset$ctx);
    return reset$ctx;
  }
  function core__scope$reset() {
    log(`${logPrefix}|Agent|core__scope$reset`);
    return agent$$trigger$change(ctx, fn$clear$ctx());
  }
  function fn$clear$ctx() {
    return agent.scope.reduce(
      (memo, agent$key) => {
        memo[agent$key] = null;
        return memo;
      }, {}
    );
  }
}
export function assign__http_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__http_agent`);
  assign__agent(ctx, fn$http_Agent$ctx(ctx, ...Agent$ctx$$));
  return ctx;
}
export function fn$http_Agent$ctx(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|fn$http_Agent$ctx`);
  const Agent$ctx = assign({
    fn$reset$fn: http__fn$reset$fn
  }, ...Agent$ctx$$);
  return Agent$ctx;
}
export function http__fn$reset$fn(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|http__fn$reset$fn`);
  const Agent$ctx = assign({
            fn$http$ctx: core__fn$http$ctx
          }, ...Agent$ctx$$)
      , key = Agent$ctx.key
      , fn$http$ctx = Agent$ctx.fn$http$ctx;
  return core$http__reset$fn;
  function *core$http__reset$fn(ctx, reset$ctx) {
    log(`${logPrefix}|http__fn$reset$fn|core$http__reset$fn`, key);
    const ctx$clone = clone(...arguments)
        , http$ctx = fn$http$ctx(reset$ctx)
        , core__debounce$map = ctx.core__debounce$map || {}
        , http$request$descriptor = fn$http$descriptor(http$ctx);
    ctx.core__debounce$map = core__debounce$map;
    const debounce = core__debounce$map[http$request$descriptor];
    if (!debounce) {
      try {
        log(`${logPrefix}|http__fn$reset$fn|core$http__reset$fn|!cmd$debounce`, key);
        core__debounce$map[http$request$descriptor] = http$ctx;
        let response$ctx;
        try {
          response$ctx = yield xhr(ctx$clone, http$ctx)
        } catch (error$ctx) {
          response$ctx = error$ctx;
          if (error$ctx.response$status !== 404) error$throw(error$ctx);
        }
        const fn$reset$ctx = Agent$ctx.fn$reset$ctx || core$http__fn$reset$ctx
            , reset$ctx = yield fn$reset$ctx(response$ctx);
        return reset$ctx;
      } finally {
        delete core__debounce$map[http$request$descriptor];
      }
    }
  }
  function core__fn$http$ctx() {
    log(`${logPrefix}|http__fn$reset$fn|core__fn$http$ctx`);
    return assign(...arguments);
  }
}
export function assign__cmd_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__cmd_agent`);
  assign__agent(ctx, fn$cmd_Agent$ctx(ctx, ...Agent$ctx$$));
  return ctx;
}
export function fn$cmd_Agent$ctx(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|fn$cmd_Agent$ctx`);
  const Agent$ctx = assign({
    fn$reset$fn: cmd__fn$reset$fn
  }, ...Agent$ctx$$);
  return Agent$ctx;
}
export function cmd__fn$reset$fn(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|cmd__fn$reset$fn`);
  const Agent$ctx = assign({
          fn$cmd$ctx: core__fn$cmd$ctx
        }, ...Agent$ctx$$)
      , key = Agent$ctx.key
      , cmd = Agent$ctx.cmd
      , fn$cmd$ctx = Agent$ctx.fn$cmd$ctx;
  return cmd__reset$fn;
  function *cmd__reset$fn(ctx, reset$ctx) {
    log(`${logPrefix}|cmd__fn$reset$fn|cmd__reset$fn`, key, cmd);
    const ctx$clone = clone(...arguments)
        , cmd$ctx = fn$cmd$ctx(reset$ctx, {
            cmd: cmd,
            log: `${logPrefix}|cmd__fn$reset$fn|cmd__reset$fn|POST /quovo/cmd|${key}|${JSON.stringify(cmd)}`
          })
        , core__debounce$map = ctx.core__debounce$map || {}
        , cmd$ctx$json = JSON.stringify(cmd$ctx);
    ctx.core__debounce$map = core__debounce$map;
    const cmd$debounce = core__debounce$map[cmd$ctx$json];
    if (!cmd$debounce) {
      log(`${logPrefix}|cmd__fn$reset$fn|cmd__reset$fn|!cmd$debounce`, key, cmd);
      core__debounce$map[cmd$ctx$json] = cmd$ctx;
      const response$ctx = yield http$post$cmd(ctx$clone, cmd$ctx$json)
          , fn$reset$ctx = Agent$ctx.fn$reset$ctx || core$json__fn$reset$ctx
          , reset$ctx = yield fn$reset$ctx(response$ctx);
      delete core__debounce$map[cmd$ctx$json];
      return reset$ctx;
    }
  }
  function core__fn$cmd$ctx() {
    log(`${logPrefix}|core__fn$cmd$ctx`);
    return assign(...arguments);
  }
}
// TODO: Extract authentication
export function http$post$cmd(ctx, cmd$json) {
  log(`${logPrefix}|http$post$cmd`);
  const cmd$json$ = (typeof cmd$json === "string") ?
          cmd$json :
          JSON.stringify(cmd$json)
      , cmd$authentication = ctx.cmd$authentication
      , authorization$header = cmd$authentication &&
          {"Authorization": `${cmd$authentication.token_type} ${cmd$authentication.access_token}`};
  return xhr.http$post(
    ctx,
    assign__http$headers({
      path: "/cmd",
      body: cmd$json$
    }, contentType$json, authorization$header));
}
export function *core$json__fn$reset$ctx(response$ctx) {
  log(`${logPrefix}|core$json__fn$reset$ctx`);
  const response$json = yield response$ctx.response.json();
  return response$json
}
export function *core$http__fn$reset$ctx(response$value) {
  log(`${logPrefix}|core$http__fn$reset$ctx`);
  return response$value;
}
export function *core$ctx__fn$reset$ctx(response$ctx) {
  log(`${logPrefix}|core$ctx__fn$reset$ctx`);
  return response$ctx;
}
import {assign,clone,keys,pick} from "ctx-core/object/lib";
import {array$from} from "ctx-core/array/lib";
import {throw__error} from "ctx-core/error/lib";
import {array$remove,array$concat} from "ctx-core/array/lib";
import {co__promise$catch} from "ctx-core/co/lib";
import {assign__http$headers,contentType__json} from "ctx-core/http/lib";
import deepEqual from "deep-equal";
import {fetch,new__http$descriptor} from "ctx-core/fetch/lib";
import {log,debug} from "ctx-core/logger/lib";
const observable = riot.observable
    , logPrefix = "ctx-core/agent/lib";
export const ttl$default = 3600000;
export const assign__agents = assign__new__agents(assign__agent);
export function assign__new__agents(new__agent) {
  return function assign__new__agents$(ctx, ...agent$ctx$$) {
    agent$ctx$$.forEach(agent$ctx => new__agent(ctx, agent$ctx));
    return ctx;
  }
}
export function assign__agent(ctx) {
  log(`${logPrefix}|assign__agent`);
  const agent$ctx = clone(...arguments)
      , new__agent__local = agent$ctx.new__agent || new__agent;
  new__agent__local(...arguments);
  return ctx;
}
export function assign__agent__array(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__array`);
  const agent$ctx = assign(...agent$ctx$$)
      , scope = agent$ctx.scope;
  assign__agent(ctx, agent$ctx);
  let agent = ctx[agent$ctx.key];
  assign(agent, {
    push: push,
    remove: remove,
    clear: clear
  });
  clear();
  return ctx;
  function push(...push$ctx$$) {
    log(`${logPrefix}|assign__agent__array|push`);
    let agent$set$ctx = {};
    push$ctx$$.forEach(
      push$ctx => {
        keys(push$ctx).forEach(
          array$key => {
            agent$set$ctx[array$key] = array$concat(
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
    log(`${logPrefix}|assign__agent__array|remove`);
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
    log(`${logPrefix}|assign__agent__array|clear`);
    agent.set(scope.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {}));
  }
}
// TODO: agent$ctx clones snapshot of ctx sans agent$ctx
// Updates occur from difference between ctx & agent$ctx
// Then update agent$ctx to ctx clone
export function change__agents(ctx, ctx$rest, fn) {
  log(`${logPrefix}|change__agents`);
  const ctx$clone = clone(ctx);
  assign(ctx, ctx$rest);
  if (fn) fn(ctx);
  ctx$clone__change__agents(ctx$clone);
  return ctx;
}
export function ctx$clone__change__agents(ctx$clone) {
  log(`${logPrefix}|ctx$clone__change__agents`);
  new__agent$$(ctx$clone).forEach(
    agent =>
      agent.ctx$clone__change__agent(ctx$clone));
}
export function new__agent$$() {
  log(`${logPrefix}|new__agent$$`);
  let ctx = assign(...arguments);
  return keys(ctx).reduce(
    (memo, key) => {
      const maybe$agent = ctx[key];
      if (maybe$agent && maybe$agent.key) memo.push(maybe$agent);
      return memo;
    }, []);
}
export function new__agent(ctx) {
  log(`${logPrefix}|new__agent`);
  const agent$ctx = clone(...arguments)
      , key = agent$ctx.key
      , force = agent$ctx.force;
  if (!key) throw__error(agent$ctx, {error_message: "agent$ctx.key not present"});
  if (!force && ctx[key]) return ctx;
  observable(agent);
  const scope = agent$ctx.scope
      , before$set = agent$ctx.before$set
      , reset$guard = agent$ctx.reset$guard || (() => true)
      , expires$key = `${key}$expires`
      , reset__ctx = agent$ctx.reset__ctx ||
          (agent$ctx.new__reset__ctx && agent$ctx.new__reset__ctx(ctx, agent$ctx)) ||
          reset__core__ctx
      , agent$ctx__agent$ttl = agent$ctx.agent$ttl
      , agent$ttl = (agent$ctx__agent$ttl === true && ttl$default) || agent$ctx__agent$ttl;
  let init$$ = [];
  array$from(arguments).forEach(arg => {
    if (arg.init) init$$.push(arg.init);
  });
  if (!ctx) throw__error(agent$ctx, {error_message: "agent$ctx.ctx not present"});
  if (!key) throw__error(agent$ctx, {error_message: "agent$ctx.key not present"});
  if (!scope || !scope.length) throw__error(agent$ctx, {error_message: "agent$ctx.scope not present"});
  assign(agent, {
    noop: "noop",
    reset__scope: agent$ctx.reset__scope || core__reset__scope,
    core__reset__scope: core__reset__scope,
    before$set: before$set,
    set: agent$set,
    key: key,
    scope: scope,
    change__agent: change__agent,
    ctx$clone__change__agent: ctx$clone__change__agent,
    clear: clear,
    reset: reset,
    co$reset: co$reset,
    reset$guard: reset$guard,
    reset__core__ctx: reset__core__ctx});
  setTimeout(co$reset, 0); // wait for the agent to be assigned to the ctx
  ctx[key] = agent;
  init$$.forEach(init => init(agent));
  return agent;
  function *agent() {
    log(`${logPrefix}|new__agent|agent`, key);
    if (arguments.length) {
      agent$set(...arguments);
    }
    return pick(ctx, key, ...scope);
  }
  function agent$co() {
    log(`${logPrefix}|agent$co`);
    return co__promise$catch(agent$ctx, agent);
  }
  function co$reset() {
    log(`${logPrefix}|co$reset`);
    return co__promise$catch(agent$ctx, agent.reset);
  }
  function agent$set() {
    log(`${logPrefix}|new__agent|agent$set`, key);
    let set$ctx = clone(...arguments);
    if (agent.before$set) set$ctx = agent.before$set(set$ctx);
    change__agents(
      ctx,
      pick(set$ctx, ...scope),
      () => {
        if (agent$ttl) ctx[expires$key] = new Date(new Date().getTime + agent$ttl);
      });
    return ctx;
  }
  function change__agent() {
    log(`${logPrefix}|new__agent|change__agent`, key);
    setTimeout(() => {
      log(`${logPrefix}|new__agent|change__agent|setTimeout`, key);
      agent.trigger("change", ctx);
    }, 0);
  }
  function ctx$clone__change__agent(clone$ctx) {
    log(`${logPrefix}|Agent|ctx$clone__change__agent`);
    if (agent.scope.some(
      scope$key =>
        !deepEqual(ctx[scope$key], clone$ctx[scope$key]))
    ) {
      agent.change__agent();
    }
  }
  function clear() {
    log(`${logPrefix}|new__agent|clear`);
    return change__agents(ctx, new__clear$ctx());
  }
  function *reset() {
    log(`${logPrefix}|new__agent|reset`, key);
    let reset$ctx = clone(...arguments)
      , agents$ctx;
    const reset$guard$ = reset$guard(ctx, reset$ctx);
    if (reset$guard$ === agent.noop) {
      agents$ctx = {}
    } else if (reset$guard$) {
      agents$ctx = yield reset__ctx(ctx, reset$ctx);
    } else {
      // clears out all of the data
      agents$ctx = new__clear$ctx();
    }
    return change__agents(ctx, agents$ctx);
  }
  function *reset__core__ctx(ctx, reset$ctx) {
    log(`${logPrefix}|new__agent|reset__core__ctx`, key, reset$ctx);
    return reset$ctx;
  }
  function core__reset__scope() {
    log(`${logPrefix}|new__agent|core__reset__scope`);
    return change__agents(ctx, new__clear$ctx());
  }
  function new__clear$ctx() {
    return agent.scope.reduce(
      (memo, agent$key) => {
        memo[agent$key] = null;
        return memo;
      }, {}
    );
  }
}
export function agent__agent__http(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__agent__http`);
  assign__agent(ctx, new__agent$ctx__http(ctx, ...agent$ctx$$));
  return ctx;
}
export function new__agent$ctx__http(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__agent$ctx__http`);
  const agent$ctx = assign({
    new__reset__ctx: new__reset__ctx__http
  }, ...agent$ctx$$);
  return agent$ctx;
}
export function new__reset__ctx__http(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__reset__ctx__http`);
  const agent$ctx = assign({
            new__http$ctx: new__http$ctx__core
          }, ...agent$ctx$$)
      , key = agent$ctx.key
      , new__http$ctx = agent$ctx.new__http$ctx;
  return core$http__reset__ctx;
  function *core$http__reset__ctx(ctx, reset$ctx) {
    log(`${logPrefix}|new__reset__ctx__http|core$http__reset__ctx`, key);
    const ctx$clone = clone(...arguments)
        , http$ctx = new__http$ctx(reset$ctx)
        , core__debounce$table = ctx.core__debounce$table || {}
        , http$request$descriptor = new__http$descriptor(http$ctx);
    ctx.core__debounce$table = core__debounce$table;
    const debounce = core__debounce$table[http$request$descriptor];
    if (!debounce) {
      try {
        log(`${logPrefix}|new__reset__ctx__http|core$http__reset__ctx|!cmd$debounce`, key);
        core__debounce$table[http$request$descriptor] = http$ctx;
        let response$ctx;
        try {
          response$ctx = yield fetch(ctx$clone, http$ctx)
        } catch (error$ctx) {
          response$ctx = error$ctx;
          if (error$ctx.response$status !== 404) throw__error(error$ctx);
        }
        const new__reset$ctx = agent$ctx.new__reset$ctx || new__reset$ctx__corehttp
            , reset$ctx = yield new__reset$ctx(response$ctx);
        return reset$ctx;
      } finally {
        delete core__debounce$table[http$request$descriptor];
      }
    }
  }
  function new__http$ctx__core() {
    log(`${logPrefix}|new__reset__ctx__http|new__http$ctx__core`);
    return assign(...arguments);
  }
}
export function assign__agent__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__rpc`);
  assign__agent(ctx, new__agent$ctx__rpc(ctx, ...agent$ctx$$));
  return ctx;
}
export function new__agent$ctx__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__agent$ctx__rpc`);
  const agent$ctx = assign({
    new__reset__ctx: new__reset__ctx__rpc
  }, ...agent$ctx$$);
  return agent$ctx;
}
export function new__reset__ctx__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__reset__ctx__rpc`);
  const agent$ctx = assign({
          new__rpc$ctx: new__rpc$ctx__core
        }, ...agent$ctx$$)
      , key = agent$ctx.key
      , rpc = agent$ctx.rpc
      , new__rpc$ctx = agent$ctx.new__rpc$ctx;
  return rpc__reset__ctx;
  function *rpc__reset__ctx(ctx, reset$ctx) {
    log(`${logPrefix}|new__reset__ctx__rpc|rpc__reset__ctx`, key, rpc);
    const ctx$clone = clone(...arguments)
        , rpc$ctx = new__rpc$ctx(reset$ctx, {
            rpc: rpc,
            log: `${logPrefix}|new__reset__ctx__rpc|rpc__reset__ctx|POST /rpc|${key}|${JSON.stringify(rpc)}`
          })
        , core__debounce$table = ctx.core__debounce$table || {}
        , rpc$ctx$json = JSON.stringify(rpc$ctx);
    ctx.core__debounce$table = core__debounce$table;
    const rpc$debounce = core__debounce$table[rpc$ctx$json];
    if (!rpc$debounce) {
      log(`${logPrefix}|new__reset__ctx__rpc|rpc__reset__ctx|!cmd$debounce`, key, rpc);
      core__debounce$table[rpc$ctx$json] = rpc$ctx;
      const response$ctx = yield http$post__rpc(ctx$clone, rpc$ctx$json)
          , new__reset$ctx = agent$ctx.new__reset$ctx || new__reset$ctx__corejson
          , reset$ctx = yield new__reset$ctx(response$ctx);
      delete core__debounce$table[rpc$ctx$json];
      return reset$ctx;
    }
  }
  function new__rpc$ctx__core() {
    log(`${logPrefix}|new__rpc$ctx__core`);
    return assign(...arguments);
  }
}
// TODO: Extract authentication
export function http$post__rpc(ctx, rpc$json) {
  log(`${logPrefix}|http$post__rpc`);
  const rpc$json$ = (typeof rpc$json === "string") ?
          rpc$json :
          JSON.stringify(rpc$json)
      , rpc$authentication = ctx.rpc$authentication
      , authorization$header = rpc$authentication &&
          {"Authorization": `${rpc$authentication.token_type} ${rpc$authentication.access_token}`};
  return fetch.http$post(
    ctx,
    assign__http$headers({
      path: "/rpc",
      body: rpc$json$
    }, contentType__json, authorization$header));
}
export function *new__reset$ctx__corejson(response$ctx) {
  log(`${logPrefix}|new__reset$ctx__corejson`);
  const response$json = yield response$ctx.response.json();
  return response$json
}
export function *new__reset$ctx__corehttp(response$value) {
  log(`${logPrefix}|new__reset$ctx__corehttp`);
  return response$value;
}
export function *new__reset$ctx__core(response$ctx) {
  log(`${logPrefix}|new__reset$ctx__core`);
  return response$ctx;
}
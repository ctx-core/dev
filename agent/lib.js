import {assign,clone,keys,pick} from "ctx-core/object/lib";
import {array$from} from "ctx-core/array/lib";
import {throw__error} from "ctx-core/error/lib";
import {array$remove,array$concat} from "ctx-core/array/lib";
import {co} from "co";
import {co__promise$catch} from "ctx-core/co/lib";
import {assign__http$headers,contentType__json} from "ctx-core/http/lib";
import {
  assign$maybe__table__debounce,
  assign$key__table__debounce,
  call$key__table__debounce} from "ctx-core/debounce/lib";
import deepEqual from "deep-equal";
import {fetch,new__fetch$descriptor} from "ctx-core/fetch/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const observable = riot.observable
    , logPrefix = "ctx-core/agent/lib";
export const ttl$default = 3600000;
export function assign__agents(ctx, ...agent$ctx$$) {
  agent$ctx$$.forEach(agent$ctx => new__agent(ctx, agent$ctx));
  return ctx;
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
  const ctx$original = clone(ctx);
  assign(ctx, ctx$rest);
  if (fn) fn(ctx);
  filter__agents(ctx$original).forEach(
    agent =>
      agent.change__agent(ctx$original));
  return ctx;
}
export function filter__agents() {
  log(`${logPrefix}|filter__agents`);
  let ctx = assign(...arguments);
  return keys(ctx).reduce(
    (memo, key) => {
      const maybe$agent = ctx[key];
      if (maybe$agent && maybe$agent.key) memo.push(maybe$agent);
      return memo;
    }, []);
}
export function new__agent(ctx) {
  const agent$ctx = clone(...arguments)
      , key = agent$ctx.key
      , force = agent$ctx.force;
  log(`${logPrefix}|new__agent`, key);
  if (!key) throw__error(agent$ctx, {error_message: "agent$ctx.key not present"});
  if (!force && ctx[key]) return ctx;
  observable(agent);
  const scope = agent$ctx.scope
      , before$set = agent$ctx.before$set
      , reset$guard = agent$ctx.reset$guard || (() => true)
      , expires$key = `${key}$expires`
      , assign__reset$ctx = agent$ctx.assign__reset$ctx ||
          (agent$ctx.new__assign__reset$ctx && agent$ctx.new__assign__reset$ctx(ctx, agent$ctx)) ||
          assign__reset$ctx__core
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
    loaded: loaded,
    reset__scope: agent$ctx.reset__scope || core__reset__scope,
    core__reset__scope: core__reset__scope,
    before$set: before$set,
    set: agent$set,
    key: key,
    scope: scope,
    change__agent: change__agent,
    clear: clear,
    reset: reset,
    co$reset: co$reset,
    reset$guard: reset$guard,
    assign__reset$ctx__core: assign__reset$ctx__core});
  ctx[key] = agent;
  init$$.forEach(init => init(agent));
  let loaded$promise = new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|new__agent|loaded$promise`, key);
      setTimeout(
        co.wrap(function *() {
          try {
            log(`${logPrefix}|new__agent|loaded$promise|setTimeout`, key);
            yield agent.reset();
            resolve(ctx);
          } catch (error$ctx) {
            error(`${logPrefix}|new__agent|loaded$promise|setTimeout|error`, key);
            reject(error$ctx);
          }
        }), 0)
    }); // wait for the agent to be assigned to the ctx
  return agent;
  function *agent() {
    log(`${logPrefix}|new__agent|agent`, key);
    if (arguments.length) {
      agent$set(...arguments);
    }
    return pick(ctx, key, ...scope);
  }
  function *loaded() {
    log(`${logPrefix}|new__agent|loaded`, key);
    return loaded$promise;
  }
  function agent$co() {
    log(`${logPrefix}|agent$co`, key);
    return co__promise$catch(agent$ctx, agent);
  }
  function co$reset(...args) {
    log(`${logPrefix}|co$reset`, key);
    return co__promise$catch(agent$ctx, function *() {
      log(`${logPrefix}|co$reset|fn`, key);
      return yield agent.reset(...args);
    });
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
  function change__agent(clone$ctx) {
    log(`${logPrefix}|new__agent|change__agent`, key);
    if (agent.scope.some(
      scope$key => {
        return !deepEqual(ctx[scope$key], clone$ctx[scope$key]);
      })
    ) {
      setTimeout(() => {
        log(`${logPrefix}|new__agent|change__agent|setTimeout`, key);
        agent.trigger("change", ctx);
      }, 0);
    }
  }
  function clear() {
    log(`${logPrefix}|new__agent|clear`);
    return change__agents(ctx, new__clear$ctx());
  }
  function *reset() {
    log(`${logPrefix}|new__agent|reset`, key);
    let reset$ctx = clone(...arguments)
      , agent$ctx;
    const reset$guard$ = reset$guard(ctx, reset$ctx);
    if (reset$guard$ === agent.noop) {
      log(`${logPrefix}|new__agent|reset|noop`, key);
      agent$ctx = {}
    } else if (reset$guard$) {
      log(`${logPrefix}|new__agent|reset|yield`, key);
      agent$ctx = yield assign__reset$ctx(ctx, reset$ctx);
    } else {
      log(`${logPrefix}|new__agent|reset|clear`, key);
      // clears out all of the data
      agent$ctx = new__clear$ctx();
    }
    return change__agents(ctx, agent$ctx);
  }
  function *assign__reset$ctx__core(ctx, reset$ctx) {
    log(`${logPrefix}|new__agent|assign__reset$ctx__core`, key);
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
export function assign__agent__fetch(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__fetch`);
  assign__agent(ctx, new__agent$ctx__fetch(ctx, ...agent$ctx$$));
  return ctx;
}
export function new__agent$ctx__fetch(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__agent$ctx__fetch`);
  const agent$ctx = assign({
    new__assign__reset$ctx: new__assign__reset$ctx__fetch
  }, ...agent$ctx$$);
  return agent$ctx;
}
export function new__assign__reset$ctx__fetch(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__assign__reset$ctx__fetch`);
  const agent$ctx = assign({
            new__fetch$ctx: new__fetch$ctx__core
          }, ...agent$ctx$$)
      , key = agent$ctx.key
      , new__fetch$ctx = agent$ctx.new__fetch$ctx;
  assign$maybe__table__debounce(ctx);
  let table__debounce = ctx.table__debounce;
  return assign__reset$ctx__fetch;
  function *assign__reset$ctx__fetch(ctx, reset$ctx) {
    log(`${logPrefix}|new__assign__reset$ctx__fetch|assign__reset$ctx__fetch`, key);
    const ctx$clone = clone(...arguments)
        , fetch$ctx = new__fetch$ctx(reset$ctx)
        , fetch$descriptor = new__fetch$descriptor(fetch$ctx);
    if (!table__debounce[fetch$descriptor]) {
      try {
        log(`${logPrefix}|new__assign__reset$ctx__fetch|assign__reset$ctx__fetch|!cmd$debounce`, key);
        assign$key__table__debounce(ctx, fetch$descriptor);
        let response$ctx;
        try {
          response$ctx = yield fetch(ctx$clone, fetch$ctx);
        } catch (error$ctx) {
          response$ctx = error$ctx;
          if (error$ctx.response$status !== 404) throw__error(error$ctx);
        }
        const new__reset$ctx = agent$ctx.new__reset$ctx || new__reset$ctx__fetch
            , reset$ctx = yield new__reset$ctx(response$ctx);
        return reset$ctx;
      } finally {
        call$key__table__debounce(ctx, fetch$descriptor);
      }
    }
  }
  function new__fetch$ctx__core() {
    log(`${logPrefix}|new__assign__reset$ctx__fetch|new__fetch$ctx__core`);
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
    new__assign__reset$ctx: new__assign__reset$ctx__rpc
  }, ...agent$ctx$$);
  return agent$ctx;
}
export function new__assign__reset$ctx__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__assign__reset$ctx__rpc`);
  const agent$ctx = assign({
          new__rpc$ctx: new__rpc$ctx__core
        }, ...agent$ctx$$)
      , key = agent$ctx.key
      , rpc = agent$ctx.rpc
      , new__rpc$ctx = agent$ctx.new__rpc$ctx;
  assign$maybe__table__debounce(ctx);
  let table__debounce = ctx.table__debounce;
  return assign__reset$ctx__rpc;
  function *assign__reset$ctx__rpc(ctx, reset$ctx) {
    log(`${logPrefix}|new__assign__reset$ctx__rpc|assign__reset$ctx__rpc`, key);
    const ctx$clone = clone(...arguments), rpc$ctx = new__rpc$ctx(reset$ctx, {
      rpc: rpc, log: `${logPrefix}|new__assign__reset$ctx__rpc|assign__reset$ctx__rpc|POST /rpc|${key}|${JSON.stringify(rpc)}`
    }), rpc$ctx$json = JSON.stringify(rpc$ctx);
    if (!table__debounce[rpc$ctx$json]) {
      try {
        log(`${logPrefix}|new__assign__reset$ctx__rpc|assign__reset$ctx__rpc|!cmd$debounce`, key, rpc);
        assign$key__table__debounce(ctx, rpc$ctx$json);
        const response$ctx = yield http$post__rpc(ctx$clone, rpc$ctx$json)
            , new__reset$ctx = agent$ctx.new__reset$ctx || new__reset$ctx__json
            , reset$ctx = yield new__reset$ctx(response$ctx);
        return reset$ctx;
      } finally {
        call$key__table__debounce(ctx, rpc$ctx$json);
      }
    }
  }
  function new__rpc$ctx__core() {
    log(`${logPrefix}|new__rpc$ctx__core`);
    return assign(...arguments);
  }
}
// TODO: Extract authentication
export function *http$post__rpc(ctx, rpc$json) {
  log(`${logPrefix}|http$post__rpc`);
  const rpc$json$ = (typeof rpc$json === "string") ?
          rpc$json :
          JSON.stringify(rpc$json)
      , rpc$authentication = ctx.rpc$authentication
      , authorization$header = rpc$authentication &&
          {"Authorization": `${rpc$authentication.token_type} ${rpc$authentication.access_token}`};
  return yield fetch.http$post(
    ctx,
    assign__http$headers({
      path: "/rpc",
      body: rpc$json$
    }, contentType__json, authorization$header));
}
export function *new__reset$ctx__json(response$ctx) {
  log(`${logPrefix}|new__reset$ctx__json`);
  const response$json = yield response$ctx.response.json();
  return response$json
}
export function *new__reset$ctx__fetch(response$value) {
  log(`${logPrefix}|new__reset$ctx__fetch`);
  return response$value;
}
export function *new__reset$ctx__core(response$ctx) {
  log(`${logPrefix}|new__reset$ctx__core`);
  return response$ctx;
}
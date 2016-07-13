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
export const assign__agent$$ = assign__agent$$__fn(assign__agent);
export function assign__agent$$__fn(fn) {
  return function assign__agent$$__fn$(ctx, ...agent$ctx$$) {
    agent$ctx$$.forEach(Agent$ctx => fn(ctx, Agent$ctx));
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
export function assign__agent__array(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__array`);
  const Agent$ctx = assign(...agent$ctx$$)
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
export function change__agent$$(ctx, ctx$rest, fn) {
  log(`${logPrefix}|change__agent$$`);
  const ctx$clone = clone(ctx);
  assign(ctx, ctx$rest);
  if (fn) fn(ctx);
  ctx$clone__change__agent$$(ctx$clone);
  return ctx;
}
export function ctx$clone__change__agent$$(ctx$clone) {
  log(`${logPrefix}|ctx$clone__change__agent$$`);
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
export function Agent(ctx) {
  log(`${logPrefix}|Agent`);
  const Agent$ctx = clone(...arguments)
      , key = Agent$ctx.key
      , force = Agent$ctx.force;
  if (!key) throw__error(Agent$ctx, {error$message: "Agent$ctx.key not present"});
  if (!force && ctx[key]) return ctx;
  observable(agent);
  const scope = Agent$ctx.scope
      , before$set = Agent$ctx.before$set
      , reset$guard = Agent$ctx.reset$guard || (() => true)
      , expires$key = `${key}$expires`
      , reset__fn = Agent$ctx.reset__fn ||
          (Agent$ctx.new__reset__fn && Agent$ctx.new__reset__fn(ctx, Agent$ctx)) ||
          core__reset__fn
      , Agent$ctx$agent$ttl = Agent$ctx.agent$ttl
      , Agent$ttl = (Agent$ctx$agent$ttl === true && ttl$default) || Agent$ctx$agent$ttl;
  let init$$ = [];
  array$from(arguments).forEach(arg => {
    if (arg.init) init$$.push(arg.init);
  });
  if (!ctx) throw__error(Agent$ctx, {error$message: "Agent$ctx.ctx not present"});
  if (!key) throw__error(Agent$ctx, {error$message: "Agent$ctx.key not present"});
  if (!scope || !scope.length) throw__error(Agent$ctx, {error$message: "Agent$ctx.scope not present"});
  assign(agent, {
    noop: "noop",
    scope$reset: Agent$ctx.scope$reset || core__scope$reset,
    core__scope$reset: core__scope$reset,
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
    core__reset__fn: core__reset__fn});
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
    return co__promise$catch(Agent$ctx, agent);
  }
  function co$reset() {
    log(`${logPrefix}|co$reset`);
    return co__promise$catch(Agent$ctx, agent.reset);
  }
  function agent$set() {
    log(`${logPrefix}|Agent|agent$set`, key);
    let set$ctx = clone(...arguments);
    if (agent.before$set) set$ctx = agent.before$set(set$ctx);
    change__agent$$(
      ctx,
      pick(set$ctx, ...scope),
      () => {
        if (Agent$ttl) ctx[expires$key] = new Date(new Date().getTime + Agent$ttl);
      });
    return ctx;
  }
  function change__agent() {
    log(`${logPrefix}|Agent|change__agent`, key);
    setTimeout(() => {
      log(`${logPrefix}|Agent|change__agent|setTimeout`, key);
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
    log(`${logPrefix}|Agent|clear`);
    return change__agent$$(ctx, new__clear$ctx());
  }
  function *reset() {
    log(`${logPrefix}|Agent|reset`, key);
    let reset$ctx = clone(...arguments)
      , agent$set$ctx;
    const reset$guard$ = reset$guard(ctx, reset$ctx);
    if (reset$guard$ === agent.noop) {
      agent$set$ctx = {}
    } else if (reset$guard$) {
      agent$set$ctx = yield reset__fn(ctx, reset$ctx);
    } else {
      // clears out all of the data
      agent$set$ctx = new__clear$ctx();
    }
    return change__agent$$(ctx, agent$set$ctx);
  }
  function *core__reset__fn(ctx, reset$ctx) {
    log(`${logPrefix}|Agent|core__reset__fn`, key, reset$ctx);
    return reset$ctx;
  }
  function core__scope$reset() {
    log(`${logPrefix}|Agent|core__scope$reset`);
    return change__agent$$(ctx, new__clear$ctx());
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
  assign__agent(ctx, new__http__agent$ctx(ctx, ...agent$ctx$$));
  return ctx;
}
export function new__http__agent$ctx(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__http__agent$ctx`);
  const Agent$ctx = assign({
    new__reset__fn: http__new__reset__fn
  }, ...agent$ctx$$);
  return Agent$ctx;
}
export function http__new__reset__fn(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|http__new__reset__fn`);
  const Agent$ctx = assign({
            new__http$ctx: core__new__http$ctx
          }, ...agent$ctx$$)
      , key = Agent$ctx.key
      , new__http$ctx = Agent$ctx.new__http$ctx;
  return core$http__reset__fn;
  function *core$http__reset__fn(ctx, reset$ctx) {
    log(`${logPrefix}|http__new__reset__fn|core$http__reset__fn`, key);
    const ctx$clone = clone(...arguments)
        , http$ctx = new__http$ctx(reset$ctx)
        , core__debounce$table = ctx.core__debounce$table || {}
        , http$request$descriptor = new__http$descriptor(http$ctx);
    ctx.core__debounce$table = core__debounce$table;
    const debounce = core__debounce$table[http$request$descriptor];
    if (!debounce) {
      try {
        log(`${logPrefix}|http__new__reset__fn|core$http__reset__fn|!cmd$debounce`, key);
        core__debounce$table[http$request$descriptor] = http$ctx;
        let response$ctx;
        try {
          response$ctx = yield fetch(ctx$clone, http$ctx)
        } catch (error$ctx) {
          response$ctx = error$ctx;
          if (error$ctx.response$status !== 404) throw__error(error$ctx);
        }
        const new__reset$ctx = Agent$ctx.new__reset$ctx || core$http__new__reset$ctx
            , reset$ctx = yield new__reset$ctx(response$ctx);
        return reset$ctx;
      } finally {
        delete core__debounce$table[http$request$descriptor];
      }
    }
  }
  function core__new__http$ctx() {
    log(`${logPrefix}|http__new__reset__fn|core__new__http$ctx`);
    return assign(...arguments);
  }
}
export function assign__agent__cmd(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__cmd`);
  assign__agent(ctx, new__cmd_Agent$ctx(ctx, ...agent$ctx$$));
  return ctx;
}
export function new__cmd_Agent$ctx(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|new__cmd_Agent$ctx`);
  const Agent$ctx = assign({
    new__reset__fn: cmd__new__reset__fn
  }, ...agent$ctx$$);
  return Agent$ctx;
}
export function cmd__new__reset__fn(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|cmd__new__reset__fn`);
  const Agent$ctx = assign({
          new__cmd$ctx: core__new__cmd$ctx
        }, ...agent$ctx$$)
      , key = Agent$ctx.key
      , cmd = Agent$ctx.cmd
      , new__cmd$ctx = Agent$ctx.new__cmd$ctx;
  return cmd__reset__fn;
  function *cmd__reset__fn(ctx, reset$ctx) {
    log(`${logPrefix}|cmd__new__reset__fn|cmd__reset__fn`, key, cmd);
    const ctx$clone = clone(...arguments)
        , cmd$ctx = new__cmd$ctx(reset$ctx, {
            cmd: cmd,
            log: `${logPrefix}|cmd__new__reset__fn|cmd__reset__fn|POST /quovo/cmd|${key}|${JSON.stringify(cmd)}`
          })
        , core__debounce$table = ctx.core__debounce$table || {}
        , cmd$ctx$json = JSON.stringify(cmd$ctx);
    ctx.core__debounce$table = core__debounce$table;
    const cmd$debounce = core__debounce$table[cmd$ctx$json];
    if (!cmd$debounce) {
      log(`${logPrefix}|cmd__new__reset__fn|cmd__reset__fn|!cmd$debounce`, key, cmd);
      core__debounce$table[cmd$ctx$json] = cmd$ctx;
      const response$ctx = yield http$post__cmd(ctx$clone, cmd$ctx$json)
          , new__reset$ctx = Agent$ctx.new__reset$ctx || new__core$json__reset$ctx
          , reset$ctx = yield new__reset$ctx(response$ctx);
      delete core__debounce$table[cmd$ctx$json];
      return reset$ctx;
    }
  }
  function core__new__cmd$ctx() {
    log(`${logPrefix}|core__new__cmd$ctx`);
    return assign(...arguments);
  }
}
// TODO: Extract authentication
export function http$post__cmd(ctx, cmd$json) {
  log(`${logPrefix}|http$post__cmd`);
  const cmd$json$ = (typeof cmd$json === "string") ?
          cmd$json :
          JSON.stringify(cmd$json)
      , cmd$authentication = ctx.cmd$authentication
      , authorization$header = cmd$authentication &&
          {"Authorization": `${cmd$authentication.token_type} ${cmd$authentication.access_token}`};
  return fetch.http$post(
    ctx,
    assign__http$headers({
      path: "/cmd",
      body: cmd$json$
    }, contentType__json, authorization$header));
}
export function *new__core$json__reset$ctx(response$ctx) {
  log(`${logPrefix}|new__core$json__reset$ctx`);
  const response$json = yield response$ctx.response.json();
  return response$json
}
export function *core$http__new__reset$ctx(response$value) {
  log(`${logPrefix}|core$http__new__reset$ctx`);
  return response$value;
}
export function *core$ctx__new__reset$ctx(response$ctx) {
  log(`${logPrefix}|core$ctx__new__reset$ctx`);
  return response$ctx;
}
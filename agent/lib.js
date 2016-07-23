/**
 * ctx agents provide observable & management services for a ctx key
 * @module ctx-core/agent/lib
 */
import {assign,clone,keys,pick} from "ctx-core/object/lib";
import {array$from} from "ctx-core/array/lib";
import {throw__missing_argument} from "ctx-core/error/lib";
import {co} from "co";
import {co__promise$catch} from "ctx-core/co/lib";
import deepEqual from "deep-equal";
import {log,error,debug} from "ctx-core/logger/lib";
const observable = riot.observable
    , logPrefix = "ctx-core/agent/lib";
export const ttl$default = 3600000;
/**
 * The ctx used by the agent.
 * @typedef {agent$ctx} agent$ctx
 */
/**
 * Assigns an agent for each agent$ctx onto {@link ctx}.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...agent$ctx} agent$ctx
 * @returns {module:ctx-core/object/lib~ctx} The ctx with assigned agents
 */
export function ensure__agents(ctx, ...agent$ctx$$) {
  return agent$ctx$$.map(agent$ctx => ensure__agent(ctx, agent$ctx));
}
/**
 * {@link ensure__agent} reset function; can be overridden
 * @name reset
 * @function
 * @param {module:ctx-core/object/lib~assign$ctx} assign$ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
/**
 * Ensures an agent is defined on ctx as agent$ctx.key.
 * A new agent is assigned if one is not defined or agent$ctx.force is passed in; Nothing happens otherwise.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @param {string} agent$ctx.key - The ctx assign key for this agent
 * @param {...string} agent$ctx.scope - The keys on ctx that this agent is responsible for.
 * @param {boolean} [agent$ctx.force] The ctx assign key for this agent
 * @param {function} [agent$ctx.before__set] Run before agent.set is called
 * @param {function} [agent$ctx.reset] Run before agent.set is called
 * @param {number} [agent$ctx.agent$ttl]
 * @param {function} [agent$ctx.reset__scope]
 * @returns {module:ctx-core/object/lib~ctx} ctx
 * @throws {module:ctx-core/error/lib~missing_argument}
 */
export function ensure__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent`);
  const agent$ctx = clone(...agent$ctx$$)
      , key = agent$ctx.key
      , force = agent$ctx.force;
  log(`${logPrefix}|ensure__agent`, key);
  if (!ctx) throw__missing_argument(agent$ctx, {key: "ctx"});
  if (!key) throw__missing_argument(agent$ctx, {key: "agent$ctx.key"});
  if (!force && ctx[key]) return ctx[key];
  observable(agent);
  schedule__trigger__change(ctx);
  const scope = agent$ctx.scope
      , before__set = agent$ctx.before__set
      , expires$key = `${key}$expires`
      , reset__do = agent$ctx.reset__do || reset__do__core
      , reset = agent$ctx.reset || reset__do
      , agent$ctx__agent$ttl = agent$ctx.agent$ttl
      , agent$ttl = (agent$ctx__agent$ttl === true && ttl$default) || agent$ctx__agent$ttl;
  let init$$ = [];
  array$from(arguments).forEach(arg => {
    if (arg.init) init$$.push(arg.init);
  });
  if (!scope || !scope.length) {
    throw__missing_argument(agent$ctx, {key: "agent$ctx.scope"}); }
  assign(agent, agent$ctx, {
    type: "agent",
    ctx: ctx,
    loaded: loaded,
    reset__scope: agent$ctx.reset__scope || reset__scope__core,
    reset__scope__core: reset__scope__core,
    before__set: before__set,
    set: agent$set,
    key: key,
    scope: scope,
    trigger__change: trigger__change,
    clear: clear,
    reset: reset,
    reset__do: reset__do,
    reset__noop: reset__noop,
    reset__assign: reset__assign,
    reset__clear: reset__clear,
    co$reset: co$reset});
  ctx[key] = agent;
  init$$.forEach(init => init(agent));
  let loaded$promise = new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|ensure__agent|loaded$promise`, key);
      setTimeout(
        co.wrap(function *() {
          try {
            log(`${logPrefix}|ensure__agent|loaded$promise|setTimeout`, key);
            yield agent.reset();
            resolve(ctx);
          } catch (error$ctx) {
            error(`${logPrefix}|ensure__agent|loaded$promise|setTimeout|error`, key);
            reject(error$ctx);
          }
        }), 0)
    }); // wait for the agent to be assigned to the ctx
  return agent;
  function *agent() {
    log(`${logPrefix}|ensure__agent|agent`, key);
    if (arguments.length) {
      agent$set(...arguments);
    }
    return pick(ctx, key, ...scope);
  }
  function *loaded() {
    log(`${logPrefix}|ensure__agent|loaded`, key);
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
    log(`${logPrefix}|ensure__agent|agent$set`, key);
    let set$ctx = clone(...arguments);
    if (agent.before__set) set$ctx = agent.before__set(set$ctx);
    change__agents(
      ctx,
      pick(set$ctx, ...scope));
    return ctx;
  }
  function trigger__change(agent$baseline$ctx) {
    log(`${logPrefix}|ensure__agent|trigger__change`, key);
    if (agent.scope.some(
      key => !deepEqual(ctx[key], agent$baseline$ctx[key]))
    ) {
      log(`${logPrefix}|ensure__agent|trigger__change|trigger`, key);
      if (agent$ttl) ctx[expires$key] = new Date(new Date().getTime + agent$ttl);
      agent.trigger("change", ctx);
    }
  }
  function clear() {
    log(`${logPrefix}|ensure__agent|clear`);
    return change__agents(ctx, new__clear$ctx());
  }
  function reset__scope__core() {
    log(`${logPrefix}|ensure__agent|reset__scope__core`);
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
/**
 * Perform the intended reset action. Allows wrapping (i.e. debouncing) login in agent.reset
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function *reset__do__core() {
  log(`${logPrefix}|reset__do`);
  const agent = this;
  return yield agent.reset__assign(...arguments);
}
/**
 * noop
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function *reset__noop() {
  log(`${logPrefix}|reset__noop`);
  const agent = this;
  return agent.ctx;
}
/**
 * {@link change__agents} with reset$ctx.
 * @param {assign$ctx} assign$ctx - Assigned to ctx.
 * @returns {module:ctx-core/object/lib~ctx} ctx
 *
 */
export function *reset__assign() {
  // assign__reset$ctx
  log(`${logPrefix}|reset__assign`);
  const agent = this;
  return change__agents(agent.ctx, clone(...arguments));
}
/**
 * {@link change__agents} with null to ctx agent scope values.
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function *reset__clear() {
  const agent = this;
  log(`${logPrefix}|ensure__agent|reset|clear`, agent.key);
  // clears out all of the data
  return agent.clear();
}
/**
 * Callback passing in ctx to be invoked from {@link change__agents}.
 * @callback change__agents__callback
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @example
 * change__agents(ctx, {foo: "bar"}, (ctx) => {assign(ctx, {baz: "quux"})})
 */
/**
 * {@link schedule__trigger__change}, assign assign$ctx to ctx, & run an optional change__agents__callback.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param assign$ctx
 * @param {change__agents__callback} [change__agents__callback] Optional function
 * @returns {module:ctx-core/object/lib~ctx} ctx with assign$ctx assigned
 * @see {@link schedule__trigger__change}
 */
export function change__agents(ctx, assign$ctx, change__agents__callback) {
  log(`${logPrefix}|change__agents`);
  schedule__trigger__change(ctx);
  assign(ctx, assign$ctx);
  if (change__agents__callback) change__agents__callback(ctx);
  return ctx;
}
/**
 * {@link ensure__agent$baseline} & schedule {@link agent.trigger__change} on all agents in the ctx on the next tick.
 * If a trigger__change is already scheduled, no new trigger__change is scheduled.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function schedule__trigger__change(ctx) {
  log(`${logPrefix}|schedule__trigger__change`);
  ensure__agent$baseline(ctx);
  if (!ctx.agent$trigger__change) {
    ctx.agent$trigger__change = setTimeout(() => trigger__change(ctx), 0);
  }
  return ctx;
}
/**
 * Runs {@link agent.trigger__change} on all of the agents in the ctx.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
function trigger__change(ctx) {
  log(`${logPrefix}|trigger__change`);
  const agent$baseline$ctx = ctx.agent$baseline$ctx;
  delete ctx.agent$baseline$ctx;
  delete ctx.agent$trigger__change;
  ensure__agent$baseline(ctx);
  filter__agents(ctx).forEach(
    agent =>
      agent.trigger__change(agent$baseline$ctx));
  return ctx;
}
/**
 * Assigns if blank, {@link ctx.agent$baseline$ctx}.
 * {@link ctx.agent$baseline$ctx} is used to determine which agent keys have changed.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx with {@link ctx.agent$baseline$ctx}
 */
export function ensure__agent$baseline(ctx) {
  log(`${logPrefix}|ensure__agent$baseline`);
  if (!ctx.agent$baseline$ctx) {
    ctx.agent$baseline$ctx = clone(ctx);
  }
  return ctx;
}
/**
 * Returns an array of agents in the ctx.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {agent[]} Agents in the ctx.
 */
export function filter__agents(ctx) {
  log(`${logPrefix}|filter__agents`);
  return keys(ctx).reduce(
    (memo, key) => {
      const maybe$agent = ctx[key];
      if (maybe$agent && maybe$agent.type === "agent") memo.push(maybe$agent);
      return memo;
    }, []);
}
export function new__fetch$ctx__agent() {
  log(`${logPrefix}|new__fetch$ctx`);
  return assign(...arguments);
}
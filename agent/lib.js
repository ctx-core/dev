/**
 * agents provide observable, management services for data on ctx
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
 * @typedef {module:ctx-core/object/lib~ctx} agent$ctx
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
 * @param {function} [agent$ctx.new__set$ctx] New assign$ctx when agent.set is called.
 * @param {function} [agent$ctx.reset] Resets the agent scope values based on an upstream service or agent.
 * @param {function} [agent$ctx.schedule__load] Schedules function to run.
 *  Defaults to {@link schedule__load__reset}.
 *  Often overridden with {@link schedule__load__noop}
 * @param {boolean|number} [agent$ctx.ttl] - Used to set ttl (time to live) on the agent.scope values on the ctx.
 * @returns {module:ctx-core/agent/lib~agent} agent
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
  let resolve__reset__called, reject__reset__called;
  const scope = agent$ctx.scope
      , new__set$ctx = agent$ctx.new__set$ctx || new__set$ctx__core
      , key$expires = `${key}$expires`
      , reset = agent$ctx.reset || reset__core
      , agent$ctx__ttl = agent$ctx.ttl
      , ttl = (agent$ctx__ttl === true && ttl$default) || agent$ctx__ttl
      , reset__called = new Promise((resolve, reject) => {
          resolve__reset__called = resolve;
          reject__reset__called = reject;
        })
      , schedule__load = agent$ctx.schedule__load || schedule__load__reset;
  if (!scope || !scope.length) throw__missing_argument(agent$ctx, {key: "agent$ctx.scope"});
  observable(agent);
  schedule__trigger__change(ctx);
  let init$$ = [];
  array$from(arguments).forEach(arg => {
    if (arg.init) init$$.push(arg.init);
  });
  /**
   * An agent provides management & event services for data on ctx. Agents are observable.
   * @typedef {agent$ctx} agent
   * @property {string} [type="agent"] The object type
   * @property {module:ctx-core/object/lib~ctx} The ctx the agent
   * @property {Promise} reset__called - A Promise that resolves when the first reset. Ensure agent.{@link module:ctx-core/agent/lib~reset__core} is called by agent.reset.
   * @property {function} resolve__reset__called - Resolves agent.reset__called Promise.
   * @property {function} reject__reset__called - Rejects agent.reset__called Promise.
   * @property {function} reject__reset__called - Rejects agent.reset__called Promise.
   * @property {function} new__set$ctx - New set$ctx to assign to ctx. Called by agent.set.
   * @property {function} set - Assigns the agent.scope of the given set$ctx onto ctx.
   * @property {function} on - On event handler.
   * @property {function} trigger__change - Triggers the change event on the agent.
   * @property {function} clear - Assigns null values for agent.scope onto ctx.
   * @property {function} reset - A generator function that Resets the agent.scope on ctx with data from an upstream agent or service. Overridden to include wrapping logic (e.g. debouncing).
   * @property {function} reset__noop - A noop in the reset flow. No change to the ctx.
   * @property {function} reset__assign - Assign reset$ctx onto ctx.
   * @property {function} reset__clear - Assign cleared reset$ctx onto ctx.
   * @property {function} co$reset - reset that is wrapped by co. Not a generator function.
   */
  assign(agent, agent$ctx, {
    type: "agent",
    ctx: ctx,
    reset__called: reset__called,
    resolve__reset__called: resolve__reset__called,
    reject__reset__called: reject__reset__called,
    new__set$ctx: new__set$ctx,
    set: set,
    key: key,
    key$expires: key$expires,
    ttl: ttl,
    scope: scope,
    schedule__trigger: schedule__trigger__agent,
    trigger__change: trigger__change__agent,
    clear: clear,
    reset: reset,
    reset__noop: reset__noop,
    reset__assign: reset__assign,
    reset__clear: reset__clear,
    co$reset: co$reset});
  ctx[key] = agent;
  init$$.forEach(init => init.call(agent, agent));
  schedule__load.call(agent, agent);
  return agent;
  function *agent() {
    log(`${logPrefix}|ensure__agent|agent`, key);
    if (arguments.length) {
      agent.set(...arguments);
    }
    return pick(ctx, key, ...scope);
  }
}
/**
 * assigns the agent.scope keys from assign$ctx onto ctx
 * @param {...assign$ctx} set$ctx - Assigned onto ctx.
 * @returns {module:ctx-core/object/lib~ctx} ctx
 * @see {@link module:ctx-core/object/lib~agent.new__set$ctx}
 * @see {@link module:ctx-core/object/lib~change__agents}
 */
export function set() {
  const agent = this
      , key = agent.key
      , scope = agent.scope
      , ctx = agent.ctx;
  log(`${logPrefix}|set`, key);
  let set$ctx = agent.new__set$ctx(...arguments);
  change__agents(
    ctx,
    pick(set$ctx, ...scope));
  return ctx;
}
/**
 * Calls agent.reset wrapped with co.
 * This exists because agent.reset is a generator function & needs to be called in
 * @returns {*}
 */
function co$reset() {
  const agent = this
      , key = agent.key;
  log(`${logPrefix}|co$reset`, key);
  return co__promise$catch(
    agent.ctx,
    co$reset__gen.bind(agent),
    ...arguments);
}
function *co$reset__gen() {
  const agent = this
      , key = agent.key;
  log(`${logPrefix}|co$reset__gen`, key);
  return yield notify__reset__called(agent, function *() {
    log(`${logPrefix}|co$reset__gen|notify__reset__called`, key);
    return yield agent.reset(...arguments);
  }, ...arguments);
}
export function schedule__load__reset(agent) {
  log(`${logPrefix}|schedule__load__reset`);
  setTimeout(
    co.wrap(function *() {
      log(`${logPrefix}|schedule__load__reset|setTimeout`, agent.key);
      yield agent.reset();
    }), 0);
}
export function schedule__load__noop() {
  log(`${logPrefix}|schedule__load__noop`);
}
export function *reset__core() {
  log(`${logPrefix}|reset__core`);
  const agent = this;
  yield notify__reset__called(agent, function *() {
    yield agent.reset__assign(...arguments);
  }, ...arguments);
  return agent.ctx;
}
/**
 * noop
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function *reset__noop() {
  const agent = this
      , key = agent.key;
  log(`${logPrefix}|reset__noop`, key);
  agent.resolve__reset__called();
  return agent.ctx;
}
/**
 * {@link change__agents} with reset$ctx.
 * @param {assign$ctx} assign$ctx - Assigned to ctx.
 * @returns {module:ctx-core/object/lib~ctx} ctx
 *
 */
export function *reset__assign() {
  log(`${logPrefix}|reset__assign`);
  const agent = this;
  yield notify__reset__called(agent, reset__assign__gen, ...arguments);
  return agent.ctx;
}
function *reset__assign__gen() {
  log(`${logPrefix}|reset__assign__gen`);
  const agent = this;
  return change__agents(agent.ctx, clone(...arguments));
}
/**
 * {@link change__agents} with null to ctx agent scope values.
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function *reset__clear() {
  const agent = this;
  log(`${logPrefix}|reset|clear`, agent.key);
  yield notify__reset__called(agent, reset__clear__gen, ...arguments);
  return agent.ctx;
}
function *reset__clear__gen() {
  log(`${logPrefix}|reset__clear__gen`);
  const agent = this;
  // clears out all of the data
  agent.clear();
  return agent.ctx;
}
/**
 * Notifies agent.reset__called based on outcome of given gen function.
 * agent.resolve__reset__called if gen is successful.
 * agent.reject__reset__called if gen throws an error.
 * @param {agent} agent - The agent that has agent.reset__called
 * @param {function} gen - A Generator function that is called.
 * @param {...*} args - Arguments to pass to gen.
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function *notify__reset__called(agent, gen, ...args) {
  log(`${logPrefix}|notify__reset__called`);
  try {
    yield gen.call(agent, ...args);
  } catch (error$ctx) {
    agent.reject__reset__called(error$ctx);
    throw error$ctx;
  }
  agent.resolve__reset__called();
  return agent.ctx;
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
 * Returns new instance of assign$ctx used by agent.set.
 * @name new__set$ctx
 * @function
 * @param {...module:ctx-core/agent/lib~assign$ctx} assign$ctx - assign$ctx passed to agent.set
 * @returns {module:ctx-core/agent/lib~assign$ctx} The assign$ctx used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
/**
 * Default value for agent.new__set$ctx. Clones the arguments to set.
 * @param {...module:ctx-core/agent/lib~assign$ctx} assign$ctx - assign$ctx passed to agent.set
 * @returns {module:ctx-core/agent/lib~assign$ctx} The assign$ctx used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
export function new__set$ctx__core() {
  log(`${logPrefix}|new__set$ctx__core`);
  return clone(...arguments);
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
    ctx.agent$trigger__change = setTimeout(
      () => trigger__change(ctx), 0);
  }
  return ctx;
}
/**
 * Schedules a trigger for the eventName on the agent.
 * @param {string} eventName - The name of the event to trigger.
 * @returns {*}
 */
export function schedule__trigger__agent(eventName) {
  log(`${logPrefix}|schedule__trigger__agent`);
  const agent = this;
  if (eventName === "change") {
    return schedule__trigger__change(agent.ctx);
  }
  setTimeout(() => {
    log(`${logPrefix}|schedule__trigger__agent|setTimeout`);
    agent.trigger(eventName, agent.ctx);
  }, 0);
  return agent;
}
/**
 * agent member function that triggers the change event on the agent.
 * @param {module:ctx-core/object/lib~ctx} agent$baseline$ctx - The cloned ctx used as a baseline for determining change events.
 */
export function trigger__change__agent(agent$baseline$ctx) {
  const agent = this
      , key = agent.key
      , scope = agent.scope
      , ctx = agent.ctx;
  log(`${logPrefix}|trigger__change__agent`, key);
  if (scope.some(
    key => !deepEqual(ctx[key], agent$baseline$ctx[key]))
  ) {
    log(`${logPrefix}|trigger__change__agent|trigger`, key);
    const ttl = agent.ttl
        , key$expires = agent.key$expires;
    if (ttl) ctx[key$expires] = new Date(new Date().getTime + ttl);
    agent.trigger("change", ctx);
  }
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
      if (maybe$agent && maybe$agent.type === "agent") {
        memo.push(maybe$agent); }
      return memo;
    }, []);
}
/**
 * agent.clear sets agent.scope values to null on the ctx.
 */
export function clear() {
  log(`${logPrefix}|clear`);
  const agent = this;
  return change__agents(
    agent.ctx,
    new__clear$ctx(agent));
}
function new__clear$ctx(agent) {
  return agent.scope.reduce(
    (memo, agent$key) => {
      memo[agent$key] = null;
      return memo;
    }, {}
  );
}
/**
 * agents provide observable, management services for data on ctx
 * @module ctx-core/agent/lib
 */
import {assign,clone,entries,keys,pick} from 'ctx-core/object/lib'
import {throw__missing_argument} from 'ctx-core/error/lib'
import co from 'co'
import {promise$catch__co} from 'ctx-core/co/lib'
import deepEqual from 'deep-equal'
import {log,info,debug} from 'ctx-core/logger/lib'
const {observable} = riot
    , logPrefix = 'ctx-core/agent/lib'
export const ttl$default = 3600000
/**
 * The `ctx` used by the `agent`.
 * @typedef {module:ctx-core/object/lib~ctx} agent$ctx
 */
/**
 * Used by `agent.set` to `assign` values to the `ctx`
 * @typedef {module:ctx-core/object/lib~ctx} set$ctx
 */
/**
 * `assign` an `agent` for each `agent$ctx` onto {@link module:ctx-core/object/lib~ctx}.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @returns {module:ctx-core/object/lib~ctx} The `ctx` with assigned agents
 */
export function ensure__agents(ctx, ...agent$ctx$$) {
  return agent$ctx$$.map(agent$ctx$ => ensure__agent(ctx, agent$ctx$))
}
/**
 * `ensure` an `agent` is defined on `ctx[agent$ctx.key]`.
 * A new `agent` is assigned if one is not defined or `agent$ctx.force` is passed in Nothing happens otherwise.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @param {string} agent$ctx.key - The `ctx` `assign` key for this `agent`
 * @param {...string} agent$ctx.scope - The keys on ctx that this `agent` is responsible for.
 * @param {boolean} [agent$ctx.force] The `ctx` `assign` key for this `agent`
 * @param {function} [agent$ctx.$set$ctx] New `assign$ctx` when `agent.set` is called.
 * @param {module:ctx-core/agent/lib.reset__agent} [agent$ctx.reset] Resets the `agent` scope values based on an upstream service or `agent`.
 * @param {function} [agent$ctx.load] Schedules function to run.
 *  Defaults to {@link schedule__reset}.
 *  Often overridden with {@link noop}
 * @param {boolean|number} [agent$ctx.ttl] - Used to set ttl (time to live) on the `agent.scope` values on the `ctx`.
 * @returns {module:ctx-core/agent/lib~agent} agent
 * @throws {module:ctx-core/error/lib~missing_argument}
 */
export function ensure__agent(ctx, ...agent$ctx$$) {
  const existing__agent = use__existing__agent(...arguments)
      , agent$ctx = clone(...agent$ctx$$)
      , {key} = agent$ctx
  log(`${logPrefix}|ensure__agent`, key)
  if (existing__agent) return existing__agent
  log(`${logPrefix}|ensure__agent|assign`, key)
  let agent = {ctx}
  observable(agent)
  const reinit = agent$ctx.reinit || reinit__agent
  reinit.call(agent, ...agent$ctx$$)
  return agent
}
/**
 * Returns existing agent at `ctx[agent$ctx.key]` if `!agent$ctx.force`.
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...agent$ctx} agent$ctx
 * @param {string} agent$ctx.key - The `agent` `key` on `ctx`.
 * @param {boolean} agent$ctx.force - Set to truthy to return `undefined`.
 * Used to create a new `agent` with the same `key`.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function use__existing__agent(ctx, ...agent$ctx$$) {
  const agent$ctx = clone(...agent$ctx$$)
      , {key, force} = agent$ctx
  log(`${logPrefix}|ensure__agent`, key)
  if (!ctx) throw__missing_argument(agent$ctx, {key: 'ctx', type: key})
  if (!key) throw__missing_argument(agent$ctx, {key: 'agent$ctx.key', type: key})
  if (!force) return ctx[key]
}
/**
 * Reset agent methods & scope. Called in {@link module:ctx-core/agent/lib.ensure__agent}
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @see module:ctx-core/agent/lib.ensure__agent
 */
export function reinit__agent(...agent$ctx$$) {
  const agent$ctx = clone(...agent$ctx$$)
      , {key} = agent$ctx
  let agent = this
    , {ctx} = this
  info(`${logPrefix}|reinit__agent`, key)
  let {scope} = agent$ctx
    , resolve__reset__called
    , reject__reset__called
  const $set$ctx = agent$ctx.$set$ctx || $set$ctx__core
      , key$expires = `${key}$expires`
      , restart = (agent$ctx.restart || restart__agent).bind(agent)
      , reset = (agent$ctx.reset || reset__agent).bind(agent)
      , agent$ctx__ttl = agent$ctx.ttl
      , ttl =
          (agent$ctx__ttl === true && ttl$default)
          || agent$ctx__ttl
      , reset__called = new Promise((resolve, reject) => {
          resolve__reset__called = resolve
          reject__reset__called = reject
        })
      , clear = (agent$ctx.clear || clear__core).bind(agent)
      , load =
          agent$ctx.load == null
          ? load__agent.bind(agent)
          : agent$ctx.load.bind(agent)
  if (typeof scope === 'string') scope = [scope]
  if (!scope || !scope.length) {
    throw__missing_argument(
      agent$ctx, {
        key: `agent$ctx.scope`,
        type: key}) }
  let init$$ = []
  for (let i = 0; i < agent$ctx$$.length; i++) {
    const agent$ctx$ = agent$ctx$$[i]
        , init = agent$ctx$.init
    if (init) init$$.push(init)
  }
  /**
   * An `agent` provides management & event services for data on `ctx`. Agents are observable.
   * @typedef {agent$ctx} agent
   * @property {string} [type='agent'] The object type
   * @property {module:ctx-core/object/lib~ctx} The ctx the agent
   * @property {Promise} reset__called - A Promise that resolves when the first reset. Ensure agent.{@link module:ctx-core/agent/lib~reset__agent} is called by agent.reset.
   * @property {function} resolve__reset__called - Resolves `agent.reset__called` `Promise`.
   * @property {function} reject__reset__called - Rejects `agent.reset__called` `Promise`.
   * @property {function} reject__reset__called - Rejects `agent.reset__called` `Promise`.
   * @property {function} $set$ctx - New `set$ctx` to `assign` to `ctx`. Called by `agent.set`.
   * @property {function} set - Assigns the `agent.scope` of the given `set$ctx` onto `ctx`.
   * @property {function} before__set - in `agent.set`, `agent.before__set` called before `ctx` is changed
   * @property {function} after__set - in `agent.set`, `agent.after__set` called
   *  after `ctx` is changed,
   *  after `module:ctx-core/agent/lib#change__agents` (trigger change events) are scheduled,
   *  and before the trigger change events fire
   * @property {function} on - On event handler.
   * @property {function} trigger__change - Triggers the change event on the agent.
   * @property {function} clear - `assign` `null` values for `agent.scope` onto `ctx`.
   * @property {function} reset - A generator function that Resets the `agent.scope` on `ctx` with data from an upstream `agent` or service. Overridden to include wrapping logic (e.g. debouncing).
   * @property {function} reset__noop - A noop in the `reset` flow. No change to the `ctx`.
   * @property {function} reset__set - `assign` `reset$ctx` onto `ctx`.
   * @property {function} reset__clear - `assign` cleared `reset$ctx` onto `ctx`.
   * @property {function} reset__co - `reset` that is wrapped by `co`. Not a generator function.
   */
  assign(agent, {
    // place these fields on top of object key order
    key,
    scope,
    type: 'agent',
  }, agent$ctx, {
    key,
    scope,
    reinit: reinit__agent.bind(agent),
    $,
    scope$,
    reset__called,
    resolve__reset__called,
    reject__reset__called,
    $set$ctx,
    set,
    key$expires,
    ttl,
    pick: pick__agent,
    pick__on,
    pick__off,
    schedule__trigger,
    trigger__change,
    clear,
    restart,
    reset,
    reset__noop,
    reset__set,
    reset__clear,
    reset__co})
  ctx[key] = agent
  for (var i = 0; i < init$$.length; i++) {
    init$$[i].call(agent, agent)
  }
  load.call(agent)
}
/**
 * Returns the value of the first `scope` on the `agent` (`ctx[agent.scope[0]]`).
 * @returns {*} The value of the agent's first scope on the ctx.
 */
export function $() {
  const agent = this
  return agent.ctx[agent.scope$()]
}
/**
 * Returns the key of the first `scope` on the `agent` (agent.scope[0]).
 * @returns {string} The key of the agent's first scope.
 */
export function scope$() {
  const agent = this
  return agent.scope[0]
}
/**
 * `assign` the `agent.scope` keys from `assign$ctx` onto `ctx`
 * @param {...module:ctx-core/agent/lib~set$ctx} set$ctx - Assigned onto ctx.
 * @returns {module:ctx-core/agent/lib~agent}
 * @see {@link module:ctx-core/object/lib~agent.$set$ctx}
 * @see {@link module:ctx-core/object/lib~change__agents}
 */
export function set() {
  const agent = this
      , {ctx, key} = agent
  log(`${logPrefix}|set`, key)
  const set$ctx = agent.$set$ctx(...arguments)
      , set$ctx__scope = pick__scope(set$ctx, agent)
  if (!keys(set$ctx__scope).length) return agent
  let change__set$ctx = {}
    , change_detected = false
  for (let [key, value] of entries(set$ctx)) {
    if (!deepEqual(ctx[key], value)) {
      change__set$ctx[key] = value
      change_detected = true
    }
  }
  if (!change_detected) return agent
  info(`${logPrefix}|set|change__agents`, key, set$ctx__scope)
  if (agent.before__set) agent.before__set(change__set$ctx)
  change__agents(
    ctx,
    change__set$ctx)
  if (agent.after__set) agent.after__set(change__set$ctx)
  return agent
}
/**
 * Calls `agent.reset` wrapped with `co`.
 * This exists because agent.reset is a generator function & needs to be called in
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
function reset__co() {
  const agent = this
      , {key} = agent
  log(`${logPrefix}|reset__co`, key)
  return promise$catch__co(
    agent.ctx,
    agent.reset.bind(agent),
    ...arguments)
}
/**
 * Default `agent.load` callback
 *
 * - `agent`.{@link ctx-core/agent/lib.reset__co}
 * @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function load__agent() {
  log(`${logPrefix}|load__agent`)
  const agent = this
      , all__scope = $all__scope(agent)
  if (!all__scope) agent.reset__co(...arguments)
  return agent
}
function $all__scope(agent) {
  const {ctx,scope} = agent
  for (let i=0; i < scope.length; i++) {
    const scope$ = ctx[scope[i]]
    if (scope$ == null) {
      return false
    }
  }
  return true
}
/**
 * `schedule` call to `agent`.{@link module:ctx-core/agent/lib.reset}.
 *
 * @param {module:ctx-core/agent/lib~agent} agent
 * @this module:ctx-core/agent/lib~agent
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function schedule__reset() {
  const agent = this
  log(`${logPrefix}|schedule__reset`, agent.key)
  setTimeout(
    co.wrap(function *() {
      info(`${logPrefix}|schedule__reset|setTimeout`, agent.key)
      yield agent.reset()
    }), 0)
  return agent
}
/**
 * Performs no operation other than logging.
 * Used to override `agent`.{@link module:ctx-core/agent/lib.load}
 * causing no initial loading to take place when the `agent` is assigned.
 */
export function noop() {
  log(`${logPrefix}|noop`)
}
/**
 * `clear` & `reset` the `agent`.
 *
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function restart__agent() {
  log(`${logPrefix}|restart__agent`)
  const agent = this
  agent.clear()
  agent.reset__co()
  return agent
}
/**
 * `notify__reset__called` & `agent.reset__set`. Default & Core `agent.reset` function.
 * `agent.reset` can be overridden & overrides often yield `reset__agent`.
 *
 * - @yield agent.{@link module:ctx-core/agent/lib.reset__set}
 * @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function *reset__agent() {
  const agent = this
  log(`${logPrefix}|reset__agent`, agent.key)
  yield agent.reset__set(...arguments)
  return agent
}
/**
 * `noop` & `agent.resolve__reset__called`.
 * This is a possible end point of the `agent`.{@link module:ctx-core/agent/lib.reset} flow.
 *
 * - `agent.resolve__reset__called`.
 * @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function *reset__noop() {
  const agent = this
  log(`${logPrefix}|reset__noop`, agent.key)
  agent.resolve__reset__called()
  return agent
}
/**
 * Calls `agent`.{@link module:ctx-core/agent/lib.set}.
 * This is a possible end point of the `agent`.{@link module:ctx-core/agent/lib.reset} flow.
 *
 * - @yield {@link module:ctx-core/agent/lib.notify__reset__called}
 * {@link change__agents} with reset$ctx.
 * @param {assign$ctx} assign$ctx - Assigned to ctx.
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function *reset__set() {
  const agent = this
  log(`${logPrefix}|reset__set`, agent.key)
  yield notify__reset__called(agent, reset__set__do, ...arguments)
  return agent
}
/**
 * Sets the `agent` with the `pick__scope` `set$ctx`.
 * @param {...module:ctx-core/agent/lib~set$ctx} set$ctx -
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
function *reset__set__do() {
  const agent = this
  log(`${logPrefix}|reset__set__do`, agent.key)
  agent.set(...arguments)
  return agent
}
/**
 * Path in the {@link module:ctx-core/agent/lib~agent.reset} flow that sets the `scope` values in the `ctx` to `null`.
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function *reset__clear() {
  const agent = this
  log(`${logPrefix}|*reset__clear`, agent.key)
  yield notify__reset__called(agent, reset__clear__gen, ...arguments)
  return agent
}
function *reset__clear__gen() {
  log(`${logPrefix}|reset__clear__gen`)
  const agent = this
  // clears out all of the data
  agent.clear()
  return agent
}
/**
 * Notifies `agent.reset__called` based on outcome of given gen function.
 *
 * - if gen is successful `agent.resolve__reset__called`
 * - if gen throws an error `agent.reject__reset__called`
 * @param {agent} agent - The 'agent' that has 'agent.reset__called'
 * @param {function} gen - A Generator function that is called.
 * @param {...*} args - Arguments to pass to gen.
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function *notify__reset__called(agent, gen, ...args) {
  log(`${logPrefix}|*notify__reset__called`, agent.key)
  try {
    yield gen.call(agent, ...args)
  } catch (error$ctx) {
    agent.reject__reset__called(error$ctx)
    throw error$ctx
  }
  agent.resolve__reset__called()
  return agent
}
/**
 * Callback passing in `ctx` to be invoked from {@link change__agents}.
 * @callback after__change__agents
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @example
 * change__agents(ctx, {foo: 'bar'}, (ctx) => {assign(ctx, {baz: 'quux'})})
 */
/**
 * {@link schedule__trigger__change}, `assign` `assign$ctx` to `ctx`, & run an optional `after__change__agents`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param assign$ctx
 * @param {after__change__agents} [after__change__agents] Optional function
 * @returns {module:ctx-core/object/lib~ctx} `ctx` with `assign$ctx` assigned
 * @see {@link schedule__trigger__change}
 */
export function change__agents(ctx, assign$ctx, after__change__agents) {
  log(`${logPrefix}|change__agents`, assign$ctx)
  schedule__trigger__change(ctx)
  assign(ctx, assign$ctx)
  if (after__change__agents) after__change__agents(ctx)
  return ctx
}
/**
 * Returns new instance of 'assign$ctx' used by 'agent.set'
 * @name $set$ctx
 * @function
 * @param {...module:ctx-core/agent/lib~assign$ctx} assign$ctx - assign$ctx passed to agent.set
 * @returns {module:ctx-core/agent/lib~assign$ctx} The assign$ctx used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
/**
 * Default value for `agent.$set$ctx`. `clone` the arguments to set.
 * @param {...module:ctx-core/agent/lib~assign$ctx} assign$ctx - assign$ctx passed to agent.set
 * @returns {module:ctx-core/agent/lib~assign$ctx} The assign$ctx used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
export function $set$ctx__core() {
  log(`${logPrefix}|$set$ctx__core`)
  return clone(...arguments)
}
/**
 * {@link ensure__agent$baseline} & `schedule` {@link agent.trigger__change} on all `agents` in the `ctx` on the next tick.
 * If a `trigger__change` is already scheduled, no new `trigger__change` is scheduled.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function schedule__trigger__change(ctx) {
  log(`${logPrefix}|schedule__trigger__change`)
  ensure__agent$baseline(ctx)
  if (!ctx.agent$trigger__change) {
    ctx.agent$trigger__change = setTimeout(
      () => trigger__change__do(ctx),
      0)
  }
  return ctx
}
/**
 * `pick` the `agent.scope` from `ctx`
 */
export function pick__agent() {
  const agent = this
      , {ctx} = agent
  log(`${logPrefix}|pick__agent`, agent.key)
  return pick(ctx, ...agent.scope)
}
/**
 * Selects matching event names in the `mount$ctx` (i.e. `key__change__agent`) & binds the events to the `agent`.
 * @param {mount$ctx} mount$ctx - A map of the events to bind with the key being the ctx name of the event & the value being the event handler.
 * @this module:ctx-core/agent/lib~agent
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function pick__on() {
  const agent = this
      , select$ctx = clone(...arguments)
  log(`${logPrefix}|pick__on`, agent.key)
  const keys__select$ctx = keys(select$ctx)
  for (let i = 0; i < keys__select$ctx.length; i++) {
    const select$key = keys__select$ctx[i]
        , frame$ctx = $select__frame$ctx(agent, select$ctx, select$key)
        , change = frame$ctx.change
    if (change) {
      agent.on('change', change)
    }
  }
  return agent
}
/**
 * Selects matching event names in the `mount$ctx` (i.e. `key__change__agent`) & unbinds the events from the `agent`.
 * @param {mount$ctx} mount$ctx - A map of the events to unbind with the key being the `ctx` name of the event & the value being the event handler.
 * @this module:ctx-core/agent/lib~agent
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function pick__off() {
  const agent = this
      , select$ctx = clone(...arguments)
  log(`${logPrefix}|pick__off`, agent.key)
  const keys__select$ctx = keys(select$ctx)
  for (let i = 0; i < keys__select$ctx.length; i++) {
    const select$key = keys__select$ctx[i]
        , frame$ctx = $select__frame$ctx(agent, select$ctx, select$key)
        , change = frame$ctx.change
    if (change) {
      agent.off('change', change)
    }
  }
  return agent
}
function $select__frame$ctx(agent, select$ctx, select$key) {
  let frame$ctx = {
    agent: agent,
    select$key: select$key
  }
  const agent$key = agent.key
      , scope$ = agent.scope$()
      , key__change = select$key === `change__${agent$key}`
        || select$key === `change__${scope$}`
      , key__on$change = select$key === `on$change__${agent$key}`
        || select$key ===  `on$change__${scope$}`
  if (key__on$change || key__change) {
    frame$ctx.change = select$ctx[select$key]
  }
  return frame$ctx
}
/**
 * `schedule` a `trigger` for the `eventName` on the `agent`.
 * @param {string} eventName - The name of the event to trigger.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function schedule__trigger__agent(eventName) {
  const agent = this
  log(`${logPrefix}|schedule__trigger__agent`, agent.key)
  if (eventName === 'change') {
    return schedule__trigger__change(agent.ctx)
  }
  setTimeout(() => {
    info(`${logPrefix}|schedule__trigger__agent|setTimeout`, agent.key)
    agent.trigger(eventName, agent.ctx)
  }, 0)
  return agent
}
export const schedule__trigger = schedule__trigger__agent
/**
 * `agent` member function that `triggers` the `change` event on the `agent`.
 * @param {module:ctx-core/object/lib~ctx} agent$baseline$ctx - `clone` `ctx` used as a baseline for determining change events.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function trigger__change(agent$baseline$ctx) {
  const agent = this
      , {key, scope, ctx} = agent
  log(`${logPrefix}|trigger__change`, key)
  if ($some__trigger__change(ctx, agent$baseline$ctx, scope)) {
    info(`${logPrefix}|trigger__change|trigger`, key)
    const {ttl, key$expires} = agent
    if (ttl) ctx[key$expires] = new Date(new Date().getTime + ttl)
    agent.trigger('change', ctx)
  }
  return agent
}
function $some__trigger__change(ctx, agent$baseline$ctx, scope) {
  for (let i=0; i < scope.length; i++) {
    const scope$ = scope[i]
    if (!deepEqual(ctx[scope$], agent$baseline$ctx[scope$])) {
      return true
    }
  }
  return false
}
export const trigger__change__agent = trigger__change
/**
 * Runs {@link agent.trigger__change} on all of the `agents` in the `ctx`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
function trigger__change__do(ctx) {
  log(`${logPrefix}|trigger__change__do`)
  const {agent$baseline$ctx} = ctx
  ctx.agent$baseline$ctx = null
  ctx.agent$trigger__change = null
  ensure__agent$baseline(ctx)
  const agents = filter__agents(ctx)
  for (let i = 0; i < agents.length; i++) {
    agents[i].trigger__change(agent$baseline$ctx)
  }
  return ctx
}
/**
 * `assign` if blank, {@link ctx.agent$baseline$ctx}.
 * {@link ctx.agent$baseline$ctx} is used to determine which `agent` `keys` have `changed`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx with {@link ctx.agent$baseline$ctx}
 */
export function ensure__agent$baseline(ctx) {
  log(`${logPrefix}|ensure__agent$baseline`)
  if (!ctx.agent$baseline$ctx) {
    ctx.agent$baseline$ctx = clone(ctx)
  }
  return ctx
}
/**
 * Returns an `array` of `agents` in the `ctx`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {Array<module:ctx-core/agent/lib~agent>} Agents in the ctx.
 */
export function filter__agents(ctx) {
  log(`${logPrefix}|filter__agents`)
  return keys(ctx).reduce(
    (memo, key) => {
      const maybe$agent = ctx[key]
      if (maybe$agent && maybe$agent.type === 'agent') {
        memo.push(maybe$agent) }
      return memo
    }, [])
}
/**
 * `agent.clear` sets `agent.scope` values to `null` on the `ctx`.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function clear__core() {
  log(`${logPrefix}|clear__core`)
  const agent = this
  agent.set($clear$ctx(agent))
  return agent
}
/**
 * from `ctx`, `pick` a new `ctx` only having keys in `agent.scope`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {module:ctx-core/agent/lib~agent}
 * @param {...additional_key} additional_key - additional `key` to add
 * @returns {picked$ctx} picked$ctx - the `ctx` with `agent.scope` `keys` picked
 */
export function pick__scope(ctx, agent, ...additional_key$$) {
  log(`${logPrefix}|pick__scope`, agent.key)
  return pick(ctx, ...agent.scope, ...additional_key$$)
}
function $clear$ctx(agent) {
  return agent.scope.reduce(
    (memo, agent$key) => {
      memo[agent$key] = null
      return memo
    }, {}
  )
}
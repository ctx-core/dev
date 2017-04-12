/**
 * agents provide observable, management services for data on ctx
 * @module ctx-core/agent/lib
 */
import {assign,clone,keys,pick} from 'ctx-core/object/lib'
import {throw__missing_argument} from 'ctx-core/error/lib'
import deepEqual from 'deep-equal'
import riot from 'riot'
import {log,info,debug} from 'ctx-core/logger/lib'
const {observable} = riot
    , logPrefix = 'ctx-core/agent/lib'
export const ttl__default = 3600000
/**
 * The `ctx` used by the `agent`.
 * @typedef {module:ctx-core/object/lib~ctx} ctx__agent
 */
/**
 * Used by `agent.set` to `assign` values to the `ctx`
 * @typedef {module:ctx-core/object/lib~ctx} ctx__set
 */
/**
 * `assign` an `agent` for each `ctx__agent` onto {@link module:ctx-core/object/lib~ctx}.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @returns {module:ctx-core/object/lib~ctx} The `ctx` with assigned agents
 */
export function ensure__agents(ctx, ...ctx__agent$$) {
  let $ = []
  for (let i=0; i < ctx__agent$$.length; i++) {
    $.push(ensure__agent(ctx, ctx__agent$$[i]))
  }
  return $
}
/**
 * `ensure` an `agent` is defined on `ctx[ctx__agent.key]`.
 * A new `agent` is assigned if one is not defined or `ctx__agent.force` is passed in Nothing happens otherwise.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @param {string} ctx__agent.key - The `ctx` `assign` key for this `agent`
 * @param {...string} ctx__agent.scope - The keys on ctx that this `agent` is responsible for.
 * @param {boolean} [ctx__agent.force] The `ctx` `assign` key for this `agent`
 * @param {function} [ctx__agent.$ctx__set] New `ctx__assign` when `agent.set` is called.
 * @param {module:ctx-core/agent/lib.reset__agent} [ctx__agent.reset] Resets the `agent` scope values based on an upstream service or `agent`.
 * @param {function} [ctx__agent.load] Schedules function to run.
 *  Defaults to {@link schedule__reset}.
 *  Often overridden with {@link noop}
 * @param {boolean|number} [ctx__agent.ttl] - Used to set ttl (time to live) on the `agent.scope` values on the `ctx`.
 * @returns {module:ctx-core/agent/lib~agent} agent
 * @throws {module:ctx-core/error/lib~missing_argument}
 */
export function ensure__agent(ctx, ...ctx__agent$$) {
  const ctx__agent = clone(...ctx__agent$$)
      , {key} = ctx__agent
  log(`${logPrefix}|ensure__agent`, key)
  const existing__agent = use__existing__agent(...arguments)
  if (existing__agent) return existing__agent
  let agent = {ctx}
  observable(agent)
  const reinit = ctx__agent.reinit || reinit__agent
  reinit.call(agent, ...ctx__agent$$)
  return agent
}
/**
 * Returns existing agent at `ctx[ctx__agent.key]` if `!ctx__agent.force`.
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...ctx__agent} ctx__agent
 * @param {string} ctx__agent.key - The `agent` `key` on `ctx`.
 * @param {boolean} ctx__agent.force - Set to truthy to return `undefined`.
 * Used to create a new `agent` with the same `key`.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function use__existing__agent(ctx, ...ctx__agent$$) {
  const ctx__agent = clone(...ctx__agent$$)
      , {key, force} = ctx__agent
  log(`${logPrefix}|use__existing__agent`, key)
  if (!ctx) throw__missing_argument(ctx__agent, {key: 'ctx', type: key})
  if (!key) throw__missing_argument(ctx__agent, {key: 'ctx__agent.key', type: key})
  if (!force) return ctx[key]
}
/**
 * Reset agent methods & scope. Called in {@link module:ctx-core/agent/lib.ensure__agent}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @see module:ctx-core/agent/lib.ensure__agent
 */
export function reinit__agent(...ctx__agent$$) {
  const ctx__agent = clone(...ctx__agent$$)
      , {key} = ctx__agent
  let agent = this
    , {ctx} = this
  info(`${logPrefix}|reinit__agent`, key)
  let {scope} = ctx__agent
  const $ctx__set = ctx__agent.$ctx__set || $ctx__set__core
      , key__expires = `${key}__expires`
      , restart = (ctx__agent.restart || restart__agent).bind(agent)
      , reset = (ctx__agent.reset || reset__agent).bind(agent)
      , ctx__agent__ttl = ctx__agent.ttl
      , ttl =
          (ctx__agent__ttl === true && ttl__default)
          || ctx__agent__ttl
      , clear = (ctx__agent.clear || clear__core).bind(agent)
      , load =
          ctx__agent.load == null
          ? load__agent.bind(agent)
          : ctx__agent.load.bind(agent)
  if (typeof scope === 'string') scope = [scope]
  if (!scope || !scope.length) {
    throw__missing_argument(
      ctx__agent, {
        key: `ctx__agent.scope`,
        type: key}) }
  let init$$ = []
  for (let i = 0; i < ctx__agent$$.length; i++) {
    const ctx__agent$ = ctx__agent$$[i]
        , {init} = ctx__agent$
    if (init) init$$.push(init)
  }
  /**
   * An `agent` provides management & event services for data on `ctx`. Agents are observable.
   * @typedef {ctx__agent} agent
   * @property {string} [type='agent'] The object type
   * @property {module:ctx-core/object/lib~ctx} The ctx the agent
   * @property {function} $ctx__set - New `ctx__set` to `assign` to `ctx`. Called by `agent.set`.
   * @property {function} set - Assigns the `agent.scope` of the given `ctx__set` onto `ctx`.
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
   * @property {function} reset__set - `assign` `ctx__reset` onto `ctx`.
   * @property {function} reset__clear - `assign` cleared `ctx__reset` onto `ctx`.
   */
  assign(agent, {
    // place these fields on top of object key order
    key,
    scope,
    type: 'agent',
  }, ctx__agent, {
    key,
    scope,
    reinit: reinit__agent.bind(agent),
    $,
    scope$,
    $ctx__set,
    set,
    key__expires,
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
    reset__clear})
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
 * `assign` the `agent.scope` keys from `ctx__assign` onto `ctx`
 * @param {...module:ctx-core/agent/lib~ctx__set} ctx__set - Assigned onto ctx.
 * @returns {module:ctx-core/agent/lib~agent}
 * @see {@link module:ctx-core/object/lib~agent.$ctx__set}
 * @see {@link module:ctx-core/object/lib~change__agents}
 */
export function set() {
  const agent = this
      , {ctx, key} = agent
  log(`${logPrefix}|set`, key)
  const ctx__set = agent.$ctx__set(...arguments)
      , ctx__set__scope = pick__scope(ctx__set, agent)
  if (!keys(ctx__set__scope).length) return agent
  let change__ctx__set = {}
    , change_detected = false
  for (let key in ctx__set) {
    const value = ctx__set[key]
    if (!deepEqual(ctx[key], value)) {
      change__ctx__set[key] = value
      change_detected = true
    }
  }
  if (!change_detected) return agent
  info(`${logPrefix}|set|change__agents`, key, ctx__set__scope)
  if (agent.before__set) agent.before__set(change__ctx__set)
  change__agents(
    ctx,
    change__ctx__set)
  if (agent.after__set) agent.after__set(change__ctx__set)
  return agent
}
/**
 * Default `agent.load` callback
 *
 * - `agent`.{@link ctx-core/agent/lib.reset}
 * @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function load__agent() {
  log(`${logPrefix}|load__agent`)
  const agent = this
      , all__scope = $all__scope(agent)
  if (!all__scope) agent.reset(...arguments)
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
  setTimeout(agent.reset, 0)
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
  agent.reset()
  return agent
}
/**
 * `agent.reset__set`. Default & Core `agent.reset` function.
 * `agent.reset` can be overridden & overrides often yield `reset__agent`.
 *
 * - @yield agent.{@link module:ctx-core/agent/lib.reset__set}
 * @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export async function reset__agent() {
  const agent = this
  log(`${logPrefix}|reset__agent`, agent.key)
  await agent.reset__set(...arguments)
  return agent
}
/**
 * `noop` & reset__success
 * This is a possible end point of the `agent`.{@link module:ctx-core/agent/lib.reset} flow.
 *
 *  @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 * @triggers reset__success
 */
export async function reset__noop() {
  const agent = this
  log(`${logPrefix}|reset__noop`, agent.key)
  agent.trigger('reset__success')
  return agent
}
/**
 * Calls `agent`.{@link module:ctx-core/agent/lib.set}.
 * This is a possible end point of the `agent`.{@link module:ctx-core/agent/lib.reset} flow.
 * {@link change__agents} with ctx__reset.
 * @param {ctx__assign} ctx__assign - Assigned to ctx.
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 * @triggers reset__success
 * @triggers reset__error
 */
export async function reset__set() {
  const agent = this
  log(`${logPrefix}|reset__set`, agent.key)
  try {
    await reset__set__do.apply(agent, arguments)
  } catch (ctx__error) {
    agent.trigger('reset__error', ctx__error)
    throw ctx__error
  }
  agent.trigger('reset__success')
  return agent
}
/**
 * Sets the `agent` with the `pick__scope` `ctx__set`.
 * @param {...module:ctx-core/agent/lib~ctx__set} ctx__set -
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
async function reset__set__do() {
  const agent = this
  log(`${logPrefix}|reset__set__do`, agent.key)
  agent.set(...arguments)
  return agent
}
/**
 * Path in the {@link module:ctx-core/agent/lib~agent.reset} flow that sets the `scope` values in the `ctx` to `null`.
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export async function reset__clear() {
  const agent = this
  log(`${logPrefix}|*reset__clear`, agent.key)
  try {
    agent.clear()
  } catch (ctx__error) {
    agent.trigger('reset__error', ctx__error)
    throw ctx__error
  }
  agent.trigger('reset__success')
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
 * {@link schedule__trigger__change}, `assign` `ctx__assign` to `ctx`, & run an optional `after__change__agents`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param ctx__assign
 * @param {after__change__agents} [after__change__agents] Optional function
 * @returns {module:ctx-core/object/lib~ctx} `ctx` with `ctx__assign` assigned
 * @see {@link schedule__trigger__change}
 */
export function change__agents(ctx, ctx__assign, after__change__agents) {
  log(`${logPrefix}|change__agents`, ctx__assign)
  schedule__trigger__change(ctx)
  assign(ctx, ctx__assign)
  if (after__change__agents) after__change__agents(ctx)
  return ctx
}
/**
 * Returns new instance of 'ctx__assign' used by 'agent.set'
 * @name $ctx__set
 * @function
 * @param {...module:ctx-core/agent/lib~ctx__assign} ctx__assign - ctx__assign passed to agent.set
 * @returns {module:ctx-core/agent/lib~ctx__assign} The ctx__assign used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
/**
 * Default value for `agent.$ctx__set`. `clone` the arguments to set.
 * @param {...module:ctx-core/agent/lib~ctx__assign} ctx__assign - ctx__assign passed to agent.set
 * @returns {module:ctx-core/agent/lib~ctx__assign} The ctx__assign used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
export function $ctx__set__core() {
  log(`${logPrefix}|$ctx__set__core`)
  return clone(...arguments)
}
/**
 * {@link ensure__ctx__change} & `schedule` {@link agent.trigger__change} on all `agents` in the `ctx` on the next tick.
 * If a `trigger__change` is already scheduled, no new `trigger__change` is scheduled.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function schedule__trigger__change(ctx) {
  log(`${logPrefix}|schedule__trigger__change`)
  ensure__ctx__change(ctx)
  if (!ctx.agent__trigger__change) {
    ctx.agent__trigger__change =
      setTimeout(
        () => do__trigger__change(ctx),
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
 * Selects matching event names in the `ctx__select` (i.e. `key__change__agent`) & binds the events to the `agent`.
 * @param {ctx__select} ctx__select - A map of the events to bind with the key being the ctx name of the event & the value being the event handler.
 * @this module:ctx-core/agent/lib~agent
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function pick__on() {
  const agent = this
      , ctx__select = clone(...arguments)
  log(`${logPrefix}|pick__on`, agent.key)
  for (let key__select in ctx__select) {
    const ctx__frame = $select__ctx__frame(agent, ctx__select, key__select)
        , {change} = ctx__frame
    if (change) {
      agent.on('change', change)
    }
  }
  return agent
}
/**
 * Selects matching event names in the `ctx__select` (i.e. `key__change__agent`) & unbinds the events from the `agent`.
 * @param {ctx__select} ctx__select - A map of the events to unbind with the key being the `ctx` name of the event & the value being the event handler.
 * @this module:ctx-core/agent/lib~agent
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function pick__off() {
  const agent = this
      , ctx__select = clone(...arguments)
  log(`${logPrefix}|pick__off`, agent.key)
  for (let key__select in ctx__select) {
    const ctx__frame = $select__ctx__frame(agent, ctx__select, key__select)
        , {change} = ctx__frame
    if (change) {
      agent.off('change', change)
    }
  }
  return agent
}
function $select__ctx__frame(agent, ctx__select, key__select) {
  let ctx__frame = {
    agent,
    key__select
  }
  const {key} = agent
      , regex__key = new RegExp(`(on\$)?(^$*)__${key.replace('$', '\$')}$`)
      , match__key = key__select.match(regex__key)
  if (match__key) {
    ctx__frame[match__key[2]] = ctx__select[key__select]
    return ctx__frame
  }
  const scope$ = agent.scope$()
      , regex__scope$ = new RegExp(`(on\$)?([^$]*)__${scope$}$`)
      , match__scope$ = key__select.match(regex__scope$)
  if (match__scope$) {
    ctx__frame[match__scope$[2]] = ctx__select[key__select]
    return ctx__frame
  }
  return ctx__frame
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
 * @param {module:ctx-core/object/lib~ctx} ctx__change - `clone` `ctx` used as a baseline for determining change events.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function trigger__change(ctx__change) {
  const agent = this
      , {key, scope, ctx} = agent
  if ($some__trigger__change(ctx, ctx__change, scope)) {
    info(`${logPrefix}|trigger__change|trigger`, key)
    const {ttl, key__expires} = agent
    if (ttl) ctx[key__expires] = new Date(new Date().getTime + ttl)
    const ctx__change$ = ctx.ctx__change
    for (let i=0; i < scope.length; i++) {
      const key = scope[i]
      ctx__change$[key] = ctx[key]
    }
    agent.trigger('change', ctx, ctx__change)
  }
  return agent
}
function $some__trigger__change(ctx, ctx__change, scope) {
  for (let i=0; i < scope.length; i++) {
    const key = scope[i]
    if (!deepEqual(ctx[key], ctx__change[key])) {
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
function do__trigger__change(ctx) {
  log(`${logPrefix}|do__trigger__change`)
  const {ctx__change} = ctx
  ctx.ctx__change = null
  ctx.agent__trigger__change = null
  ensure__ctx__change(ctx)
  const agents = filter__agents(ctx)
  for (let i=0; i < agents.length; i++) {
    const agent = agents[i]
    agent.trigger__change(ctx__change)
  }
  return ctx
}
/**
 * `assign` if blank, {@link ctx.ctx__change}.
 * {@link ctx.ctx__change} is used to determine which `agent` `keys` have `changed`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx with {@link ctx.ctx__change}
 */
export function ensure__ctx__change(ctx) {
  log(`${logPrefix}|ensure__ctx__change`)
  if (!ctx.ctx__change) {
    ctx.ctx__change = clone(ctx)
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
  let $ = []
  for (const key in ctx) {
    const maybe$agent = ctx[key]
    if (maybe$agent && maybe$agent.type === 'agent') {
      $.push(maybe$agent)
    }
  }
  return $
}
/**
 * `agent.clear` sets `agent.scope` values to `null` on the `ctx`.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function clear__core() {
  log(`${logPrefix}|clear__core`)
  const agent = this
  agent.set($ctx__clear(agent))
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
function $ctx__clear(agent) {
  const {scope} = agent
  let $ = {}
  for (let i=0; i < scope.length; i++) {
    const key = scope[i]
    $[key] = null
  }
  return $
}
/**
 * Sets agent's scope on ctx to false if null
 * @param {module:ctx-core/agent/lib~agent} agent
 */
export function set__false_if_null(agent) {
  log(`${logPrefix}|set__false_if_null`)
  const {ctx,scope} = agent
  for (let i=0; i < scope.length; i++) {
    const scope$ = scope[i]
    if (ctx[scope$] == null) ctx[scope$] = false
  }
  return agent
}
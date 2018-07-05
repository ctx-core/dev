/**
 * agents provide observable, management services for data on ctx
 * @module ctx-core/agent/lib
 */
import {
	assign,
	mixin,
	clone,
	keys,
	pick
} from 'ctx-core/object/lib.mjs'
import { throw__missing_argument } from 'ctx-core/error/lib.mjs'
import observable from 'ctx-core/observable/observable.mjs'
import { ensure__agent__agents } from 'ctx-core/ctx/agent.mjs'
import { _ctx__clear as _ctx__clear__ } from 'ctx-core/object/lib.mjs'
import { log, info, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/agent/lib.mjs'
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
export function ensure__agents(ctx, ...array__ctx__agent) {
	let agents = []
	for (let i = 0; i < array__ctx__agent.length; i++) {
		agents.push(ensure__agent(ctx, array__ctx__agent[i]))
	}
	return agents
}
/**
 * `ensure` an `agent` is defined on `ctx[ctx__agent.key]`.
 * A new `agent` is assigned if one is not defined or `ctx__agent.force` is passed in Nothing happens otherwise.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @param {string} ctx__agent.key - The `ctx` `assign` key for this `agent`
 * @param {...string} ctx__agent.scope - The keys on ctx that this `agent` is responsible for.
 * @param {boolean} [ctx__agent.force] The `ctx` `assign` key for this `agent`
 * @param {function} [ctx__agent._ctx__set] New `ctx__assign` when `agent.set` is called.
 * @param {module:ctx-core/agent/lib.reset__agent} [ctx__agent.reset] Resets the `agent` scope values based on an upstream service or `agent`.
 * @param {function} [ctx__agent.load] Schedules function to run.
 *  Defaults to {@link schedule__reset}.
 *  Often overridden with {@link noop}
 * @param {boolean|number} [ctx__agent.ttl] - Used to set ttl (time to live) on the `agent.scope` values on the `ctx`.
 * @returns {module:ctx-core/agent/lib~agent} agent
 * @throws {module:ctx-core/error/lib~missing_argument}
 */
export function ensure__agent(ctx, ...array__ctx__agent) {
	const ctx__agent =
		array__ctx__agent.length == 1
		? array__ctx__agent[0]
		: clone(...array__ctx__agent)
	const agent__existing = use__agent__existing(ctx, ctx__agent)
	if (agent__existing) return agent__existing
	const agent = { ctx }
	ensure__agent__agents(ctx)
	const reinit = ctx__agent.reinit || reinit__agent
	observable(agent)
	reinit.call(agent, ...array__ctx__agent)
	ctx.agent__agents.add(agent, ctx__agent)
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
export function use__agent__existing(ctx, ctx__agent) {
	const { key, force } = ctx__agent
	if (!ctx) {
		throw__missing_argument(
			ctx__agent,
			{
				key: 'ctx',
				type: key
			})
	}
	if (!key) {
		throw__missing_argument(
			ctx__agent,
			{
				key: 'ctx__agent.key',
				type: key
			})
	}
	if (!force) return ctx[key]
}
/**
 * Reset agent methods & scope. Called in {@link module:ctx-core/agent/lib.ensure__agent}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @see module:ctx-core/agent/lib.ensure__agent
 */
export function reinit__agent(...array__ctx__agent) {
	const agent = this
	const { ctx } = agent
	const ctx__agent = clone(...array__ctx__agent)
	const { key } = ctx__agent
	info(`${logPrefix}|reinit__agent`, key)
	let { scope } = ctx__agent
	const _ctx__set =
		ctx__agent._ctx__set
		|| _ctx__set__core
	const key__expires = `${key}__expires`
	const restart =
		(ctx__agent.restart
			|| restart__agent
		).bind(agent)
	const reset =
		(ctx__agent.reset
			|| reset__agent
		).bind(agent)
	const ctx__agent__ttl = ctx__agent.ttl
	const ttl =
		(ctx__agent__ttl === true
			&& ttl__default)
		|| ctx__agent__ttl
	const clear =
		(ctx__agent.clear
			|| clear__core
		).bind(agent)
	const load =
		ctx__agent.load == null
		? load__agent.bind(agent)
		: ctx__agent.load.bind(agent)
	if (typeof scope === 'string') scope = [scope]
	/**
	 * An `agent` provides management & event services for data on `ctx`. Agents are observable.
	 * @typedef {ctx__agent} agent
	 * @property {string} [type='agent'] The object type
	 * @property {module:ctx-core/object/lib~ctx} The ctx the agent
	 * @property {function} _ctx__set - New `ctx__set` to `assign` to `ctx`. Called by `agent.set`.
	 * @property {function} set - Assigns the `agent.scope` of the given `ctx__set` onto `ctx`.
	 * @property {function} before__set - in `agent.set`, `agent.before__set` called with `(ctx__set__scope, ctx)` before `ctx` is changed
	 * @property {function} after__set - in `agent.set`, `agent.after__set` called with `(ctx__set__scope, ctx)`
	 *  after `ctx` is changed,
	 *  after `module:ctx-core/agent/lib#change__agents` (trigger change events) are scheduled,
	 *  and before the trigger change events fire
	 * @property {function} before__change - in `agent.set`, `agent.before__change` called with (`ctx__change`, `ctx`) before `ctx` is changed
	 * @property {function} after__change - in `agent.set`, `agent.after__change` called with (`ctx__change`, `ctx`)
	 * @property {function} on - On event handler.
	 * @property {function} trigger__change - Triggers the change event on the agent.
	 * @property {function} clear - `assign` `null` values for `agent.scope` onto `ctx`.
	 * @property {function} reset - A generator function that Resets the `agent.scope` on `ctx` with data from an upstream `agent` or service. Overridden to include wrapping logic (e.g. debouncing).
	 * @property {function} set - `assign` `ctx__reset` onto `ctx`.
	 */
	mixin(agent, {
		// place these fields on top of object key order
		key,
		scope,
		type: 'agent',
	}, ...array__ctx__agent, {
		key,
		scope,
		reinit: reinit__agent.bind(agent),
		_ctx__set,
		_ctx__clear,
		get,
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
		get $() {
			return __0.call(agent)
		},
		get __0() {
			return __0.call(agent)
		},
		get scope__0() {
			return get__scope__0.call(agent)
		}
	})
	ctx[key] = agent
	for (let i = 0; i < array__ctx__agent.length; i++) {
		const ctx__agent__ = array__ctx__agent[i]
		const { init } = ctx__agent__
		if (init) init.call(agent, agent)
	}
	load.call(agent)
}
/**
 * Returns the value of the first `scope` on the `agent` (`ctx[agent.scope[0]]`).
 * @returns {*} The value of the agent's first scope on the ctx.
 */
export function __0() {
	const agent = this
	const { scope__0 } = agent
	return scope__0 && agent.ctx[scope__0]
}
/**
 * Returns the key of the first `scope` on the `agent` (agent.scope[0]).
 * @returns {string} The key of the agent's first scope.
 */
export function get__scope__0() {
	const agent = this
	return agent.scope[0]
}
export function get() {
	const agent = this
	const { ctx, scope } = agent
	const $ = {}
	for (let i = 0; i < scope.length; i++) {
		const key = scope[i]
		$[key] = ctx[key]
	}
	return $
}
/**
 * `assign` the `agent.scope` keys from `ctx__assign` onto `ctx`
 * @param {...module:ctx-core/agent/lib~ctx__set} ctx__set - Assigned onto ctx.
 * @returns {module:ctx-core/agent/lib~agent}
 * @see {@link module:ctx-core/object/lib~agent._ctx__set}
 * @see {@link module:ctx-core/object/lib~change__agents}
 */
export function set() {
	const agent = this
	const { ctx, key } = agent
	log(`${logPrefix}|set`, key)
	const ctx__set = agent._ctx__set(...arguments)
	const ctx__set__scope = pick__scope(ctx__set, agent)
	if (!keys(ctx__set__scope).length) return agent
	if (agent.before__set) agent.before__set(ctx__set__scope, ctx)
	let ctx__change = {}
	let detected__change = false
	for (let key in ctx__set__scope) {
		const value = ctx__set__scope[key]
		if (ctx[key] !== value) {
			ctx__change[key] = value
			detected__change = true
		}
	}
	agent.trigger('set', ctx__set__scope, ctx)
	if (detected__change) {
		info(`${logPrefix}|set|change__agents`, key, ctx__set__scope)
		if (agent.before__change) agent.before__change(ctx__change, ctx)
		change__agents(ctx, ctx__change)
		if (agent.after__change) agent.after__change(ctx__change, ctx)
	}
	if (agent.after__set) agent.after__set(ctx__set__scope, ctx)
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
	const agent = this
	const all__scope = _all__scope(agent)
	if (!all__scope) agent.reset(...arguments)
	return agent
}
function _all__scope(agent) {
	const { ctx, scope } = agent
	for (let i = 0; i < scope.length; i++) {
		const scope__i = ctx[scope[i]]
		if (scope__i == null) {
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
 * `agent.set`. Default & Core `agent.reset` function.
 * `agent.reset` can be overridden & overrides often yield `reset__agent`.
 *
 * - agent.set}
 * @this module:ctx-core/agent/lib~agent
 * @returns {Promise<module:ctx-core/agent/lib~agent>}
 */
export function reset__agent() {
	const agent = this
	log(`${logPrefix}|reset__agent`, agent.key)
	agent.set(...arguments)
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
 * @name _ctx__set
 * @function
 * @param {...module:ctx-core/agent/lib~ctx__assign} ctx__assign - ctx__assign passed to agent.set
 * @returns {module:ctx-core/agent/lib~ctx__assign} The ctx__assign used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
/**
 * Default value for `agent._ctx__set`. `clone` the arguments to set.
 * @param {...module:ctx-core/agent/lib~ctx__assign} ctx__assign - ctx__assign passed to agent.set
 * @returns {module:ctx-core/agent/lib~ctx__assign} The ctx__assign used to call `change__agents`
 * @see {@link module:ctx-core/agent/lib~change__agents}
 */
export function _ctx__set__core() {
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
	if (!ctx.timeout__trigger__change) {
		ctx.timeout__trigger__change =
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
	const { ctx, scope } = agent
	return scope && pick(ctx, ...scope)
}
/**
 * Selects matching event names in the `ctx__select` (i.e. `key__change__agent`) & binds the events to the `agent`.
 * @param {ctx__select} ctx__select - A map of the events to bind with the key being the ctx name of the event & the value being the event handler.
 * @this module:ctx-core/agent/lib~agent
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function pick__on() {
	const agent = this
	const ctx__select = clone(...arguments)
	for (let key__select in ctx__select) {
		const ctx__frame = _select__ctx__frame(agent, ctx__select, key__select)
		const { change } = ctx__frame
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
	const ctx__select = clone(...arguments)
	for (let key__select in ctx__select) {
		const ctx__frame = _select__ctx__frame(agent, ctx__select, key__select)
		const { change } = ctx__frame
		if (change) {
			agent.off('change', change)
		}
	}
	return agent
}
function _select__ctx__frame(agent, ctx__select, key__select) {
	let ctx__frame = {
		agent,
		key__select
	}
	const { key } = agent
	const regex__key = new RegExp(`__${key.replace('$', '\$')}$`)
	const match__key = key__select.match(regex__key)
	if (match__key) {
		ctx__frame[match__key[2]] = ctx__select[key__select]
		return ctx__frame
	}
	const { scope__0 } = agent
	if (scope__0) {
		const regex__scope = new RegExp(`(on\$)?([^$]*)__${scope__0}$`)
		const match__scope = key__select.match(regex__scope)
		if (match__scope) {
			ctx__frame[match__scope[2]] = ctx__select[key__select]
			return ctx__frame
		}
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
	const { key, scope, ctx } = agent
	agent.trigger('set', ctx__change, ctx)
	const ctx__change__scope = _ctx__change__scope(ctx, ctx__change, scope)
	if (ctx__change__scope) {
		info(`${logPrefix}|trigger__change|trigger`, key)
		const { ttl, key__expires } = agent
		if (ttl) ctx[key__expires] =
			new Date(new Date().getTime + ttl)
		const { ctx__change: ctx__change__ctx } = ctx
		for (let i = 0; i < scope.length; i++) {
			const key = scope[i]
			ctx__change__ctx[key] = ctx[key]
		}
		agent.trigger('change', ctx, ctx__change)
	}
	return ctx__change__scope
}
function _ctx__change__scope(ctx, ctx__change__, scope) {
	let has__change
	const ctx__change = {}
	for (let i = 0; i < scope.length; i++) {
		const key = scope[i]
		const value__ctx__change__ = ctx__change__[key]
		if (
			(key in ctx)
			&& ctx[key] != value__ctx__change__
		) {
			has__change = true
			ctx__change[key] = ctx[key]
		}
	}
	return has__change && ctx__change
}
export const trigger__change__agent = trigger__change
/**
 * Runs {@link agent.trigger__change} on all of the `agents` in the `ctx`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
function do__trigger__change(ctx) {
	log(`${logPrefix}|do__trigger__change`)
	const { ctx__change } = ctx
	ctx.ctx__change = null
	ctx.timeout__trigger__change = null
	ensure__ctx__change(ctx)
	const agents__change = ctx.agent__agents._agents__change(ctx.ctx__change)
	const ctx__change__ = {}
	let has__change
	for (let i = 0; i < agents__change.length; i++) {
		const agent__change = agents__change[i]
		const ctx__change__trigger = agent__change.trigger__change(ctx__change)
		if (ctx__change__trigger) {
			has__change = true
			assign(ctx__change__, ctx__change__trigger)
		}
	}
	if (has__change) {
		ctx.agent__agents.trigger('ctx__change', ctx__change__)
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
 * `agent.clear` sets `agent.scope` values to `null` on the `ctx`.
 * @returns {module:ctx-core/agent/lib~agent}
 */
export function clear__core(value__clear = null) {
	log(`${logPrefix}|clear__core`)
	const agent = this
	agent.set(agent._ctx__clear(value__clear))
	return agent
}
/**
 * from `ctx`, `pick` a new `ctx` only having keys in `agent.scope`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {module:ctx-core/agent/lib~agent}
 * @param {...additional_key} additional_key - additional `key` to add
 * @returns {picked$ctx} picked$ctx - the `ctx` with `agent.scope` `keys` picked
 */
export function pick__scope(ctx, agent, ...additional_keys) {
	return pick(ctx, ...(agent.scope || []), ...additional_keys)
}
function _ctx__clear(value__clear = null) {
	const agent = this
	const { scope } = agent
	return _ctx__clear__(scope, value__clear)
}
/**
 * Clone `ctx` & `ctx__set__` and set agent.
 * `clone(ctx[key], ctx__set__[key])`
 * @param {module:ctx-core/agent/lib~agent} agent
 * @param {Object} ctx__set__
 */
export function clone__set__agent(agent, ctx__set__) {
	const { ctx } = agent
	const ctx__set = {}
	for (let key in ctx__set__) {
		ctx__set[key] = clone(ctx[key], ctx__set__[key])
	}
	return agent.set(ctx__set)
}
export const clone__set = clone__set__agent
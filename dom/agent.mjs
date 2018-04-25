/**
 * agents for the dom
 * @module ctx-core/dom/agent
 */
import {assign,clone} from 'ctx-core/object/lib.mjs'
import {ensure__agent} from 'ctx-core/agent/lib.mjs'
import {has__dom} from 'ctx-core/dom/lib.mjs'
import {_difference} from 'ctx-core/array/lib.mjs'
import {TAB} from 'ctx-core/keyboard/lib.mjs'
import {log,warn,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/dom/agent.mjs'
export function agent__tabs__dom(ctx, ...array__opts) {
	let agent = ctx.agent__tabs__dom
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__tabs__dom',
		scope:
			[ 'tabs__dom',
				'index__tab__dom',
				'tab__dom'],
		init,
		_ctx__set,
		focus,
		focus__forward,
		focus__backward
	}, ...array__opts)
	function init() {
		log(`${logPrefix}|agent__tabs__dom|init`)
		agent = this
		if (has__dom()) window.addEventListener('keydown', onkeydown)
	}
	function _ctx__set() {
		log(`${logPrefix}|agent__tabs__dom|_ctx__set`)
		let ctx__set = clone(...arguments)
		const tabs__dom =
						ctx__set.tabs__dom
						|| ctx.tabs__dom
						|| []
				, tabs__dom__old = ctx.tabs__dom || []
				, tabs__remove = _difference(tabs__dom__old, tabs__dom)
				, tabs__add = _difference(tabs__dom, tabs__dom__old)
		for (let i=0; i < tabs__remove.length; i++) {
			const tab__remove = tabs__remove[i]
			tab__remove.removeEventListener('focus', __focus__tab)
			tab__remove.tabIndex = -1
		}
		for (let i=0; i < tabs__add.length; i++) {
			const tab__add = tabs__add[i]
			tab__add.addEventListener('focus', __focus__tab)
		}
		for (let i=0; i < tabs__dom.length; i++) {
			const tab = tabs__dom[i]
			tab.tabIndex = i
		}
		const index__tab__dom =
						ctx__set.index__tab__dom != null
						? ctx__set.index__tab__dom
						: ctx.index__tab__dom != null
							? ctx.index__tab__dom
							: 0
				, tab__dom = tabs__dom[index__tab__dom]
		assign(ctx__set, {tab__dom, index__tab__dom})
		return ctx__set
	}
	function __focus__tab(e) {
		log(`${logPrefix}|__focus__tab`)
		const index__tab__dom =	 ctx.tabs__dom.indexOf(e.target)
		if (index__tab__dom > -1) agent.set({index__tab__dom})
	}
	function focus__forward() {
		log(`${logPrefix}|agent__tabs__dom|focus__forward`)
		focus(1)
	}
	function focus__backward() {
		log(`${logPrefix}|agent__tabs__dom|focus__backward`)
		focus(-1)
	}
	function focus(delta__or__$dom=1) {
		log(`${logPrefix}|agent__tabs__dom|focus`, delta__or__$dom)
		const {tabs__dom = []} = ctx
				, {length = 0} = tabs__dom
		let index__dom__tab
		if (length) {
			const delta =
				typeof delta__or__$dom === "number"
				&& delta__or__$dom
			if (delta) {
				index__dom__tab = index__dom__tab__from__delta(delta, length)
			} else {
				index__dom__tab = tabs__dom.indexOf(delta__or__$dom)
			}
		} else {
			index__dom__tab = 0
		}
		agent.set({index__dom__tab})
		if (ctx.tab__dom) ctx.tab__dom.focus()
	}
	function index__dom__tab__from__delta(delta, length) {
		log(`${logPrefix}|index__dom__tab__from__delta`)
		const {tabs__dom} = ctx
		let tab__dom__visible
			, index__dom__tab =
					ctx.index__dom__tab
					|| 0
			, i = -1
		while (!tab__dom__visible) {
			i++
			if (i >= length) {
				warn(`${logPrefix}|index__dom__tab__from__delta|while|break`)
				break
			}
			index__dom__tab =
				( index__dom__tab
					+ (length + (delta % length)))
				% length
			let tab__dom =
						tabs__dom[index__dom__tab]
				, style__tab__dom =
						getComputedStyle(tab__dom)
			if (style__tab__dom.display !== 'none')
				tab__dom__visible = tab__dom
		}
		return index__dom__tab
	}
	function onkeydown(e) {
		log(`${logPrefix}|agent__tabs__dom|onkeydown`, e)
		if(
			e.keyCode === TAB
			&& e.shiftKey
			&& !e.altKey
			&& !e.ctrlKey
			&& !e.metaKey
		) {
			e.preventDefault()
			focus__backward()
		} else if (
			e.keyCode === TAB
			&& !e.getModifierState(e.key)
		) {
			e.preventDefault()
			focus__forward()
		}
	}
}
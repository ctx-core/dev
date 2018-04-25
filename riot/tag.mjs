import {clone} from 'ctx-core/object/lib.mjs'
import {registerElement} from 'ctx-core/dom/lib.mjs'
import {$$versioned} from 'ctx-core/html/lib.mjs'
import {closest} from 'ctx-core/dom/lib.mjs'
import {_chain
			, __ctx
			, __ctx__or__fn
			, __ctx__or__a} from 'ctx-core/chain/lib'
import parseUri from 'parseUri'
import {navigate} from 'ctx-core/route/lib.mjs'
import {log,_console,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/riot/tag.mjs'
export function tag__assign(tag, ...tag_overrides$$) {
	log(`${logPrefix}|tag__assign`, tag)
	let {opts} = tag
		, {ctx} = opts
	const tag_overrides = clone(...tag_overrides$$)
	tag_overrides.registerElement =
		[].concat(...(tag_overrides.registerElement||[]))
	tag_overrides.registerElement.push(tag.root.tagName)
	tag.mixin(clone({
		ctx,
		$chain: _chain,
		$$ctx: __ctx,
		$ctx: __ctx(ctx),
		$ctx__or__fn: __ctx__or__fn(ctx),
		$ctx__or__a: __ctx__or__a(ctx),
		schedule__update: schedule__update.bind(tag),
		$versioned: $$versioned(ctx),
		__click__navigate: _fn__click__nagivate(ctx).bind(tag),
		__click__outbound: _fn__click__outbound(ctx).bind(tag)
	}, tag_overrides))
	for (let i=0; i < tag_overrides.registerElement.length; i++) {
		const element = tag_overrides.registerElement[i]
		registerElement(ctx, element)
	}
	return tag
}
export function _fn__click__outbound(ctx, ...array__opts) {
	const opts = clone(...array__opts)
			, { name__tag='a'
				, href$key='href'} = opts
	return e => {
		log(`${logPrefix}|__click__outbound`)
		e.preventDefault()
		const el = closest(name__tag, e.target, true)
		window.location.href = el[href$key]
	}
}
export function _fn__click__nagivate(ctx, ...array__opts) {
	const opts = clone(...array__opts)
			, { name__tag='a'
				, href$key='href'} = opts
	return e => {
		const el = closest(name__tag, e.target, true)
		log(`${logPrefix}|__click__navigate`)
		if (e.preventDefault) e.preventDefault()
		const uri__link = parseUri(el[href$key])
				, {path,query} = uri__link
				, query$ =
						query
						? `?${query}`
						: ''
		navigate(ctx, `${path}${query$}`)
		return false
	}
}
export function schedule__update(timeout=0) {
	log(`${logPrefix}|schedule__update`)
	const tag = this
	setTimeout(
		_console(
			() => tag.update(),
			{info: `${logPrefix}|schedule__update|setTimeout`}),
		timeout)
}
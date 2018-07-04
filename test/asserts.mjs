import {throw__error} from 'ctx-core/error/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
import equal from 'deep-equal'
const tab = '							 '
		, logPrefix = 'ctx-core/test/asserts.mjs'
export function assert__equal(ctx) {
	const { header__error_message } = ctx
			, header__error_message__ =
					header__error_message
					? `${tab}${header__error_message}\n`
					: ''
			, _error_message =
					ctx._error
					|| (ctx =>
								`\n${header__error_message__}${tab}${JSON.stringify(ctx.actual)} should == ${JSON.stringify(ctx.expected)}`)
	if (!equal(ctx.actual, ctx.expected)) {
		log(`${logPrefix}|assertEqual|error`)
		throw__error(ctx, { error_message: _error_message(ctx) })
	}
}
export function message__error__json__multiline(ctx) {
	return `${JSON.stringify(ctx.actual)}\n${tab}should equal\n${tab}${JSON.stringify(ctx.expected)}`
}
export function assert__match(ctx) {
	const { match, actual } = ctx
			, _error_message =
					ctx._error
					|| (ctx =>
								`${ctx.actual} should match ${ctx.match}`)
	if (typeof match === 'string') {
		if (actual.indexOf(match) == -1) {
			log(`${logPrefix}|assert__match|string|error`)
			throw__error(ctx, { error_message: _error_message(ctx) })
		}
	} else if (typeof match === 'object') {
		if (!match.test(actual)) {
			log(`${logPrefix}|assert__match|object|error`)
			throw__error(ctx, { error_message: _error_message(ctx) })
		}
	}
}
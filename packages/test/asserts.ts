import { throw__error } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
import equal from 'deep-equal'
const tab = '							 '
const logPrefix = '@ctx-core/test/asserts.js'
type Opts__assert__equal = {
	header__error_message?:string
	_error?:(any)=>string
	actual:any
	expected:any
}
export function assert__equal(opts:Opts__assert__equal) {
	const { header__error_message } = opts
	const header__error_message__ =
		header__error_message
		? `${tab}${header__error_message}\n`
		: ''
	const _error_message =
		opts._error
		|| (ctx=>
			`\n${header__error_message__}${tab}${JSON.stringify(ctx.actual)} should == ${JSON.stringify(ctx.expected)}`)
	if (!equal(opts.actual, opts.expected)) {
		log(`${logPrefix}|assertEqual|error`)
		throw__error({ error_message: _error_message(opts) })
	}
}
export function message__error__json__multiline(ctx) {
	return `${JSON.stringify(ctx.actual)}\n${tab}should equal\n${tab}${JSON.stringify(ctx.expected)}`
}
export function assert__match(opts) {
	const { match, actual } = opts
	const _error_message =
		opts._error
		|| (ctx=>
			`${ctx.actual} should match ${ctx.match}`)
	if (typeof match === 'string') {
		if (actual.indexOf(match) == -1) {
			log(`${logPrefix}|assert__match|string|error`)
			throw__error({ error_message: _error_message(opts) })
		}
	} else if (typeof match === 'object') {
		if (!match.test(actual)) {
			log(`${logPrefix}|assert__match|object|error`)
			throw__error({ error_message: _error_message(opts) })
		}
	}
}

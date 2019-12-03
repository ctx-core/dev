import { some, every, find, each, reduce, } from '@ctx-core/array'
import { keys, pick, assign, isArray } from '@ctx-core/object'
import { tap } from '@ctx-core/function'
const flag_regex = /^--?(.*)/
const regex__split__param_dfn = /\s*,\s*/
function _a1__flag(param_dfn) {
	return param_dfn.split(regex__split__param_dfn)
}
export function _h__flag(arg_a1) {
	const h__flag = {}
	let i = 0
	while (i < arg_a1.length) {
		const flag = arg_a1[i]
		const match = flag_regex.test(flag)
		let j = i + 1
		if (match) {
			while (j < arg_a1.length && !flag_regex.test(arg_a1[j])) {
				const value = arg_a1[j]
				if (h__flag[flag]) {
					h__flag[flag] += ` ${value}`
				} else {
					h__flag[flag] = value
				}
				j += 1
			}
		}
		if (!(flag in h__flag)) h__flag[flag] = null
		i = j
	}
	return h__flag
}
export function _a1__arg__h__flag(h__flag, arg_a1) {
	return reduce(
		keys(h__flag),
		(memo, flag)=>{
			memo.push(flag)
			const _value = h__flag[flag]
			const value =
				typeof _value === 'function'
				? _value(arg_a1)
				: _value
			if (value != null) {
				memo.push(...[].concat(value))
			}
			return memo
		},
		[]
	)
}
export function _a1__arg__default(
	arg_a1,
	h1__param_dfn__h0__value = {},
	a1__cancel = []
) {
	const arg_a1__default = arg_a1.slice(0)
	const h__flag = _h__flag(arg_a1__default)
	if (some(keys(h__flag), flag=>a1__cancel.indexOf(flag) > -1)) {
		return arg_a1__default
	}
	for (let param_dfn in h1__param_dfn__h0__value) {
		const a1__flag = _a1__flag(param_dfn)
		if (every(a1__flag, flag=>!(flag in h__flag))) {
			const value = h1__param_dfn__h0__value[param_dfn]
			const value__ = typeof value === 'function' ? value() : value
			const flag =
				find(a1__flag, flag=>/^--/.test(flag))
				|| a1__flag[0]
			arg_a1__default.push(flag, value__)
		}
	}
	return arg_a1__default
}
function _h__flag__dfn(a1__param_dfn) {
	const h__flag__dfn = {}
	each(a1__param_dfn, param_dfn=>{
		const a1__flag = _a1__flag(param_dfn)
		each(a1__flag, flag=>{
			h__flag__dfn[flag] = a1__flag
		})
	})
	return h__flag__dfn
}
export function _h__flag__pick(arg_a1:[], ...a1__param_dfn) {
	const h__flag__dfn = _h__flag__dfn(a1__param_dfn)
	const h__flag = _h__flag(arg_a1)
	const a1__flag__pick = []
	each(keys(h__flag), flag=>{
		if (flag in h__flag__dfn) {
			a1__flag__pick.push(flag)
		}
	})
	return pick(h__flag, ...a1__flag__pick)
}
export function pick__a1__arg(arg_a1, ...a1__param_dfn) {
	const h__flag__pick = _h__flag__pick(arg_a1, ...a1__param_dfn)
	return _a1__arg__h__flag(h__flag__pick, arg_a1)
}
export type reducer__param_dfn = (any, string)=>any
export type h1__param_name__h0__param_dfn =
	{ [key:string]:string|[string, reducer__param_dfn] }
function _h1__flag__h0__param_name(h1__param_name__h0__param_dfn?:h1__param_name__h0__param_dfn) {
	const h1__flag__h0__param_name = {}
	for (let param_name in h1__param_name__h0__param_dfn) {
		const param_dfn = h1__param_name__h0__param_dfn[param_name]
		const a1__flag =
			_a1__flag(
				isArray(param_dfn) ? param_dfn[0] : param_dfn)
		each(a1__flag,
			flag=>
				h1__flag__h0__param_name[flag] = param_name)
	}
	return h1__flag__h0__param_name
}
export function _h1__param_name__h0__param_value(
	arg_a1:string[],
	h1__param_name__h0__param_dfn?:h1__param_name__h0__param_dfn
) {
	const h1__param_name__h0__param_value = {}
	const h1__flag__h0__param_name =
		_h1__flag__h0__param_name(h1__param_name__h0__param_dfn)
	let i = 0
	while (i < arg_a1.length) {
		const flag = arg_a1[i]
		const match = flag_regex.test(flag)
		let j = i + 1
		if (match) {
			const j__no_value = j
			const param_name = h1__flag__h0__param_name[flag] || flag
			const _param = ((
				isArray(h1__param_name__h0__param_dfn[param_name])
				&& h1__param_name__h0__param_dfn[param_name][1]
			) || ((_, val)=>val)) as reducer__param_dfn
			while (j < arg_a1.length && !flag_regex.test(arg_a1[j])) {
				h1__param_name__h0__param_value[param_name] =
					_param(
						h1__param_name__h0__param_value[param_name],
						arg_a1[j]
					)
				j += 1
			}
			if (j === j__no_value) {
				h1__param_name__h0__param_value[param_name] = true
			}
		}
		i = j
	}
	return h1__param_name__h0__param_value
}
export function _h__param(
	arg_a1:string[],
	h1__param_name__h0__param_dfn?:h1__param_name__h0__param_dfn,
	h1__param_name__h0__default_value = {}
) {
	const h__param =
		_h1__param_name__h0__param_value(arg_a1, h1__param_name__h0__param_dfn)
	const h__param__default = {}
	for (let param_name in h1__param_name__h0__default_value) {
		if (h__param[param_name] == null) {
			const default_value = h1__param_name__h0__default_value[param_name]
			const default_value__ =
				typeof default_value === 'function'
				? default_value(h__param, param_name)
				: default_value
			h__param__default[param_name] = default_value__
		}
	}
	assign(h__param, h__param__default)
	if (h1__param_name__h0__param_dfn) {
		const a1__param_name = keys(h1__param_name__h0__param_dfn)
		return pick(h__param, ...a1__param_name)
	}
	return h__param
}
export const _h__param__pick__default = _h__param
export function reducer__a1__param_dfn(memo, value):any[] {
	return tap(memo || [], a1=>a1.push(value))
}

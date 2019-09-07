import { some, every, find, each, reduce, } from '@ctx-core/array'
import { keys, pick } from '@ctx-core/object'
import { or__in } from '@ctx-core/function'
const flag_regex = /^--?(.*)/
const regex__split__dfn__flag = /\s*,\s*/
export function _h__flag(a1__arg) {
	const h__flag = {}
	let i = 0
	while (i < a1__arg.length) {
		const flag = a1__arg[i]
		const match = flag_regex.test(flag)
		let j = i + 1
		if (match) {
			while (j < a1__arg.length && !flag_regex.test(a1__arg[j])) {
				const value = a1__arg[j]
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
export function _a1__arg__h__flag(h__flag, a1__arg) {
	return reduce(
		keys(h__flag),
		(memo, flag)=>{
			if (flag in h__flag) {
				memo.push(flag)
				const _value = h__flag[flag]
				const value =
					typeof _value === 'function'
					? _value(a1__arg)
					: _value
				if (value != null) {
					memo.push(value)
				}
			}
			return memo
		},
		[]
	)
}
function _a1__flag(dfn__flag) {
  return dfn__flag.split(regex__split__dfn__flag)
}
export function _a1__arg__default(a1__arg, h1__dfn__flag__h0__value = {}, a1__cancel = []) {
	const a1__arg__default = a1__arg.slice(0)
	const h__flag = _h__flag(a1__arg__default)
	if (some(keys(h__flag), flag=>a1__cancel.indexOf(flag) > -1)) {
		return a1__arg__default
	}
	for (let dfn__flag in h1__dfn__flag__h0__value) {
		const a1__flag = _a1__flag(dfn__flag)
		if (every(a1__flag, flag=>!(flag in h__flag))) {
			const value = h1__dfn__flag__h0__value[dfn__flag]
			const value__ = typeof value === 'function' ? value() : value
			const flag =
				find(a1__flag, flag=>/^--/.test(flag))
				|| a1__flag[0]
			a1__arg__default.push(flag, value__)
		}
	}
	return a1__arg__default
}
function _h__flag__dfn(a1__dfn__flag) {
	const h__flag__dfn = {}
	each(a1__dfn__flag, dfn__flag=>{
		const a1__flag = _a1__flag(dfn__flag)
		each(a1__flag, flag=>{
			h__flag__dfn[flag] = a1__flag
		})
	})
	return h__flag__dfn
}
export function _h__flag__pick(a1__arg:[], ...a1__dfn__flag) {
	const h__flag__dfn = _h__flag__dfn(a1__dfn__flag)
	const h__flag = _h__flag(a1__arg)
	const a1__flag__pick = []
	each(keys(h__flag), flag=>{
		if (flag in h__flag__dfn) {
			a1__flag__pick.push(flag)
		}
	})
	return pick(h__flag, ...a1__flag__pick)
}
export function pick__a1__arg(a1__arg, ...a1__dfn__flag) {
	const h__flag__pick = _h__flag__pick(a1__arg, ...a1__dfn__flag)
	return _a1__arg__h__flag(h__flag__pick, a1__arg)
}
export function _h__param__pick(a1__arg:[], h__param__dfn__flag) {
	const h__flag = _h__flag(a1__arg)
	const a1__key = keys(h__param__dfn__flag)
	const h__param = {}
	each(a1__key, key__param => {
		const dfn__flag = h__param__dfn__flag[key__param]
		const a1__flag = _a1__flag(dfn__flag)
		const flag = or__in(h__flag, a1__flag)
		h__param[key__param] = h__flag[flag]
	})
	return h__param
}

import { every, find } from '@ctx-core/array'
export function parse__a1__arg(a1__arg) {
	const flag_regex = /^--?(.*)/
	const set__flag = new Set()
	let i = 0
	while (i < a1__arg.length) {
		const flag = a1__arg[i]
		const match = flag_regex.test(flag)
		if (match) {
			if (!flag_regex.test(a1__arg[i + 1])) {
				const value = a1__arg[i + 1]
				set__flag.add(flag, value)
				i += 2
				continue
			}
		}
		set__flag.add(flag, true)
		i += 1
	}
	return set__flag
}
export function _a1__arg__default(a1__arg, defaults = {}) {
	const a1__arg__default = a1__arg.slice(0)
	const set__flag = parse__a1__arg(a1__arg__default)
	for (let dfn__flag in defaults) {
		const a1__flag = dfn__flag.split(/\s*,\s*/)
		if (every(a1__flag, flag => !set__flag.has(flag))) {
			const value = defaults[dfn__flag]
			const value__ = typeof value === 'function' ? value() : value
			const flag =
				find(a1__flag, flag => /^--/.test(flag))
				|| a1__flag[0]
			a1__arg__default.push(flag, value__)
		}
	}
	return a1__arg__default
}

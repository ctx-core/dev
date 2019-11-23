export function _indentation(count__indent, indent='	') {
	return new Array(count__indent + 1).join(indent)
}
export const $indentation = _indentation
export function _regexp__indentation(spaces) {
	const regexpSource = '^' + _indentation(spaces)
	return new RegExp(regexpSource, 'gm')
}
export const $regexp__indentation = _regexp__indentation
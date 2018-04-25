export function _indentation(spaces) {
	return new Array(spaces+1).join(' ')
}
export const $indentation = _indentation
export function _regexp__indentation(spaces) {
	const regexpSource = '^' + _indentation(spaces)
	return new RegExp(regexpSource, 'gm')
}
export const $regexp__indentation = _regexp__indentation
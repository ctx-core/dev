export function _re(pattern:RegExp|string, flags?:string) {
	return new RegExp(pattern, flags)
}
/**
 * @see {@link https://github.com/capaj/index-of-regex}
 */
/**
 * indexOf with regex
 * @param str
 * @param regex
 * @param startpos
 * @returns {number}
 */
export function indexOf__regex(str, regex, startpos) {
	const startpos__ = startpos || 0
	const indexOf = str.substring(startpos__).search(regex)
	return (
		(indexOf >= 0)
		? (indexOf + startpos__)
		: indexOf
	)
}
/**
 * lastIndexOf with regex
 * @param str
 * @param regex
 * @param startpos
 * @returns {number}
 */
export function lastIndexOf__regex(str, regex, startpos) {
	regex =
		regex.global
		? regex
		: new RegExp(
			regex.source,
			'g'
			+ (regex.ignoreCase ? 'i' : '')
			+ (regex.multiLine ? 'm' : ''))
	if (typeof (startpos) === 'undefined') {
		startpos = str.length
	} else if (startpos < 0) {
		startpos = 0
	}
	const stringToWorkWith = str.substring(0, startpos + 1)
	let lastIndexOf = -1
	let nextStop = 0
	let result
	while ((result = regex.exec(stringToWorkWith)) != null) {
		lastIndexOf = result.index
		regex.lastIndex = ++nextStop
	}
	return lastIndexOf
}

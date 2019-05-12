const use_chalk = typeof window === 'undefined' && typeof require === 'function'
const chalk = _chalk()
export function debug__chalk() {
	return (console.debug || console.info).apply(console, _a1__chalk__debug(...arguments))
}
export function log__chalk() {
	return console.log.apply(console, _a1__chalk__log(...arguments))
}
export function info__chalk() {
	return console.info.apply(console, _a1__chalk__info(...arguments))
}
export function warn__chalk() {
	return console.warn.apply(console, _a1__chalk__warn(...arguments))
}
export function error__chalk() {
	return console.error.apply(console, _a1__chalk__error(...arguments))
}
function _a1__chalk__debug() {
	return (
		use_chalk
		? [chalk.white(...arguments)]
		: arguments
	)
}
function _a1__chalk__log() {
  return (
  	use_chalk
		? [chalk.grey(...arguments)]
		: arguments
	)
}
function _a1__chalk__info() {
  return (
  	use_chalk
		? [chalk.green(...arguments)]
		: arguments
	)
}
function _a1__chalk__warn() {
  return (
  	use_chalk
		? [chalk.red(...arguments)]
		: arguments
	)
}
function _a1__chalk__error() {
  return (
  	use_chalk
		? [chalk.red.bold(...arguments)]
		: arguments
	)
}
function _chalk() {
	if (use_chalk) {
		return require('chalk')
	} else {
		return function chalk(...args) {
			return args
		}
	}
}

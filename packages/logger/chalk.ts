const use_chalk = typeof window === 'undefined' && typeof require === 'function'
const chalk = _chalk()
export function debug__chalk(...arg_a1) {
	return (console.debug || console.info).apply(console, _a1__chalk__debug(...arg_a1))
}
export function log__chalk(...arg_a1) {
	return console.log.apply(console, _a1__chalk__log(...arg_a1))
}
export function info__chalk(...arg_a1) {
	return console.info.apply(console, _a1__chalk__info(...arg_a1))
}
export function warn__chalk(...arg_a1) {
	return console.warn.apply(console, _a1__chalk__warn(...arg_a1))
}
export function error__chalk(...arg_a1) {
	return console.error.apply(console, _a1__chalk__error(...arg_a1))
}
function _a1__chalk__debug(...arg_a1) {
	return (
		use_chalk
		? [chalk.white(...arg_a1)]
		: arg_a1
	)
}
function _a1__chalk__log(...arg_a1) {
  return (
  	use_chalk
		? [chalk.grey(...arg_a1)]
		: arg_a1
	)
}
function _a1__chalk__info(...arg_a1) {
  return (
  	use_chalk
		? [chalk.green(...arg_a1)]
		: arg_a1
	)
}
function _a1__chalk__warn(...arg_a1) {
  return (
  	use_chalk
		? [chalk.red(...arg_a1)]
		: arg_a1
	)
}
function _a1__chalk__error(...arg_a1) {
  return (
  	use_chalk
		? [chalk.red.bold(...arg_a1)]
		: arg_a1
	)
}
function _chalk() {
	if (use_chalk) {
		return require('chalk')
	} else {
		return function chalk(...arg_a1) {
			return arg_a1
		}
	}
}

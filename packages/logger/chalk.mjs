import chalk from 'chalk'
const {
	white,
	grey,
	green,
	red
} = chalk
const chalk__debug = white
const chalk__log = grey
const chalk__info = green
const chalk__warn = red
const chalk__error = red && red.bold
export function debug__chalk() {
	return (console.debug || console.info).apply(console,
		chalk__error
		? [chalk__debug(...arguments)]
		: arguments
	)
}
export function log__chalk() {
	return console.log.apply(console,
		chalk__log
		? [chalk__log(...arguments)]
		: arguments
	)
}
export function info__chalk() {
	return console.info.apply(console,
		chalk__info
		? [chalk__info(...arguments)]
		: arguments
	)
}
export function warn__chalk() {
	return console.warn.apply(console,
		chalk__warn
		? [chalk__warn(...arguments)]
		: arguments
	)
}
export function error__chalk() {
	return console.error.apply(console,
		chalk__error
		? [chalk__error(...arguments)]
		: arguments
	)
}
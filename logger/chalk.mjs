import chalk from 'chalk'
const chalk__debug = chalk.white
const chalk__log = chalk.grey
const chalk__info = chalk.green
const chalk__warn = chalk.red
const chalk__error = chalk.red.bold
export function debug__chalk() {
	return (console.debug || console.info)(chalk__debug(...arguments))
}
export function log__chalk() {
	return console.log(chalk__log(...arguments))
}
export function info__chalk() {
	return console.info(chalk__info(...arguments))
}
export function warn__chalk() {
	return console.warn(chalk__warn(...arguments))
}
export function error__chalk() {
	return console.error(chalk__error(...arguments))
}
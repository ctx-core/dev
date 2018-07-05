export function debug__chalk() {
	return (console.debug || console.info)(...arguments)
}
export function log__chalk() {
	return console.log(...arguments)
}
export function info__chalk() {
	return console.info(...arguments)
}
export function warn__chalk() {
	return console.warn(...arguments)
}
export function error__chalk() {
	return console.error(...arguments)
}
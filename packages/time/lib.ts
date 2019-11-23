export function _timedout(start, timout_ms) {
	return new Date().getTime() >= (start.getTime() + timout_ms)
}
export function _milliseconds__timestamp() {
	const performance = typeof window === 'object' && window.performance
	const now = performance && performance.now
	const timing = performance && performance.timing
	const navigationStart = timing && timing.navigationStart
	const milliseconds__timestamp =
		now && navigationStart
		? now() + navigationStart
		: Date.now()
	return milliseconds__timestamp
}
export const seconds__year = 31536000
export const milliseconds__year = seconds__year * 1000
export const seconds__month = 2592000
export const milliseconds__month = seconds__month * 1000
export const seconds__day = 86400
export const milliseconds__day = seconds__day * 1000
export const seconds__hour = 3600
export const milliseconds__hour = seconds__hour * 1000
export const seconds__minute = 60
export const milliseconds__minute = seconds__minute * 1000
/**
 *
 * @param date
 * @returns {string}
 * @see {@link https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site#answer-3177838}
 */
export function _text__time__since(date) {
	const seconds = Math.floor(
		(new Date().getTime() - date.getTime())
		/ 1000
	)
	let interval = Math.floor(seconds / seconds__year)
	if (interval > 1) {
		return `${interval} years`
	}
	interval = Math.floor(seconds / seconds__month)
	if (interval > 1) {
		return `${interval} months`
	}
	interval = Math.floor(seconds / seconds__day)
	if (interval > 1) {
		return `${interval} days`
	}
	interval = Math.floor(seconds / seconds__hour)
	if (interval > 1) {
		return `${interval} hours`
	}
	interval = Math.floor(seconds / seconds__minute)
	if (interval > 1) {
		return `${interval} minutes`
	}
	return `${Math.floor(seconds)} seconds`
}

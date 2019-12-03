export const a1__month = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
export const a1__month__abbrev = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]
export const minute = 1000 * 60
export const hour = 60 * minute
export const day = 24 * hour
export const week = 7 * day
export function _yyyymmddhhmmss(date?) {
	date = date || new Date()
	return _yyyymmdd(date) +
		pad2(date.getHours()) +
		pad2(date.getMinutes()) +
		pad2(date.getSeconds())
}
export function _yyyymmdd(date?) {
	date = date || new Date()
	return date.getFullYear() +
		pad2(date.getMonth() + 1) +
		pad2(date.getDate())
}
export function _yyyymmddhhmmss__utc(date?) {
	date = date || new Date()
	return _yyyymmdd__utc(date) +
		pad2(date.getUTCHours()) +
		pad2(date.getUTCMinutes()) +
		pad2(date.getUTCSeconds())
}
export function _yyyymmdd__utc(date?) {
	date = date || new Date()
	return date.getUTCFullYear() +
		pad2(date.getUTCMonth() + 1) +
		pad2(date.getUTCDate())
}
export function _mm_yyyy(date?) {
	date = date || new Date()
	return `${pad2(date.getMonth() + 1)}/${date.getFullYear()}`
}
export function _mm_yyyy__utc(date?) {
	date = date || new Date()
	return `${pad2(date.getUTCMonth() + 1)}/${date.getUTCFullYear()}`
}
export function _MM_yyyy(date?) {
	date = date || new Date()
	return `${a1__month[date.getMonth()]} ${date.getFullYear()}`
}
export function _MM_yyyy__utc(date?) {
	date = date || new Date()
	return `${a1__month[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}
export function _M_yyyy(date?) {
	date = date || new Date()
	return `${a1__month__abbrev[date.getMonth()]} ${date.getFullYear()}`
}
export function _M_yyyy__utc(date?) {
	date = date || new Date()
	return `${a1__month__abbrev[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}
export function _m_yy(date?) {
	date = date || new Date()
	return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
}
export function _m_yy__utc(date?) {
	date = date || new Date()
	return `${date.getUTCMonth() + 1}/${date.getUTCFullYear().toString().slice(2)}`
}
export function format__date__prose(date?) {
	date = date || new Date()
	return `${a1__month[date.getMonth()]} ` +
		`${pad2(date.getDate())}, ` +
		date.getFullYear()
}
export function format__date__prose__utc(date?) {
	date = date || new Date()
	return `${a1__month[date.getUTCMonth()]} ` +
		`${pad2(date.getUTCDate())}, ` +
		date.getUTCFullYear()
}
export function toLocalDateString(date = new Date()) {
  return date.toLocaleDateString()
}
export function _date(...arg_a1:[]) {
	return new Date(...arg_a1)
}
export function _date__append__local_tz(txt__date) {
  return new Date(`${txt__date} (${toLocalDateString()})`)
}
export function _date__at(time) {
	const date = new Date()
	date.setTime(time)
	return date
}
export function _date__diff(diff) {
	const now = new Date()
	now.setTime(now.valueOf() + diff)
	return now
}
export function _milliseconds(date = new Date()) {
  return date.getTime()
}
export function _seconds(date = new Date()) {
  return _milliseconds(date) / 1000
}
function pad2(n) {	// always returns a string
	return (n < 10 ? '0' : '') + n
}

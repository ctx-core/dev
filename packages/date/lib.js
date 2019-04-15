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
export const ARR__month = a1__month
export const months = a1__month
export const a1__month_abbrev = [
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
export const ARR__month_abbrev = a1__month_abbrev
export const months__abbrev = a1__month_abbrev
export const minute = 1000 * 60
export const hour = 60 * minute
export const day = 24 * hour
export const week = 7 * day
export function yyyymmddhhmmss(date) {
	date = date || new Date()
	return yyyymmdd(date) +
		pad2(date.getHours()) +
		pad2(date.getMinutes()) +
		pad2(date.getSeconds())
}
export function yyyymmdd(date) {
	date = date || new Date()
	return date.getFullYear() +
		pad2(date.getMonth() + 1) +
		pad2(date.getDate())
}
export function mm_yyyy(date) {
	date = date || new Date()
	return `${pad2(date.getMonth() + 1)}/${date.getFullYear()}`
}
export function MM_yyyy(date) {
	date = date || new Date()
	return `${a1__month[date.getMonth()]} ${date.getFullYear()}`
}
export function M_yyyy(date) {
	date = date || new Date()
	return `${a1__month_abbrev[date.getMonth()]} ${date.getFullYear()}`
}
export function m_yyyy(date) {
	date = date || new Date()
	return `${date.getMonth() + 1}/${date.getFullYear()}`
}
export function m_yy(date) {
	date = date || new Date()
	return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
}
export function format__date__prose(date) {
	date = date || new Date()
	return `${a1__month[date.getMonth()]} ` +
		`${pad2(date.getDate())}, ` +
		date.getFullYear()
}
export function toLocalDateString(date = new Date()) {
  return date.toLocaleDateString()
}
export function _date(...a1__arg) {
	return new Date(...a1__arg)
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
function pad2(n) {	// always returns a string
	return (n < 10 ? '0' : '') + n
}
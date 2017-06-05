export const months = [
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
export function yyyymmddhhmmss(date) {
  date = date || new Date()
  return  yyyymmdd(date) +
          pad2(date.getHours()) +
          pad2(date.getMinutes()) +
          pad2(date.getSeconds())
}
export function yyyymmdd(date) {
  date = date || new Date()
  return  date.getFullYear() +
          pad2(date.getMonth() + 1) +
          pad2(date.getDate())
}
export function format__date__prose(date) {
  date = date || new Date()
  return  `${months[date.getMonth()]} ` +
          `${pad2(date.getDate())}, ` +
          date.getFullYear()
}
function pad2(n) {  // always returns a string
  return (n < 10 ? '0' : '') + n
}
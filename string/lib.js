import 'ctx-core/string/string.includes.polyfill'
export function lPad__string(str, padString, length) {
  var str2 = str.toString()
  while (str2.length < length)
    str2 = padString + str2
  return str2
}
export function rPad__string(str, padString, length) {
  var str2 = str.toString()
  while (str2.length < length)
    str2 = str2 + padString
  return str2
}
export function splice__string(str, idx, rem, s) {
  return (str.slice(0,idx) + (s||'') + str.slice(idx + Math.abs(rem)))
}
export function titleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}
export const titleCase__string = titleCase
export function string$url$anchor(url) {
  const url$hash$index = url.indexOf('#')
  return url$hash$index != -1 ? url.substring(url$hash$index+1) : ''
}
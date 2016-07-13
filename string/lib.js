import "ctx-core/string/string.includes.polyfill";
export function string$lPad(str, padString, length) {
  var str2 = str.toString();
  while (str2.length < length)
    str2 = padString + str2;
  return str2;
}
export function string$rPad(str, padString, length) {
  var str2 = str.toString();
  while (str2.length < length)
    str2 = str2 + padString;
  return str2;
}
export function string$splice(str, idx, rem, s) {
  return (str.slice(0,idx) + (s||'') + str.slice(idx + Math.abs(rem)));
}
export function string$case$title(str) {
  return str.replace(
    /\w\S*/g,
    (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export function string$url$anchor(url) {
  const url$hash$index = url.indexOf("#");
  return url$hash$index != -1 ? url.substring(url$hash$index+1) : "";
}
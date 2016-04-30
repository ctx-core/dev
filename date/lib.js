export function yyyymmddhhmmss(date) {
  date = date || new Date();
  return date.getFullYear() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());
}
function pad2(n) {  // always returns a string
  return (n < 10 ? '0' : '') + n;
}
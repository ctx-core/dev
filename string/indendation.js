export function $indentation(spaces) {
  return new Array(spaces+1).join(' ')
}
export function $regexp__indentation(spaces) {
  const regexpSource = '^' + $indentation(spaces)
  return new RegExp(regexpSource, 'gm')
}
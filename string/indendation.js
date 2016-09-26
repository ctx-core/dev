export function $indentation(spaces) {
  return new Array(spaces+1).join(' ')
}
export function $indentation$regexp(spaces) {
  const regexpSource = '^' + $indentation(spaces)
  return new RegExp(regexpSource, 'gm')
}
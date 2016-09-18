import dom$classes from 'dom-classes'
export * from 'dom-classes'
export default dom$classes
export function set(el, dom$class, value) {
  let op = value ? 'add' : 'remove'
  return dom$classes[op](el, dom$class)
}
export const set__dom$classes = set
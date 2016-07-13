import dom$classes from "dom-classes";
export default dom$classes;
dom$classes.set = set__dom__classes;
export function set__dom__classes(el, dom$class, value) {
  let op = value ? "add" : "remove";
  return dom$classes[op](el, dom$class);
}
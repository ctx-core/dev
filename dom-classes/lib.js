import dom$classes from "dom-classes";
export default dom$classes;
dom$classes.set = dom$classes$set;
export function dom$classes$set(el, dom$class, value) {
  let op = value ? "add" : "remove";
  return dom$classes[op](el, dom$class);
}
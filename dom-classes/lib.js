import classes from 'dom-classes'
export * from 'dom-classes'
import {add
      , contains
      , has
      , toggle
      , remove
      , removeMatching} from 'dom-classes'
export function set(el, dom$class, value) {
  let op = value ? 'add' : 'remove'
  return classes[op](el, dom$class)
}
export const set__class = set
export const add__class = add
export const contains__class = contains
export const has__class = has
export const toggle__class = toggle
export const remove__class = remove
export const removeMatching__class = removeMatching
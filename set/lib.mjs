/**
 * @module ctx-core/set/lib
 */
/**
 * Returns a `set` with the _union of the members
 * @param [...array] members
 * @returns {Set} The _union of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _union(...members$$) {
  let members = []
  for (let i=0; i < members$$.length; i++) {
    const members$ = members$$[i]
    members.push(...members$)
  }
  return new Set(members)
}
export const $union = _union
export const _union__set = _union
export const $union__set = _union
/**
 * Returns a `set` with the _intersection of the members
 * @param [...*] member
 * @returns {Set} The _intersection of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _intersection(root_set, ...rest) {
  const set__rest = _union(...rest)
      , $filter = [...root_set]
  let members = []
  for (let i=0; i < $filter.length; i++) {
    const x = $filter[i]
    if (set__rest.has(x)) members.push(x)
  }
  return new Set(members)
}
export const $intersection = _intersection
export const _intersection__set = _intersection
export const $intersection__set = _intersection
/**
 * Returns a new set with a _difference of the array-like arguments.
 * @param [...array] array - An array-like to perform the _difference operation on.
 * @returns {Set} The _difference of the array-like arguments.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _difference(root_set, ...rest) {
  const set__rest = _union(...rest)
      , $filter = [...root_set]
  let members = []
  for (let i=0; i < $filter.length; i++) {
    const x = $filter[i]
    if (!set__rest.has(x)) members.push(x)
  }
  return new Set(members)
}
export const $difference = _difference
export const _difference__set = _difference
export const $difference__set = _difference
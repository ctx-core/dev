/**
 * @module ctx-core/set/lib
 */
/**
 * Returns a `set` with the union of the members
 * @param [...array] members
 * @returns {Set} The union of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function union(...members$$) {
  let members = []
  for (let i=0; i < members$$.length; i++) {
    const members$ = members$$[i]
    members.push(...members$)
  }
  return new Set(members)
}
export const union__set = union
/**
 * Returns a `set` with the intersection of the members
 * @param [...*] member
 * @returns {Set} The intersection of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function intersection(root_set, ...rest) {
  const set__rest = union(...rest)
      , $filter = [...root_set]
  let members = []
  for (let i=0; i < $filter.length; i++) {
    const x = $filter[i]
    if (set__rest.has(x)) members.push(x)
  }
  return new Set(members)
}
export const intersection__set = intersection
/**
 * Returns a new set with a difference of the array-like arguments.
 * @param [...array] array - An array-like to perform the difference operation on.
 * @returns {Set} The difference of the array-like arguments.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function difference(root_set, ...rest) {
  const set__rest = union(...rest)
      , $filter = [...root_set]
  let members = []
  for (let i=0; i < $filter.length; i++) {
    const x = $filter[i]
    if (!set__rest.has(x)) members.push(x)
  }
  return new Set(members)
}
export const difference__set = difference
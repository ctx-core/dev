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
  const members = members$$.reduce(
    (memo, members$) => {
      memo.push(...members$)
      return memo
    }, []
  )
  return new Set(members)
}
/**
 * Returns a `set` with the intersection of the members
 * @param [...*] member
 * @returns {Set} The union of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function intersection(root_set, ...rest$$) {
  const rest_set = union(...rest$$)
  return new Set(
    [...root_set].filter(
      x =>
        rest_set.has(x)))
}
/**
 * Returns a new set with a union of the array-like arguments.
 * @param [...array] array - An array-like to perform the union operation on.
 * @returns {Set} The union of the array-like arguments.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function difference(root_set, ...rest$$) {
  const rest_set = union(...rest$$)
  return new Set(
    [...root_set].filter(
      x =>
        !rest_set.has(x)))
}
/**
 * @module ctx-core/array/lib
 */
/**
 * ArrayLike object (ie arguments)
 * @property {integer} length
 * @typedef ArrayLike
 */
import {entries} from 'ctx-core/object/lib'
import {union__set,intersection__set,difference__set} from 'ctx-core/set/lib'
/**
 * clone `...ctx` & concat array values
 * @param {...module:ctx-core/object/lib~ctx.<string,array>}
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function clone__concat(...ctx$$) {
  return ctx$$.reduce(
    (memo, ctx) => {
      for (let [key, value] of entries(ctx)) {
        memo[key] = concat__array(
          memo[key] || [],
          value)
      }
      return memo
    }, {})
}
export const clone__concat__array = clone__concat
/**
 * `Array.from`
 * @param {...module:ctx-core/array/lib~ArrayLike}
 * @returns {Array}
 */
export function $array() {
  return Array.from(...arguments)
}
/**
 * Array#`concat`
 * @param {array}
 * @param {...module:ctx-core/array/lib~ArrayLike} rest
 * @returns {Array.<*>}
 */
export function concat(array, ...rest){
  return $array(array).concat(...rest)
}
export const concat__array = concat
/**
 * Remove `...key` from array
 * @param {array}
 * @param {...string} key -
 */
export function remove(array, ...key$$) {
  for (let i=0; i < key$$.length; i++) {
    const key = key$$[i]
    let index
    while((index = array.lastIndexOf(key)) > -1) {
      array.splice(index, 1)
    }
  }
}
export const remove__array = remove
export const uniq = union__array
export const uniq__array = uniq
/**
 * Returns the last item in the array
 * @param {array}
 * @returns {*} Last item in the array
 */
export function last(array) {
  return array && array[array.length-1]
}
export const last__array = last
/**
 * Flattens the array & it's children into an array without chunks
 * @param {array}
 * @returns {array.<*>}
 */
export function flatten(array) {
  return array.reduce(
    (a, b) =>
      concat(
        a,
        Array.isArray(b)
          ? flatten(b)
          : b),
    []
  )
}
/**
 * Splits array into chunks
 * @param {array}
 * @param {integer} chunk__length - Length of each chunk
 * @returns {Array.<Array>} The array of chunks
 */
export function chunks(array, chunk__length) {
  let $chunks = []
  for (let i = 0; i < array.length; i+=chunk__length) {
    $chunks.push(array.slice(i, i + chunk__length))
  }
  return $chunks
}
export const flatten__array = flatten
/**
 * Removes null values from the array
 * @param {array}
 * @returns {Array} The array with null values removed
 */
export function compact(array) {
  for (var i = array.length; i >= 0; --i) {
    if (array[i] == null) {
      array.splice(i, 1)
    }
  }
  return array
}
export const compact__array = compact
/**
 * Returns true if every `predicate(value)` is truthy
 * @param {array}
 * @param {Function} predicate - The every predicate function
 * @returns {boolean} true if every `predicate(value)` is truthy
 */
export function every(array, predicate) {
  let index = -1
  const length = array.length
  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false
    }
  }
  return true
}
export const every__array = every
/**
 * Returns true if some `predicate(value)` is truthy
 * @param {array}
 * @param {Function} predicate - The some predicate function
 * @returns {boolean} true if some `predicate(value)` is truthy
 */
export function some(array, predicate) {
  let index = -1
  const length = array.length
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true
    }
  }
  return false
}
export const some__array = some
/**
 * Returns the union of n arrays
 * @param {...array} array - Performs the union on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function union(...array$$) {
  return Array.from(
    union__set(
      ...array$$.map(array => Array.from(array))))
}
export const union__array = union
/**
 * Returns the intersection of n arrays
 * @param {...array} array - Performs the intersection on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function intersection(...array$$) {
  return Array.from(
    intersection__set(
      ...array$$.map(array => Array.from(array))))
}
export const intersection__array = intersection
/**
 * Returns the difference of n arrays
 * @param {...array} array - Performs the difference on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function difference(...array$$) {
  return Array.from(
    difference__set(
      ...array$$.map(array => Array.from(array))))
}
export const difference__array = difference
/**
 * splice out any `array` elements matching `selector`
 * @param {array}
 * @param {Function} selector - truthy elements are spliced out
 * @returns {array}
 */
export function splice__selector(array, selector) {
  const index = array.findIndex(selector)
  if (index > -1) {
    array.splice(index, 1)
  }
  return array
}
export const splice__selector__array = splice__selector
/**
 * Sort comparator function
 * @param {boolean} [asc=true] ascending or descending
 * @returns {function(*, *)} Function that compares two values
 */
export function sort$fn(asc=true) {
  return (a, b) => {
    if (a < b) return asc ? -1 : 1
    if (a > b) return asc ? 1 : -1
    return 0
  }
}
export const sort$fn__array = sort$fn
/**
 * sort on key values
 * @param {string} key - Return function compares on `Object[key]`
 * @param {boolean} [asc=true] ascending or descending
 * @returns {function(*, *)} Function that compares two `value[key]`
 */
export function new__key$sort(key, asc=true) {
  return (a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1
    if (a[key] > b[key]) return asc ? 1 : -1
    return 0
  }
}
export const new__key$sort__array = new__key$sort
/**
 * Returns the rank of the items where the compare function === 0
 * @param {array}
 * @param {Function} compare - rank compare function
 * @returns {integer} the rank of the items where the compare function === 0
 */
export function rank(array, compare) {
  let rank__i = 1
  for (let i=0; i < array.length; i++) {
    if (compare(array[i]) > 0) {
      rank__i++
    }
  }
  return rank__i
}
export const rank__array = rank
/**
 * Returns the rank of the item where the compare function === 0, using binarySort
 * @param {array}
 * @param {Function} compare - rank compare function
 * @returns {integer} the rank of the items where the compare function === 0
 */
export function rank__binarySort(array, compare) {
  let index$min = 0
    , index$max = array.length - 1
    , index__current
    , element__current
  while (index$min <= index$max) {
    index__current = (index$min + index$max) / 2 | 0
    element__current = array[index__current]
    const compare__sort = compare(element__current, index__current)
    if (compare__sort > 0) {
      index$min = index__current + 1
    } else if (compare__sort < 0) {
      index$max = index__current - 1
    } else {
      return index__current
    }
  }
  return -1
}
export const rank__binarySort__array = rank__binarySort
/**
 * Returns an array sorted by `item.name`
 * @param {array}
 * @returns {Array.<*>} array sorted by `item.name`
 */
export function name$sort(array) {
  return array.slice(0).sort(new__key$sort__array('name'))
}
export const name$sort__array = name$sort
/**
 * Returns an `Object.<key,value>` of the given `array` & `key`
 * @param {Array.<Object.<key,value>>}
 * @param {string} key
 * @returns {Object.<key,value>}
 */
export function array$obj(array, key) {
  return array.reduce(
    (memo, row$ctx) => {
      memo[row$ctx[key]] = row$ctx
      return memo
  }, {})
}
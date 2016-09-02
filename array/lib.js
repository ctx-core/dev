/**
 * @module ctx-core/array/lib
 */
import {entries} from 'ctx-core/object/lib'
import {union__set,intersection__set,difference__set} from 'ctx-core/set/lib'
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
export function $array() {
  return Array.from(...arguments)
}
export function concat(array, ...rest){
  return $array(array).concat(...rest)
}
export const concat__array = concat
export function remove(array, ...remove$item$$) {
  remove$item$$.forEach(
    remove$item => {
      let remove$index
      while((remove$index = array.lastIndexOf(remove$item)) > -1) {
        array.splice(remove$index, 1)
      }
    })
}
export const remove__array = remove
export const uniq = union__array
export const uniq__array = uniq
export function last(ar) {
  return ar && ar[ar.length-1]
}
export const last__array = last
export function flatten(list) {
  return list.reduce(
    (a, b) =>
      concat(
        a,
        Array.isArray(b)
          ? flatten(b)
          : b),
    []
  )
}
export const flatten__array = flatten
export function compact(actual) {
  let array = []
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      array.push(actual[i])
    }
  }
  return array
}
export const compact__array = compact
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
export function splice__selector(array, selector) {
  const index = array.findIndex(selector)
  if (index > -1) {
    array.splice(index, 1)
  }
}
export const splice__selector__array = splice__selector
// sort on values
export function sort$fn(asc=true) {
  return (a, b) => {
    if (a < b) return asc ? -1 : 1
    if (a > b) return asc ? 1 : -1
    return 0
  }
}
export const sort$fn__array = sort$fn
// sort on key values
export function new__key$sort(key,asc=true) {
  return (a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1
    if (a[key] > b[key]) return asc ? 1 : -1
    return 0
  }
}
export const new__key$sort__array = new__key$sort
export function index$sort(array, compare) {
  let rank = 1
  array.forEach(
    item => {
      if (compare(item) > 0) {
        rank++
      }
    })
  return rank
}
export const index$sort__array = index$sort
export function index$binarySort(array, compare__sort__fn) {
  let index$min = 0
    , index$max = array.length - 1
    , index__current
    , element__current
  while (index$min <= index$max) {
    index__current = (index$min + index$max) / 2 | 0
    element__current = array[index__current]
    const compare__sort = compare__sort__fn(element__current, index__current)
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
export const index$binarySort__array = index$binarySort
export function name$sort(array) {
  return array.slice(0).sort(new__key$sort__array('name'))
}
export const name$sort__array = name$sort
export function array$obj(array, key) {
  return array.reduce(
    (memo, row$ctx) => {
      memo[row$ctx[key]] = row$ctx
      return memo
  }, {})
}
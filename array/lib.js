/**
 * @module ctx-core/array/lib
 */
import {entries} from 'ctx-core/object/lib'
import {union,intersection,difference} from 'ctx-core/set/lib'
export function clone__array$concat(...ctx$$) {
  return ctx$$.reduce(
    (memo, ctx) => {
      for (let [key, value] of entries(ctx)) {
        memo[key] = array$concat(
          memo[key] || [],
          value)
      }
      return memo
    }, {})
}
export function array$from() {
  return Array.from(...arguments)
}
export function array$concat(array, ...rest){
  return array$from(array).concat(...rest)
}
export function array$remove(array, ...remove$item$$) {
  remove$item$$.forEach(
    remove$item => {
      let remove$index
      while((remove$index = array.lastIndexOf(remove$item)) > -1) {
        array.splice(remove$index, 1)
      }
    })
}
export const array$uniq = array$union
export function array$last(ar) {
  return ar && ar[ar.length-1]
}
export function array$flatten(list) {
  return list.reduce(
    (a, b) => array$concat(a, Array.isArray(b) ? array$flatten(b) : b), []
  )
}
export function array$compact(actual) {
  let array = []
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      array.push(actual[i])
    }
  }
  return array
}
export function array$every(array, predicate) {
  let index = -1
  const length = array.length
  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false
    }
  }
  return true
}
export function array$some(array, predicate) {
  let index = -1
  const length = array.length
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true
    }
  }
  return false
}
/**
 * Returns the union of n arrays
 * @param {...array} array - Performs the union on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function array$union(...array$$) {
  return Array.from(
    union(
      ...array$$.map(array => Array.from(array))))
}
/**
 * Returns the intersection of n arrays
 * @param {...array} array - Performs the intersection on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function array$intersection(...array$$) {
  return Array.from(
    intersection(
      ...array$$.map(array => Array.from(array))))
}
/**
 * Returns the difference of n arrays
 * @param {...array} array - Performs the difference on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function array$difference(...array$$) {
  return Array.from(
    difference(
      ...array$$.map(array => Array.from(array))))
}
export function array$splice__selector(array, selector) {
  const index = array.findIndex(selector)
  if (index > -1) {
    array.splice(index, 1)
  }
}
// sort on values
export function array$sort__fn(asc=true) {
  return (a, b) => {
    if (a < b) return asc ? -1 : 1
    if (a > b) return asc ? 1 : -1
    return 0
  }
}
// sort on key values
export function new__array$sort__key(key,asc=true) {
  return (a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1
    if (a[key] > b[key]) return asc ? 1 : -1
    return 0
  }
}
export function array$sort__indexOf(array, compare) {
  let rank = 1
  array.forEach(
    item => {
      if (compare(item) > 0) {
        rank++
      }
    })
  return rank
}
export function array$sort__binary$indexOf(array, sort$compare__fn) {
  let index$min = 0
    , index$max = array.length - 1
    , index$current
    , element$current
  while (index$min <= index$max) {
    index$current = (index$min + index$max) / 2 | 0
    element$current = array[index$current]
    const sort$compare = sort$compare__fn(element$current, index$current)
    if (sort$compare > 0) {
      index$min = index$current + 1
    } else if (sort$compare < 0) {
      index$max = index$current - 1
    } else {
      return index$current
    }
  }
  return -1
}
export function array$sort__name(array) {
  return array.slice(0).sort(new__array$sort__key('name'))
}
export function array$table(array, key) {
  return array.reduce(
    (memo, ctx_row) => {
      memo[ctx_row[key]] = ctx_row
      return memo
  }, {})
}
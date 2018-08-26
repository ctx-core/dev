/**
 * @module @ctx-core/array/lib.mjs
 */
/**
 * ArrayLike object (ie arguments)
 * @property {integer} length
 * @typedef ArrayLike
 */
import {
	_union__set,
	_intersection__set,
	_difference__set
} from '@ctx-core/set/lib.mjs'
/**
 * clone `...ctx` & concat array values
 * @param {...module:ctx-core/object/lib~ctx.<string,array>}
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function clone__concat(...__ctx) {
	let memo = {}
	for (let i = 0; i < __ctx.length; i++) {
		const ctx = __ctx[i]
		for (const key in ctx) {
			const value = ctx[key]
			memo[key] = concat(
				memo[key] || [],
				value
			)
		}
	}
	return memo
}
export const clone__concat__array = clone__concat
/**
 * `Array.from`
 * @param {...module:ctx-core/array/lib~ArrayLike}
 * @returns {Array}
 */
export function _array() {
	return Array.from(...arguments)
}
export const $array = _array
/**
 * Array#`concat`
 * @param {array}
 * @param {...module:ctx-core/array/lib~ArrayLike} rest
 * @returns {Array.<*>}
 */
export function concat(array, ...rest) {
	return _array(array).concat(...rest)
}
export const concat__array = concat
/**
 * Remove `...key` from array
 * @param {array}
 * @param {...string} key -
 */
export function remove(array, ...keys) {
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		let index
		while ((index = array.lastIndexOf(key)) > -1) {
			array.splice(index, 1)
		}
	}
}
export const remove__array = remove
/**
 * Returns the last item in the array
 * @param {array}
 * @returns {*} Last item in the array
 */
export function last(array) {
	return array && array[array.length - 1]
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
export function _chunks(array, chunk__length) {
	let chunks = []
	for (let i = 0; i < array.length; i += chunk__length) {
		chunks.push(array.slice(i, i + chunk__length))
	}
	return chunks
}
export const $chunks = _chunks
export const flatten__array = flatten
/**
 * Removes null values from the array
 * @param {array}
 * @returns {Array} The array with null values removed
 */
export function compact(array) {
	for (let i = array.length; i >= 0; --i) {
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
 * Returns the _union of n arrays
 * @param {...array} array - Performs the _union on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _union(...arrays) {
	return Array.from(
		_union__set(
			...arrays.map(array => Array.from(array))))
}
export const $union = _union
export const _union__array = _union
export const $union__array = _union__array
export const _uniq = _union
export const $uniq = _union
export const _uniq__array = _uniq
export const $uniq__array = _uniq
/**
 * Returns the _intersection of n arrays
 * @param {...array} array - Performs the _intersection on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _intersection(...arrays) {
	return Array.from(
		_intersection__set(
			...arrays.map(array => Array.from(array))))
}
export const $intersection = _intersection
export const _intersection__array = _intersection
export const $intersection__array = _intersection
/**
 * Returns the _difference of n arrays
 * @param {...array} array - Performs the _difference on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _difference(...arrays) {
	return Array.from(
		_difference__set(
			...arrays.map(array => Array.from(array))))
}
export const $difference = _difference
export const _difference__array = _difference
export const $difference__array = _difference
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
export function fn__sort(asc = true) {
	return (a, b) => {
		if (a < b) return asc ? -1 : 1
		if (a > b) return asc ? 1 : -1
		return 0
	}
}
export const fn__sort__array = fn__sort
/**
 * sort on key values
 * @param {string} key - Return function compares on `Object[key]`
 * @param {boolean} [asc=true] ascending or descending
 * @returns {function(*, *)} Function that compares two `value[key]`
 */
export function _sort__key(key, asc = true) {
	return (a, b) => {
		if (a[key] < b[key]) return asc ? -1 : 1
		if (a[key] > b[key]) return asc ? 1 : -1
		return 0
	}
}
export const $sort__key = _sort__key
export const _sort__key__array = _sort__key
export const $sort__key__array = _sort__key
/**
 * Returns the rank of the items where the compare function === 0
 * @param {array}
 * @param {Function} compare - rank compare function
 * @returns {integer} the rank of the items where the compare function === 0
 */
export function rank(array, compare) {
	let rank__i = 1
	for (let i = 0; i < array.length; i++) {
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
	let index$max = array.length - 1
	let index__current
	let element__current
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
export function sort__name(array) {
	return array.slice(0).sort(_sort__key__array('name'))
}
export const sort__name__array = sort__name
/**
 * Returns an `Object.<key,value>` of the given `array` & `key`
 * @param {Array.<Object.<key,value>>}
 * @param {string} key
 * @returns {Object.<key,value>}
 */
export function _by__key(array, key) {
	let obj = {}
	for (let i = 0; i < array.length; i++) {
		const item = array[i]
		obj[item[key]] = item
	}
	return obj
}
export const $by__key = _by__key
/**
 * Returns a random index in the given `array`
 * @param {Array.<Object.<key,value>>}
 * @returns {number}
 */
export function index__random(array) {
	return Math.floor(Math.random() * array.length)
}
/**
 * slice an array from an array's offset from position i
 * @param {Array} array
 * @param {Integer} i
 * @param {Integer} offset
 * @returns {Array}
 */
export function slice__i__offset(array, i, offset = 1) {
	return array.slice(i * offset, (i + 1) * offset)
}
/**
 * Returns i * offset
 * @param {Integer} i
 * @param {Integer} offset
 * @returns {Integer}
 */
export function i__offset(i, offset = 1) {
	return i * offset
}
export function prev__index(length, index = 0) {
	return index__circular(length, index - 1)
}
export function next__index(length, index = 0) {
	return index__circular(length, index + 1)
}
export function index__circular(length, index = 0) {
	return (length + (index % length)) % length
}
export function map__attribute(array, name__attribute) {
	const values = []
	for (let i = 0; i < array.length; i++) {
		values.push(array[i][name__attribute])
	}
	return values
}
export function map__inverse(array) {
	const values = []
	for (let i = 0; i < array.length; i++) {
		const value = array[i]
		values.push(
			value
			? (1.0 / value)
			: 0)
	}
	return values
}
export function _arrays__destructure__offset(ARR__source, offset = 1) {
	const arrays__destructure__offset = []
	for (let i = 0; i < offset; i++) {
		arrays__destructure__offset.push([])
	}
	for (let i = 0; i < ARR__source.length; i++) {
		const value = ARR__source[i]
		arrays__destructure__offset[i % offset].push(value)
	}
	return arrays__destructure__offset
}
export const $arrays__destructure__offset = _arrays__destructure__offset
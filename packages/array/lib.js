/**
 * @module @ctx-core/array/lib.js
 */
/**
 * ArrayLike object (ie arguments)
 * @property {integer} length
 * @typedef ArrayLike
 */
import { toString } from '@ctx-core/object/lib.js'
import {
	_andand,
	_andand_,
} from '@ctx-core/function/lib.js'
import {
	_union__set,
	_intersection__set,
	_difference__set
} from '@ctx-core/set/lib.js'
const isArray__native = Array.isArray
export function isArray(obj) {
	return isArray__native ? isArray__native(obj) : toString.call(obj) === '[object Array]'
}
export function _equal__array(a, b) {
	if (a === b) return true
	if (a == null || b == null) return false
	if (a.length != b.length) return false
	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false
	}
	return true
}
export function _equal__fn__array(a, b, fn) {
	if (a === b) return true
	if (a == null || b == null) return false
	if (a.length != b.length) return false
	for (let i = 0; i < a.length; ++i) {
		if (!fn(a[i], b[i], i)) return false
	}
	return true
}
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
export function _length__array(array) {
	return array && array.length
}
export function _present__array(array) {
	return !!_length__array(array)
}
/**
 * Array#`concat`
 * @param {array}
 * @param {...module:ctx-core/array/lib~ArrayLike} rest
 * @returns {Array.<*>}
 */
export function concat(array, ...rest) {
	return _array(array || []).concat(...rest)
}
export const concat__array = concat
export function concat__truthy(array, ...rest) {
	let ARR = _array(array || [])
	for (let i = 0; i < rest.length; i++) {
		ARR = ARR.concat(rest[i] || [])
	}
	return ARR
}
export function indexOf(array, key) {
	return array.indexOf(key)
}
export function insert(array, i, ...ARR__item) {
	return array.splice(i, 0, ...ARR__item)
}
export function remove__index(array, index) {
	return array.splice(index, 1)
}
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
			remove__index(array, index)
		}
	}
	return array
}
export const remove__array = remove
/**
 * Returns the last item in the array
 * @param {array}
 * @returns {*} Last item in the array
 */
export function _last(array) {
	return array && array[array.length - 1]
}
export const last = _last
export const _last__array = _last
export const last__array = _last
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
export function _every(predicate) {
	return array => every(array, predicate)
}
export const _fn__every = _every
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
export function _some(predicate) {
	return array => some(array, predicate)
}
export const _fn__some = _some
/**
 * Returns the _union of n arrays
 * @param {...array} array - Performs the _union on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _union(...arrays) {
	return Array.from(
		_union__set(
			...arrays.map(array => Array.from(array || []))))
}
export const _union__array = _union
export const _uniq = _union
export const _uniq__array = _uniq
/**
 * Returns the _intersection of n arrays
 * @param {...array} array - Performs the _intersection on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _intersection(...arrays) {
	return Array.from(
		_intersection__set(
			...arrays.map(array => Array.from(array || []))))
}
export const _intersection__array = _intersection
/**
 * Returns the _difference of n arrays
 * @param {...array} array - Performs the _difference on the arrays.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export function _difference(...arrays) {
	return Array.from(
		_difference__set(
			...arrays.map(array => Array.from(array || []))))
}
export const _difference__array = _difference
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
export function sort(array, fn__compare) {
	return array && array.sort(fn__compare)
}
export function _sort(fn__compare) {
	return array => sort(array, fn__compare)
}
export const _fn__sort = _sort
/**
 * Sort comparator function
 * @param {boolean} [asc=true] ascending or descending
 * @returns {function(*, *)} Function that compares two values
 */
export function _compare(asc = true) {
	return (a, b) => {
		if (a < b) return asc ? -1 : 1
		if (a > b) return asc ? 1 : -1
		return 0
	}
}
export const _fn__compare = _compare
export const compare__asc = _compare(true)
export const fn__compare__asc = compare__asc
export const compare__desc = _compare(false)
export const fn__compare__desc = compare__desc
export function _INT__compare(a, b) {
	return (
		a > b
		? 1
		: a < b
			? -1
			: 0
	)
}
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
export const _sort__key__array = _sort__key
export function _ARR__sort(array, fn) {
	return array.slice(0).sort(fn)
}
export function _ARR__IDX(count) {
	const ARR__IDX = []
	for (let i = 0; i < count; i++) {
		ARR__IDX.push(i)
	}
	return ARR__IDX
}
export function _ARR__IDX__invert(ARR__IDX) {
	if (!ARR__IDX) return ARR__IDX
	const ARR__IDX__invert = []
	for (let i = 0; i < ARR__IDX.length; i++) {
		ARR__IDX__invert[ARR__IDX[i]] = i
	}
	return ARR__IDX__invert
}
export function _ctx__IDX__sort(array, fn__compare = _compare()) {
	const ARR__sort = []
	const ARR__VAL__sort = []
	const ARR__IDX__sort = []
	if (array) {
		for (let i = 0; i < array.length; i++) {
			ARR__sort.push([array[i], i])
		}
		ARR__sort.sort((l, r) => fn__compare(l[0], r[0]))
		for (let i = 0; i < array.length; i++) {
			ARR__IDX__sort.push(ARR__sort[i][1])
			ARR__VAL__sort[i] = ARR__sort[i][0]
		}
	}
	return {
		ARR__VAL__sort,
		ARR__IDX__sort,
	}
}
export function _fn__ctx__IDX__sort(fn__compare) {
	return array => _ctx__IDX__sort(array, fn__compare)
}
export function _ARR__VAL__sort(ctx) {
	return ctx && ctx.ARR__VAL__sort
}
export function _ARR__IDX__sort(ctx) {
	return ctx && ctx.ARR__IDX__sort
}
export function _ARR__sort__IDX(ARR__VAL, ARR__IDX__sort) {
	if (!ARR__IDX__sort || !ARR__VAL) return
	const ARR__sort__IDX = []
	for (let i = 0; i < ARR__IDX__sort.length; i++) {
		const IDX = ARR__IDX__sort[i]
		ARR__sort__IDX.push(ARR__VAL[IDX])
	}
	return ARR__sort__IDX
}
export function _ctx__IDX__sort__ARR__sort__IDX(ARR__VAL, ARR__IDX__sort) {
	const ARR__VAL__sort = _ARR__sort__IDX(ARR__VAL, ARR__IDX__sort)
	return {
		ARR__VAL__sort,
		ARR__IDX__sort,
	}
}
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
	let index__min = 0
	let index__max = array.length - 1
	let index__current
	let element__current
	while (index__min <= index__max) {
		index__current = (index__min + index__max) / 2 | 0
		element__current = array[index__current]
		const compare__sort = compare(element__current, index__current)
		if (compare__sort > 0) {
			index__min = index__current + 1
		} else if (compare__sort < 0) {
			index__max = index__current - 1
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
export function _BY__key(array, key) {
	let obj = {}
	if (array) {
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			if (!item) continue
			obj[item[key]] = item
		}
	}
	return obj
}
export const _by__key = _BY__key
export function _fn__BY__key(key) {
	return array => _BY__key(array, key)
}
export function _IDX__BY__item(array, _item) {
	let IDX__BY__item = {}
	if (array) {
		for (let IDX = 0; IDX < array.length; IDX++) {
			const item = _item ? _item(array[IDX], IDX) : array[IDX]
			IDX__BY__item[item] = IDX
		}
	}
	return IDX__BY__item
}
export function _fn__IDX__BY__item(_item) {
	return array => _IDX__BY__item(array, _item)
}
export function _IDX__BY__key(array, key, _VAL) {
	let obj = {}
	if (array) {
		for (let IDX = 0; IDX < array.length; IDX++) {
			const item = array[IDX]
			const VAL = _VAL ? _VAL(item && item[key], item, key, IDX) : (item && item[key])
			if (!VAL) continue
			obj[VAL] = IDX
		}
	}
	return obj
}
export function _fn__IDX__BY__key(_VAL) {
	return (array, key) => _IDX__BY__key(aray, key, _VAL)
}
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
export function _slice(...args) {
	return ARR => ARR && ARR.slice(...args)
}
export const _fn__slice = _slice
/**
 * Returns i * offset
 * @param {Integer} i
 * @param {Integer} offset
 * @returns {Integer}
 */
export function _i__offset(i, offset = 1) {
	return i * offset
}
export const i__offset = _i__offset
export function prev__index(length, index = 0) {
	return index__circular(length, index - 1)
}
export function next__index(length, index = 0) {
	return index__circular(length, index + 1)
}
export function index__circular(length, index = 0) {
	return (length + (index % length)) % length
}
export function each(array, fn) {
	if (!array) return
	for (let i = 0; i < array.length; i++) {
		fn(array[i], i)
	}
	return array
}
export function map(array, fn) {
	if (!array) return
	const ARR__out = []
	for (let i = 0; i < array.length; i++) {
		ARR__out.push(fn(array[i], i))
	}
	return ARR__out
}
export function _map(fn) {
	return array => map(array, fn)
}
export const _fn__map = _map
export function zip(array, ...rest) {
	const args__zipWith = [array, ...rest]
	args__zipWith.push((...args) => args)
	return zipWith.apply(array, args__zipWith)
}
export function zipWith(array, ...rest) {
	if (!array) return
	const fn = last(rest) || (() => {})
	const ARR__ARR__rest = rest.slice(0, -1)
	const ARR = []
	for (let i = 0; i < array.length; i++) {
		const args = [array[i]]
		for (let j = 0; j < ARR__ARR__rest.length; j++) {
			args.push(ARR__ARR__rest[j][i])
		}
		ARR.push(fn.apply(ARR, args))
	}
	return ARR
}
export function _zipWith(fn__map) {
	return (...args) => zipWith(...(args.concat([fn__map])))
}
export const _fn__zipWith = _zipWith
export function _ARR__KVP(ARR1, ARR2) {
	return zip(ARR1, ARR2)
}
export function _ARR__sparse(ARR__IDX, ARR__VAL) {
	const ARR__sparse = []
	for (let i = 0; i < ARR__IDX.length; i++) {
		const IDX = ARR__IDX[i]
		ARR__sparse[IDX] = ARR__VAL[i]
	}
	return ARR__sparse
}
export function _ctx__compact__ARR__sparse(ARR__sparse) {
	const ARR__IDX = []
	const ARR__VAL = []
	for (let i = 0; i < ARR__sparse; i++) {
		const VAL = ARR__sparse[i]
		if (VAL != undefined) {
			ARR__IDX.push(i)
			ARR__VAL.push(VAL)
		}
	}
	return {
		ARR__IDX,
		ARR__VAL,
	}
}
export function _ctx__compact__ARR__THRESH__entry(ARR__VAL__, fn__eq) {
	const ARR__IDX = []
	const ARR__VAL = []
	if (ARR__VAL__) {
		for (let i = 0; i < ARR__VAL__.length; i++) {
			const VAL = ARR__VAL__[i]
			const VAL__prev = ARR__VAL__[i - 1]
			if (!i || (fn__eq ? !fn__eq(VAL, VAL__prev) : (VAL !== VAL__prev))) {
				ARR__IDX.push(i)
				ARR__VAL.push(VAL)
			}
		}
	}
	return {
		ARR__IDX,
		ARR__VAL,
	}
}
export function _fn__ctx__compact__ARR__THRESH__entry(fn__eq) {
	return ARR__VAL__ => _ctx__compact__ARR__THRESH__entry(ARR__VAL__, fn__eq)
}
export function _ctx__compact__ARR__THRESH__exit(ARR__VAL__, fn__eq) {
	const ARR__IDX = []
	const ARR__VAL = []
	if (ARR__VAL__) {
		const length__ARR__VAL__ = ARR__VAL__.length
		for (let i = 0; i < ARR__VAL__.length; i++) {
			const VAL = ARR__VAL__[i]
			const i__next = i + 1
			const VAL__next = ARR__VAL__[i__next]
			if (i__next === length__ARR__VAL__ || (fn__eq ? !fn__eq(VAL, VAL__next) : VAL !== VAL__next)) {
				ARR__IDX.push(i)
				ARR__VAL.push(VAL)
			}
		}
	}
	return {
		ARR__IDX,
		ARR__VAL,
	}
}
export function _fn__ctx__compact__ARR__THRESH__exit(fn__eq) {
	return ARR__VAL__ => _ctx__compact__ARR__THRESH__exit(ARR__VAL__, fn__eq)
}
export function _OBJ__KVP__zip(ARR1, ARR2) {
	const OBJ = {}
	const ARR__KVP = _ARR__KVP(ARR1, ARR2)
	each(ARR__KVP, ([key, value]) => OBJ[key] = value)
	return OBJ
}
export function filter(array, fn) {
	if (!array) return
	const ARR__out = []
	for (let i = 0; i < array.length; i++) {
		const value = array[i]
		if (fn(value, i)) {
			ARR__out.push(value)
		}
	}
	return ARR__out
}
export function _filter(fn) {
	return array => filter(array, fn)
}
export const _fn__filter = _filter
export function find(array, fn) {
	if (!array) return
	for (let i = 0; i < array.length; i++) {
		const value = array[i]
		if (fn(value, i)) return value
	}
}
export function _IDX(array, compare) {
	if (array) {
		for (let i = 0; i < array.length; i++) {
			const value = array[i]
			if (
				value === compare
				|| (typeof compare === 'function' && compare(value, i))
			) return i
		}
	}
	return -1
}
export function map__andand(array, ...attributes) {
	return map(array, _andand(...attributes))
}
export function map__andand_(array, ...attributes) {
	return map(array, _andand_(...attributes))
}
export const map__andand__fn = map__andand_
export function _map__andand(...attributes) {
	return array => map__andand(array, ...attributes)
}
export const _fn__map__andand = _map__andand
export function _map__andand_(...attributes) {
	return array => map__andand_(array, ...attributes)
}
export const _fn__map__andand__fn = _map__andand_
export function map__inverse(array) {
	return map(array, value => value ? (1.0 / value) : 0)
}
export function map__ARR__IDX__IN__ARR(ARR__IDX, ARR) {
	return map(ARR__IDX, IDX => ARR[IDX])
}
export const map__ARR__IDX__in__ARR = map__ARR__IDX__IN__ARR
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
export function _ARR__gte__0(ARR__VAL) {
	const ARR__gte__0 = []
	for (let i = 0; i < ARR__VAL.length; i++) {
		const VAL = ARR__VAL[i]
		if (VAL >= 0) {
			ARR__gte__0.push(VAL)
		}
	}
	return ARR__gte__0
}
export function _ARR__lte__0(ARR__VAL) {
	const ARR__lte__0 = []
	for (let i = 0; i < ARR__VAL.length; i++) {
		const VAL = ARR__VAL[i]
		if (VAL <= 0) {
			ARR__lte__0.push(VAL)
		}
	}
	return ARR__lte__0
}
export function _ARR__VAL__VIA__ARR__key(obj, ARR__key) {
	if (!obj) return
	return map(ARR__key, key => obj[key])
}

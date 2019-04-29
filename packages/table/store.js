import { writable, derived, get } from 'svelte/store'
import { derived__spread, _clear__ARR__store } from '@ctx-core/store'
import { _andand } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { _BY__key, _fn__BY__key } from '@ctx-core/array'
import { _proxy__row } from './lib'
import {
	_offsets__column,
	_rows,
	_rows__data
} from './lib'
import { _has__dom } from '@ctx-core/dom'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/table/store.js'
export const __table = writable([])
export const __columns = derived(__table, _andand(0))
export const __columns__data = derived(__columns, I)
export const __offsets__column = derived(__columns, _offsets__column)
export const __domain__table = writable([0, 10.0])
export const __domain__ticks = writable([0, 5.0, 10.0])
export const __rows = derived__spread([__table, __offsets__column], _rows)
export const __rows__data = derived__spread([
		__rows,
		__columns__data,
		__offsets__column
	],
	_rows__data
)
export const __reverse__columns =
	derived(__columns,
		columns =>
			columns && columns.slice(0).reverse())
export const __rank__table = derived__spread([
	__columns,
	__rows,
	__offsets__column,
], _rank__table)
function _rank__table(columns, rows, offsets__column) {
	log(`${logPrefix}|_rank__table`)
	if (!columns || !rows) return
	let rank__table = []
	rank__table.push(columns)
	for (let i = 0; i < rows.length; i++) {
		rank__table.push(rows.slice(0))
	}
	let rows__rank = rank__table.slice(1)
	for (let i = 0; i < columns.length; i++) {
		const rows__sorted =
			rows__rank.slice(0).sort(
				(a, b) =>
					a[i] > b[i]
					? -1
					: a[i] < b[i]
						? 1
						: 0)
		let rank = 0
		let current_value
		for (let j = 0; j < rows__sorted.length; j++) {
			const row = rows__sorted[j]
			const value = row[i]
			if (current_value !== value) {
				current_value = value
				rank++
				row[i] = rank
			}
		}
	}
	for (let i = 1; i < rank__table.length; i++) {
		rank__table[i] = _proxy__row({
			row__data: rank__table[i],
			offsets__column
		})
	}
	return rank__table
}
export const __row_id = writable()
export const __inputs__filter__rows__data = writable()
export const __filter__rows__data =
	derived([__inputs__filter__rows__data, __rows__data],
		([inputs__filter__rows__data, rows__data]) => {
			log(`${logPrefix}|_filter`)
			if (!inputs__filter__rows__data || !rows__data) return
			const filter__rows = []
			for (let i = 0; i < rows__data.length; i++) {
				const row = rows__data[i]
				let every
				for (let j = inputs__filter__rows__data.length; j--;) {
					const input__rows__data = inputs__filter__rows__data[j]
					const { column } = input__rows__data
					const value =
						row[column]
						|| 0
					if (input__rows__data.value > value) break
					if (!j) {
						every = true
					}
				}
				if (every) {
					filter__rows.push(row)
				}
			}
			return filter__rows
		})
export const __table__filter__rows__data =
	derived(__filter__rows__data, _fn__BY__key('row_id'))
if (_has__dom()) {
	__table.subscribe(_clear__ARR__store([
		__inputs__filter__rows__data
	]))
}
export const __highlight__rows__data = writable()
export const __table__highlight__rows__data = writable()
if (_has__dom()) {
	__row_id.subscribe(assign__highlight__rows)
	__table.subscribe(assign__highlight__rows)
	__filter__rows__data.subscribe(assign__highlight__rows)
}
function assign__highlight__rows() {
	log(`${logPrefix}|assign__highlight__rows`)
	const row_id = get(__row_id)
	const rows__data = get(__rows__data)
	const filter__rows__data = get(__filter__rows__data)
	const rows__data__ = filter__rows__data || rows__data
	let highlight__rows__data
	if (rows__data__) {
		highlight__rows__data = []
		for (let i = 0; i < rows__data__.length; i++) {
			const row = rows__data__[i]
			if (row.row_id === row_id) {
				highlight__rows__data.push(row)
			}
		}
	}
	const table__highlight__rows__data =
		highlight__rows__data
		&& _BY__key(highlight__rows__data, 'row_id')
	__highlight__rows__data.set(highlight__rows__data)
	__table__highlight__rows__data.set(table__highlight__rows__data)
}
export const __row = writable()
if (_has__dom()) {
	__row_id.subscribe(set__row)
	__table.subscribe(set__row)
	set__row()
}
export function set__row() {
	log(`${logPrefix}|agent__row|set__row`)
	const rows = get(__rows)
	const row_id = get(__row_id)
	if (!rows || !row_id) return
	let row
	for (let i = 0; i < rows.length; i++) {
		const row__ = rows[i]
		if (row__.row_id === row_id) {
			row = row__
			break
		}
	}
	__row.set(row)
}
import { get } from 'svelte/store'
import { subscribe__change__once } from '@ctx-core/store'
import { I } from '@ctx-core/combinators'
import { __columns__data, __domain__ticks, __domain__table, __table } from '@ctx-core/table/store'
import { _difference } from '@ctx-core/array'
import { fetch } from '@ctx-core/fetch'
import { __path__csv } from './store'
import Papa from 'papaparse'
import { log, info, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/csv/lib.js'
export function transform__table__csv(csv = '', opts = {}) {
	log(`${logPrefix}|transform__table__csv`)
	const _cell =
		opts._cell
		|| I
	const table__csv = Papa.parse(csv, opts).data
	const columns__csv = table__csv[0]
	const rows__csv = table__csv.slice(1)
	const rows = []
	for (let i = 0; i < rows__csv.length; i++) {
		const row__csv = rows__csv[i]
		let row = {}
		for (let j = 0; j < columns__csv.length; j++) {
			const column = columns__csv[j]
			const value = row__csv[j]
			const cell = _cell(value, column, j, value)
			row[column] = cell
		}
		rows.push(row)
	}
	return rows
}
export function load__data__csv(opts={}) {
	log(`${logPrefix}|load__data__csv`)
	const { exclude__columns } = opts
	const path__csv = opts.path__csv || get(__path__csv)
	let table = opts.table || get(__table)
	let domain__table = opts.domain__table || get(__domain__table)
	let domain__ticks = opts.domain__ticks || get(__domain__ticks)
	return new Promise(
		resolve => {
			log(`${logPrefix}|load__data__csv|Promise`)
			// TODO: move to a web worker
			setTimeout((async () => {
				info(`${logPrefix}|load__data__csv|Promise|setTimeout`)
				if (!table && path__csv) {
					log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv`, path__csv)
					const response = await fetch(path__csv)
					const text = await response.text()
					table = Papa.parse(text).data
					const columns = table[0]
					const rows = table.slice(1)
					const columns__data = _difference(columns, exclude__columns)
					cast__rows(rows, columns)
					push__row_id__i(rows, columns)
					__table.set(table)
					__domain__table.set(domain__table)
					__domain__ticks.set(domain__ticks)
					__columns__data.set(columns__data)
					// wait for agent change events to propagate
					subscribe__change__once(__table, resolve)
				}
			})(), 0)
		})
}
function cast__rows(rows, columns) {
	log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv|cast__rows`)
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i]
		for (let j = 0; j < columns.length; j++) {
			let value__f = parseFloat(row[j])
			if (!Number.isNaN(value__f)) {
				row[j] = value__f
			}
		}
	}
}
function push__row_id__i(rows, columns) {
	log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv|push__row_id$i`)
	columns.push('row_id', 'i')
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i]
		row.push(i + 1) // id based on index
		row.push(i) // index
	}
}
export function toLowerCase__column_name__CSV(CSV) {
	const a1__row__CSV = CSV.split('\n')
	const CSV__ =
		[a1__row__CSV[0].toLowerCase(),
			...a1__row__CSV.slice(1)
		].join('\n')
	return CSV__
}
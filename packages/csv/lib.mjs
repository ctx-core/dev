import { assign } from '@ctx-core/object/lib.mjs'
import { _difference } from '@ctx-core/array/lib.mjs'
import { agent__table } from '@ctx-core/table/agent.mjs'
import { fetch } from '@ctx-core/fetch/lib.mjs'
import { log, info, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/csv/lib.mjs'
export function transform__table__csv(csv = '', opts = {}) {
	log(`${logPrefix}|transform__table__csv`)
	const _cell =
		opts._cell
		|| (cell__csv => cell__csv)
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
export function load__data__csv(ctx) {
	log(`${logPrefix}|load__data__csv`)
	let ctx__ = assign(...arguments)
	const { path__csv } = ctx
	let {
		table,
		domain__table,
		domain__ticks
	} = ctx__
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
					const columns__data = _difference(columns, ctx.exclude__columns)
					cast__rows(rows, columns)
					push__row_id__i(rows, columns)
					agent__table(ctx).set({
						table,
						domain__table,
						domain__ticks,
						columns__data
					})
					// wait for agent change events to propagate
					agent__table(ctx).one('change', () => {
						log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv|change`, path__csv)
						resolve(table)
					})
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
	const ARR__row__CSV = CSV.split('\n')
	const CSV__ =
		[ARR__row__CSV[0].toLowerCase(),
			...ARR__row__CSV.slice(1)
		].join('\n')
	return CSV__
}
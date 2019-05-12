import { reduce } from '@ctx-core/array'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/table/lib.js'
export function _offsets__column(columns) {
	return reduce(columns, (memo, column, i) => {
		memo[column] = i
		return memo
	}, {})
}
export function _rows(table, offsets__column) {
	log(`${logPrefix}|_rows`)
	if (!table || !offsets__column) return
	const a1__row__data = table.slice(1)
	let rows__ = []
	for (let i = 0; i < a1__row__data.length; i++) {
		const row__data = a1__row__data[i]
		rows__.push(_proxy__row({ row__data, offsets__column }))
	}
	return rows__
}
export function _rows__data(rows, columns__data, offsets__column) {
	log(`${logPrefix}|_rows__data`)
	if (!rows) return
	let rows__data = []
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i]
		let row__data = []
		for (let j = 0; j < columns__data.length; j++) {
			const column = columns__data[j]
			console.debug([rows, columns__data, offsets__column])
			row__data.push(row[offsets__column[column]])
		}
		rows__data.push(
			_proxy__row({ row__data, offsets__column }))
	}
	return rows__data
}
export function _proxy__row({ rows, row__data, offsets__column }) {
	return new Proxy(row__data, {
		get
	})
	function get(target, name) {
		if (offsets__column[name] != null) {
			return row[offsets__column[name]]
		} else {
			return target[name]
		}
	}
}
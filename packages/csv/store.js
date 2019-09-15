import { get, writable } from 'svelte/store'
import {
	__columns__data,
	__domain__table,
	__domain__ticks,
	__table,
} from '@ctx-core/table/store'
import { _difference } from '@ctx-core/set'
import { fetch } from '@ctx-core/fetch'
import Papa from 'papaparse'
import { subscribe__change__once } from '@ctx-core/store'
import {
	cast__rows,
	push__row_id__i,
} from './lib'
import { info, log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/csv/store.js'
export const __path__csv = writable(null)
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

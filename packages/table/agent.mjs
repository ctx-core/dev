import { assign, clone } from '@ctx-core/object/lib.mjs'
import deepEqual from 'deep-equal'
import { _BY__key } from '@ctx-core/array/lib.mjs'
import { _proxy__row } from './lib.mjs'
import { ensure__agent } from '@ctx-core/agent/lib.mjs'
import {
	_offsets__column,
	_rows,
	_rows__data
} from './lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/table/agent.mjs'
export function agent__table(ctx, ...ARR__opts) {
	let agent = ctx.agent__table
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__table',
		scope:
			['table',
				'columns',
				'columns__data',
				'domain__table',
				'rows',
				'rank__table',
				'reverse__columns',
				'rows__data',
				'rows__sorted'],
		init,
		_ctx__set
	}, ...ARR__opts)
	function init() {
		log(`${logPrefix}|agent__table|init`)
		agent = this
	}
	function _ctx__set(ctx__set = {}) {
		log(`${logPrefix}|agent__table|_ctx__set`)
		const { table } = ctx__set
		let columns =
			ctx__set.columns
			|| (table && table[0])
		let columns__data =
			ctx__set.columns__data
			|| columns
		let offsets__column =
			ctx__set.offsets__column
			|| columns
			&& _offsets__column(columns)
		let domain__table =
			ctx__set.domain__table
			|| [0, 10.0]
		let domain__ticks =
			ctx__set.domain__ticks
			|| [0, 5.0, 10.0]
		let rows =
			ctx__set.rows
			|| table && _rows({
				rows: table.slice(1),
				offsets__column
			})
		let rows__data =
			ctx__set.rows__data
			|| _rows__data({ rows, columns__data, offsets__column })
		let reverse__columns =
			columns
			&& columns.slice(0).reverse()
		assign(ctx__set, {
			table,
			domain__table,
			domain__ticks,
			rank__table: _rank__table(),
			offsets__column,
			columns,
			columns__data,
			rows,
			rows__data,
			reverse__columns
		})
		return ctx__set
		function _rank__table() {
			log(`${logPrefix}|agent__table|_ctx__set|_rank__table`)
			if (!table) return
			let rank__table = []
			rank__table.push(table[0])
			for (let i = 1; i < table.length; i++) {
				rank__table.push(table[i].slice(0))
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
					row: rank__table[i],
					offsets__column
				})
			}
			return rank__table
		}
	}
}
export function agent__row_id(ctx, ...ARR__opts) {
	let agent = ctx.agent__row_id
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__row_id',
		scope: ['row_id']
	}, ...ARR__opts)
}
export function agent__filter__rows__data(ctx, ...ARR__opts) {
	let agent = ctx.agent__filter__rows__data
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__filter__rows__data',
		scope:
			['filter__rows__data',
				'inputs__filter__rows__data',
				'table__filter__rows__data'],
		init,
		_ctx__set
	}, ...ARR__opts)
	function init() {
		log(`${logPrefix}|agent__filter__rows__data|init`)
		agent = this
		agent__table(ctx).on('change',
			__change__agent__table)
	}
	function _ctx__set() {
		log(`${logPrefix}|agent__filter__rows__data|_ctx__set`)
		const ctx__set = clone(...arguments)
		const { rows } = ctx
		const inputs__filter__rows__data =
			ctx__set.inputs__filter__rows__data
			|| ctx.inputs__filter__rows__data
		const filter__rows__data =
			ctx__set.filter__rows__data
			|| (inputs__filter__rows__data
			&& inputs__filter__rows__data.filter(ctx.rows__data))
		if (!filter__rows__data) {
			return {
				filter__rows__data,
				inputs__filter__rows__data,
				table__filter__rows__data: null
			}
		}
		// Guard against duplicate work
		if (
			filter__rows__data.rows === rows
			&& deepEqual(
			filter__rows__data.inputs__filter__rows__data,
			inputs__filter__rows__data)
		) {
			return {}
		}
		log(`${logPrefix}|agent__filter__rows__data|_ctx__set|do`)
		// Guard against duplicate work
		assign(filter__rows__data, {
			rows,
			inputs__filter__rows__data
		})
		assign(ctx__set, {
			filter__rows__data,
			inputs__filter__rows__data,
			table__filter__rows__data:
				_BY__key(filter__rows__data, 'row_id')
		})
		return ctx__set
	}
	function __change__agent__table() {
		log(`${logPrefix}|agent__filter__rows__data|__change__agent__table`)
		agent.reset()
	}
}
export function agent__highlight__rows__data(ctx, ...ARR__opts) {
	let agent = ctx.agent__highlight__rows__data
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__highlight__rows__data',
		scope:
			['highlight__rows__data',
				'table__highlight__rows__data'],
		init
	}, ...ARR__opts)
	function init() {
		log(`${logPrefix}|agent__highlight__rows__data|init`)
		agent = this
		agent__row_id(ctx).on('change',
			__change__agent__row_id)
		agent__table(ctx).on('change',
			__change__agent__table)
		agent__filter__rows__data(ctx).on('change',
			__change__agent__filter__rows__data)
		assign__highlight__rows()
	}
	function __change__agent__row_id() {
		log(`${logPrefix}|agent__highlight__rows__data|__change__agent__row_id`)
		assign__highlight__rows()
	}
	function __change__agent__table() {
		log(`${logPrefix}|agent__highlight__rows__data|__change__agent__table`)
		assign__highlight__rows()
	}
	function __change__agent__filter__rows__data() {
		log(`${logPrefix}|agent__highlight__rows__data|__change__agent__filter__rows__data`)
		assign__highlight__rows()
	}
	function assign__highlight__rows() {
		log(`${logPrefix}|agent__highlight__rows__data|assign__highlight__rows`)
		const {
			row_id,
			rows__data,
			filter__rows__data
		} = ctx
		const rows__data__ =
			filter__rows__data
			|| rows__data
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
		agent.set({
			highlight__rows__data,
			table__highlight__rows__data
		})
	}
}
export function agent__row(ctx, ...ARR__opts) {
	let agent = ctx.agent__row
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__row',
		scope: ['row'],
		init
	}, ...ARR__opts)
	function init() {
		log(`${logPrefix}|agent__row|init`)
		agent = this
		agent__row_id(ctx).on('change',
			__change__agent__row_id)
		agent__table(ctx).on('change',
			__change__agent__table)
		set__row()
	}
	function __change__agent__row_id() {
		log(`${logPrefix}|agent__row|__change__agent__row_id`, ctx.row_id)
		set__row()
	}
	function __change__agent__table() {
		log(`${logPrefix}|agent__row|__change__agent__table`)
		set__row()
	}
	function set__row() {
		log(`${logPrefix}|agent__row|set__row`)
		const { rows, row_id } = ctx
		if (!rows || !row_id) return
		let row
		for (let i = 0; i < rows.length; i++) {
			const row__ = rows[i]
			if (row__.row_id === row_id) {
				row = row__
				break
			}
		}
		agent.set({ row })
	}
}
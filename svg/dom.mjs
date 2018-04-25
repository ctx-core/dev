import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/svg/dom.mjs'
export function _display__filter__paths(tag, filter__paths) {
	log(`${logPrefix}|_display__filter__paths`)
	const {ctx} = tag
			, { filter__rows__data
				, table__filter__rows__data
				, rows__data
				} = ctx
	if (tag.opts.filter && !filter__rows__data) return
	if (!filter__paths) return
	for (let i=0; i < rows__data.length; i++) {
		const row = rows__data[i]
		filter__paths[i]
			.setAttribute(
				'class',
				( !tag.opts.filter
					||	table__filter__rows__data[row.row_id])
				? ''
				: 'hide'
		)
	}
}
export function _display__highlight__paths(tag, highlight__paths) {
	log(`${logPrefix}|_display__highlight__paths`)
	const {ctx} = tag
				, { highlight__rows__data
					, table__highlight__rows__data
					, rows__data
					} = ctx
	if (!highlight__rows__data || !rows__data) return
	for (let i=0; i < rows__data.length; i++) {
		const row = rows__data[i]
		highlight__paths[i]
			.setAttribute(
				'class',
				table__highlight__rows__data[row.row_id]
				? ''
				: 'hide'
		)
	}
}

import { _mixin__store } from '@ctx-core/store/lib.js'
import { mixin } from '@ctx-core/object/lib.js'
export const __store__table = _mixin__store('__store__table', async store => {
	const scope = [
		'table',
		'columns',
		'columns__data',
		'domain__table',
		'rows',
		'rank__table',
		'reverse__columns',
		'rows__data',
		'rows__sorted']
	mixin(store, {})
})
import {_mixin__store} from 'ctx-core/store/lib.mjs'
import {store} from 'ctx-core/object/lib.mjs'
export const __store__table = _mixin__store('__store__table', store => {
	const scope =
					[ 'table',
						'columns',
						'columns__data',
						'domain__table',
						'rows',
						'rank__table',
						'reverse__columns',
						'rows__data',
						'rows__sorted']
	mixin(store, {

	})
})
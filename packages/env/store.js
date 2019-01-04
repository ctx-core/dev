import { _mixin__store, compute } from '@ctx-core/store/lib.js'
const logPrefix = '@ctx-core/env/store.js'
export const __store__env = _mixin__store('__store__env', async store => {
	compute(store, {
		is__production: [
			'NODE_ENV',
			NODE_ENV => NODE_ENV === 'production'
		],
		is__staging: [
			'NODE_ENV',
			NODE_ENV => NODE_ENV === 'staging'
		],
		is__development: [
			'NODE_ENV',
			NODE_ENV => NODE_ENV === 'development'
		],
	})
})
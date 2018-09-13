import { _mixin__store, compute } from '@ctx-core/store/lib.mjs'
const logPrefix = '@ctx-core/env/store.mjs'
export const __store__env = _mixin__store('__store__env', async store => {
	compute(store, {
		is__production: [
			'env__name',
			env__name => env__name === 'production'
		],
		is__staging: [
			'env__name',
			env__name => env__name === 'staging'
		],
		is__development: [
			'env__name',
			env__name => env__name === 'development'
		],
	})
})
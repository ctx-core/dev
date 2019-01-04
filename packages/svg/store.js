import { _mixin__store, compute } from '@ctx-core/store/lib.js'
import { mixin, _ctx__zip } from '@ctx-core/object/lib.js'
export const __store__matrix2d__svg = _mixin__store('__store__matrix2d__svg', async store => {
	const scope = [
		'margin__svg',
		'width__svg',
		'height__svg',
		'width__content__svg',
		'height__content__svg']
	mixin(store, {
		get margin__svg() {return this.get().margin__svg},
		get width__svg() {return this.get().width__svg},
		get height__svg() {return this.get().height__svg},
		get width__content__svg() {return this.get().width__content__svg},
		get height__content__svg() {return this.get().height__content__svg},
	})
	compute(store, {
		__matrix2d__svg: [
			scope,
			(...values) => _ctx__zip(scope, values)
		]
	})
})
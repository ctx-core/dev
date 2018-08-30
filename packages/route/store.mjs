import { _mixin__store, compute } from '@ctx-core/store/lib.mjs'
import { mixin, clone, _ctx__zip } from '@ctx-core/object/lib.mjs'
import { _router } from './lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/route/store.mjs'
export const __store__route = _mixin__store('__store__route', async store => {
	const scope = [
		'route',
		'query__route'
	]
	mixin(store, {
		set__route(__set) {
			this.set(
				clone(
					{
						route: '',
						query__route: {}
					},
					__set))
			return this
		},
	})
	compute(store, {
		__route: [
			scope,
			(...values) => _ctx__zip(scope, values)
		]
	})
})
export const __store__router = _mixin__store('__store__router', async store => {
	const scope = ['router']
	mixin(store, {
		reset__router() {
			this.set({ router: _router() })
			return this
		},
		add__route() {
			this.ensure__router().add(...arguments)
			return this
		},
		listen__router() {
			this.ensure__router().listen()
			return this
		},
		navigate() {
			this.ensure__router().navigate(...arguments)
			this.fire('navigate')
			return this
		},
		ensure__router() {
			if (!this.router) this.reset__router()
			return this.router
		},
		get router() {return this.get().router}
	})
	return store.reset__router()
})
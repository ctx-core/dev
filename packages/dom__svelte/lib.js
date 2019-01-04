import { assign } from '@ctx-core/object/lib.js'
import $ctx, {
	mount as mount__,
	assign__ctx
} from '@ctx-core/dom/api.js'
import { ensure__store } from '@ctx-core/store/lib.js'
import { log, error, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/dom/lib.js'
assign($ctx, {
	mount
})
export default $ctx
export function mount() {
	log(`${logPrefix}|mount`)
	const ctx__mount = mount__(...arguments)
	const { ctx, components: components__ } = ctx__mount
	const { store } = ensure__store(ctx)
	window.store = store
	for (let i = 0; i < components__.length; i++) {
		const component__ = components__[i]
		let opts__component = {}
		let name__component
		if (typeof component__ === 'string') {
			name__component = component__
		} else {
			name__component =
				component__[0]
				|| component__.name__component
			opts__component =
				component__[1]
				|| component__.opts__component
		}
		try {
			new components[name__component](
				assign({
					target: document.body,
					store,
					data: { ctx }
				}, opts__component))
		} catch (e) {
			error(`${logPrefix}|mount|error`, {
				e,
				name__component,
				opts__component
			})
			throw e
		}
	}
	return ctx
}
export { assign__ctx }
export const components = {}
export function assign__components() {
	assign(components, ...arguments)
}
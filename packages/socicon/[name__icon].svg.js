import { _get as _get__svg } from '@ctx-core/svg/[name__icon].svg'
import { join } from 'path'
const resolve = require('resolve')
export function _get(opts = {}) {
	const { fn } = opts
	return _get__svg({
		fn,
		resolve: name__icon =>
			resolve(join('@ctx-core/socicon/ui', `Socicon-${name__icon}.html`))
	})
}
export const get = _get()

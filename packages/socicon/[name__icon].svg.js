import { _get as _get__svg } from '@ctx-core/svg/[name__icon].svg'
export function _get(opts = {}) {
  const { fn } = opts
	return _get__svg({ fn, dir: '@ctx-core/socicon/ui' })
}
export const get = _get()

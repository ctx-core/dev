import env from 'ctx-core/version__app/env.mjs'
import { _version as _version__super } from 'ctx-core/version__app/lib.mjs'
export function _version() {
	return _version__super(env)
}
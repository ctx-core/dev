import { _version__package } from '@ctx-core/package'
export function _URL__SHIM__CORE_JS() {
  return `https://cdnjs.cloudflare.com/ajax/libs/core-js/${_version__core_js()}/shim.min.js`
}
export function _version__core_js() {
	return _version__package('core-js')
}

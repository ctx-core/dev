import env from 'ctx-core/env'
import {assign} from 'ctx-core/object/lib'
const {$version} = require('ctx-core/package/lib')
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/babel/lib'
log(logPrefix)
assign(env, {
  URL__SHIM__CORE_JS:
    `https://cdnjs.cloudflare.com/ajax/libs/core-js/${$version__core_js()}/shim.min.js`
})
export default env
export function $version__core_js() {
  return $version('core-js')
}
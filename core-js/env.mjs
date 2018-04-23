import env from 'ctx-core/env.mjs'
import {assign} from 'ctx-core/object/lib.mjs'
const {$version} = require('ctx-core/package/lib.js')
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/babel/lib.mjs'
log(logPrefix)
assign(env, {
  URL__SHIM__CORE_JS:
    `https://cdnjs.cloudflare.com/ajax/libs/core-js/${$version__core_js()}/shim.min.js`
})
export default env
export function $version__core_js() {
  return $version('core-js')
}
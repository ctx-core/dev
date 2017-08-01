import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/env'
const {$version} = require('ctx-core/package/lib')
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/babel/lib'
export function assign__url__shim__core_js() {
  log(`${logPrefix}|assign__url__shim__core_js`)
  assign(env, {
    URL__SHIM__CORE_JS:
      `https://cdnjs.cloudflare.com/ajax/libs/core-js/${$version__core_js()}/shim.min.js`
  })
}
export function $version__core_js() {
  log(`${logPrefix}|$version__core_js`)
  return $version('core-js')
}
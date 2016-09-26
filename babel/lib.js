import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/env'
import {version} from 'ctx-core/npm/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/babel/lib'
export function assign__url__babel__polyfill() {
  log(`${logPrefix}|assign__url__babel__polyfill`)
  assign(env, {
    BABEL__POLYFILL__URL:
      `https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/${version__babel_polyfill()}/polyfill.js`
  })
}
export function version__babel_polyfill() {
  log(`${logPrefix}|version__babel_polyfill`)
  return version({path: 'babel-polyfill'})
}
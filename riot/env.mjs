import  env
      , { assign__env
        , _env__process} from 'ctx-core/env.mjs'
import riot from 'riot'
const {$version} = require('ctx-core/package/lib.js')
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/riot/env.mjs'
log(logPrefix)
const RIOT_URL =
        env.RIOT_URL
        || _env__process('RIOT_URL')
        || $RIOT_URL()
global.riot = riot
assign__env({
  RIOT_URL
})
export default env
function $RIOT_URL() {
  const version = $version('riot')
  return `https://cdnjs.cloudflare.com/ajax/libs/riot/${version}/riot.min.js`
}
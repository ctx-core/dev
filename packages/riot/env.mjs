import env, { assign__env, _env__process } from '@ctx-core/env/env.mjs'
import riot from 'riot'
const { _version__package } = require('@ctx-core/package/lib.js')
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/riot/env.mjs'
log(logPrefix)
const RIOT_URL =
	env.RIOT_URL
	|| _env__process('RIOT_URL')
	|| _RIOT_URL()
global.riot = riot
assign__env({
	RIOT_URL
})
export default env
function _RIOT_URL() {
	return `https://cdnjs.cloudflare.com/ajax/libs/riot/${_version__package('riot')}/riot.min.js`
}
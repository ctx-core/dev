import env, { assign__env, _env__process } from '@ctx-core/env/env.js'
import riot from 'riot'
import { _version__package } from '@ctx-core/package/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/riot/env.js'
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
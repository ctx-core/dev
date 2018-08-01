import env, { assign__env, _env__process } from '@ctx-core/env/env.mjs'
import riot from 'riot'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/riot/env.mjs'
const { _version } = require('@ctx-core/package/lib.js')
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
	const version = _version('riot')
	return `https://cdnjs.cloudflare.com/ajax/libs/riot/${version}/riot.min.js`
}
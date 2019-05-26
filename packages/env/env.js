import { _has__dom } from '@ctx-core/dom'
if (_has__dom()) {
	throw 'env cannot be run in browser environments'
}
import { verify__version__node } from '@ctx-core/package'
verify__version__node()
import { throw__error } from '@ctx-core/error'
import dotenv from 'dotenv'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/env/env.js'
log(logPrefix)
if (!process.env.NODE_ENV) {
	dotenv.config()
	if (!process.env.NODE_ENV) {
		throw__missing__env('NODE_ENV')
	}
}
/**
 * Throws an error for for a missing env variable
 * @param name__env
 */
export function throw__missing__env(name__env) {
	const error_message = [
		`${name__env} environment variable not set.`,
		`development: make sure ${name__env} is set in your .env file`,
		`heroku: make sure ${name__env} is set using \`heroku config:set\``
	].join('\n')
	throw__error({ error_message, type: 'missing_env' })
}

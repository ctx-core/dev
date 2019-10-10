if (typeof window === 'object') {
	throw 'env cannot be run in browser environments'
}
import { verify__version__node } from '@ctx-core/package'
verify__version__node()
import { throw__error } from '@ctx-core/error'
/**
 * Throws an error for for a missing env variable
 * @param name__env
 */
export function throw__missing__env(name__env) {
	const error_message = `
${name__env} environment variable not set.
dev: make sure ${name__env} is set in your .env file
heroku: make sure ${name__env} is set using \`heroku config:set\`
	`.trim()
	throw__error({ error_message, type: 'missing_env' })
}

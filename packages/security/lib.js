import { pick } from '@ctx-core/object'
import { log, error, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/security/lib.js'
export function pick__whitelist(ctx, ...keys) {
	log(`${logPrefix}|pick__whitelist`)
	return pick(ctx, ...keys)
}
import { pick } from '@ctx-core/object/lib.js'
import { log, error, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/security/lib.js'
export function pick__whitelist(ctx, ...keys) {
	log(`${logPrefix}|pick__whitelist`)
	return pick(ctx, ...keys)
}
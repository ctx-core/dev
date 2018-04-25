import {pick} from 'ctx-core/object/lib.mjs'
import {log,error,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/security/lib.mjs'
export function pick__whitelist(ctx, ...keys) {
	log(`${logPrefix}|pick__whitelist`)
	return pick(ctx, ...keys)
}
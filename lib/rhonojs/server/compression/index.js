/// <reference types="./index.d.ts" />
import { compress } from 'hono/compress'
/**
 * @param {compression_middleware_config_T}[config]
 * @returns {import('hono').MiddlewareHandler}
 */
export function compression_middleware_(config) {
	return compress({
		encoding: config?.type ?? 'gzip',
	})
}

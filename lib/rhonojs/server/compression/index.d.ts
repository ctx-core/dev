import type { MiddlewareHandler } from 'hono'
export type compression_middleware_config_T = {
	type?:'gzip'|'deflate'
}
export declare const compression_middleware_:(config?:compression_middleware_config_T)=>MiddlewareHandler

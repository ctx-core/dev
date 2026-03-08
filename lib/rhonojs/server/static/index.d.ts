import type { Hono } from 'hono'
export declare function static_middleware_(
	config?:static_middleware__config_T
):Promise<Hono>
export type static_middleware__config_T = {
	headers_?:(url_path:string, content_type:string, path:string)=>Record<string, string>
}

import type { static_export_config_T, static_export_result_T } from '../index.js'
export declare function cloudflare_export_(
	config:cloudflare_export_config_T
):Promise<cloudflare_export_result_T>
export declare function worker_entry__generate_(
	dynamic_routes:route_handler_T[]
):string
export declare function wrangler_toml__generate_(
	overrides:Partial<wrangler_config_T>,
	out_dir?:string
):string
export type cloudflare_export_config_T =
	& static_export_config_T
	& {
		dynamic_routes?:route_handler_T[]
		worker_out?:string
		wrangler?:Partial<wrangler_config_T>
	}
export type cloudflare_export_result_T =
	& static_export_result_T
	& {
		worker_entry_path?:string
		wrangler_path:string
	}
export type route_handler_T = {
	pattern:string
	handler:string
}
export type wrangler_config_T = {
	name:string
	compatibility_date:string
	vars?:Record<string, string>
	routes?:{ pattern:string, zone_name?:string }[]
}

import type { Hono } from 'hono'
export declare function static_export_(
	config:static_export_config_T
):Promise<static_export_result_T>
export declare function static_export__file_path_(
	route:string,
	out_dir:string,
	content_type?:string
):string
export type static_export_config_T = {
	routes?:string[]
	site_url:string
	out_dir?:string
	base_url?:string
	server_import?:string
	app?:Hono
	sitemap?:boolean
	extra_routes?:string[]
	url_rewrite?:boolean
	incremental?:boolean
	manifest?:boolean
	clean?:boolean
	on_export?:(route:string, file:string)=>void
}
export type static_export_result_T = {
	exported:string[]
	errors:string[]
}

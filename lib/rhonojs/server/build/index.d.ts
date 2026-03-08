import type { ctx__be_T, ctx__get_T, ctx__set_T, sig_T } from 'ctx-core/rmemo'
import type { BuildContext, Plugin } from 'esbuild'
import type { rebuildjs_build_config_T } from 'rebuildjs/server'
export declare const rhonojs__build_id$_:ctx__be_T<sig_T<string>, 'app'>
export declare const rhonojs__build_id_:ctx__get_T<string, 'app'>
export declare const rhonojs__build_id__set:ctx__set_T<string, 'app'>
export declare const rhonojs__ready$_:ctx__be_T<sig_T<boolean>, 'app'>
export declare const rhonojs__ready_:ctx__get_T<boolean, 'app'>
export declare function rhonojs__ready__wait(timeout?:number):Promise<void>
export declare function rhonojs_browser__build(
	config?:rhonojs__build_config_T
):Promise<BuildContext>
export declare function rhonojs_server__build(
	config?:rhonojs__build_config_T
):Promise<BuildContext>
export declare function rhonojs_plugin_(config?:rhonojs_plugin_config_T):Plugin
export type rhonojs__build_config_T =
	& rebuildjs_build_config_T
	& { rhonojs?:rhonojs_plugin_config_T }
export type rhonojs_plugin_config_T = {
	server_entry?:string
	app__start?:boolean
}

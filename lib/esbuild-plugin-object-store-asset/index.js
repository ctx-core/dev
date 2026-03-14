/// <reference types="esbuild" />
import { readFile } from 'node:fs/promises'
import { ASSET_EXTENSIONS, object_store_asset_url_sync_ } from 'object-store-asset'
/**
 * @param {import('object-store-asset').object_store_asset_config_T & { extensions?: RegExp }}[config]
 * @returns {import('esbuild').Plugin}
 */
export function object_store_asset_esbuild_plugin_(config) {
	return {
		name: 'object-store-asset',
		setup(build) {
			if (!config?.asset_base_url) return
			const filter = config.extensions ?? ASSET_EXTENSIONS
			build.onLoad({ filter }, async ({ path })=>{
				const content = await readFile(path)
				const url = object_store_asset_url_sync_(path, content, config)
				return {
					contents: `export default ${JSON.stringify(url)}`,
					loader: 'js',
				}
			})
		},
	}
}
export default object_store_asset_esbuild_plugin_

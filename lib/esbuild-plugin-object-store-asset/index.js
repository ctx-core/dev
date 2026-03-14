/// <reference types="esbuild" />
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
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
			// CSS url() references: resolve to external CDN URL so esbuild
			// leaves them as-is (no loader conflict with `loader: 'js'`).
			build.onResolve({ filter }, async ({ path, resolveDir, kind })=>{
				if (kind !== 'url-token') return undefined
				const resolved_path = resolve(resolveDir, path)
				try {
					const content = await readFile(resolved_path)
					const url = object_store_asset_url_sync_(resolved_path, content, config)
					return { path: url, external: true }
				} catch (e) {
					if (e.code === 'ENOENT') return undefined
					throw e
				}
			})
			// JS/TS imports: return CDN URL as default export.
			build.onLoad({ filter }, async ({ path })=>{
				try {
					const content = await readFile(path)
					const url = object_store_asset_url_sync_(path, content, config)
					return {
						contents: `export default ${JSON.stringify(url)}`,
						loader: 'js',
					}
				} catch (e) {
					if (e.code === 'ENOENT') return undefined
					throw e
				}
			})
		},
	}
}
export default object_store_asset_esbuild_plugin_

/// <reference types="bun-types" />
/// <reference types="./index.d.ts" />
import { mkdir, readFile, rm, unlink, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { app_ctx, port_ } from 'rebuildjs/server'
import { app__start } from '../app/index.js'
/**
 * @param {static_export_config_T} config
 * @returns {Promise<static_export_result_T>}
 */
export async function static_export_(config) {
	const {
		site_url,
		out_dir = 'dist/browser',
		server_import = './dist/server/index.js',
		sitemap = true,
		url_rewrite = true,
		incremental = false,
		manifest: use_manifest = incremental,
		clean = false,
		on_export,
	} = config
	let { routes = [], extra_routes = [] } = config
	const site_origin = site_url.replace(/\/$/, '')
	const exported = []
	const errors = []
	let app = config.app
	let we_started = false
	let base_url = config.base_url
	let server
	try {
		if (base_url) {
			base_url = base_url.replace(/\/$/, '')
			console.info(`[static_export] using external server: ${base_url}`)
		} else if (!app) {
			const mod = await import(server_import)
			app = typeof mod.default === 'function' ? await mod.default() : mod.default
			await app__start(app)
			we_started = true
			base_url = `http://localhost:${port_(app_ctx)}`
			console.info(`[static_export] server running on ${base_url}`)
		} else {
			base_url = `http://localhost:${port_(app_ctx)}`
			console.info(`[static_export] using provided app on ${base_url}`)
		}
		console.info(`[static_export] site_url: ${site_origin}`)
		if (clean) {
			await rm(out_dir, { recursive: true, force: true })
		}
		if (sitemap) {
			try {
				const res = await fetch(`${base_url}/sitemap.xml`)
				if (res.ok) {
					const xml = await res.text()
					for (const m of xml.matchAll(/<loc>https?:\/\/[^<]+<\/loc>/g)) {
						const url = m[0].replace(/<\/?loc>/g, '')
						const path = new URL(url).pathname
						const route = path === '' ? '/' : path
						if (!routes.includes(route)) {
							routes.push(route)
						}
					}
					console.info(`[static_export] discovered ${routes.length} routes from sitemap`)
				}
			} catch {
				console.warn('[static_export] sitemap fetch failed, using explicit routes only')
			}
		}
		const manifest_path = join(out_dir, '.export-manifest.json')
		let prev_manifest = []
		if (use_manifest) {
			try {
				prev_manifest = JSON.parse(await readFile(manifest_path, 'utf-8'))
			} catch {
				// No previous manifest
			}
		}
		const all_routes = [...routes, ...extra_routes]
		for (const route of all_routes) {
			const url = base_url + route
			try {
				const res = await fetch(url)
				if (!res.ok) {
					console.error(`[static_export] ${route} -> ${res.status} ${res.statusText}`)
					errors.push(route)
					continue
				}
				const content_type = res.headers.get('content-type') ?? ''
				let body = await res.text()
				if (url_rewrite) {
					body = body.replaceAll(base_url, site_origin)
				}
				const file_path = static_export__file_path_(route, out_dir, content_type)
				if (incremental) {
					try {
						const existing = await readFile(file_path, 'utf-8')
						if (existing === body) {
							exported.push(file_path)
							continue
						}
					} catch {
						// File doesn't exist yet
					}
				}
				await mkdir(dirname(file_path), { recursive: true })
				await writeFile(file_path, body)
				exported.push(file_path)
				on_export?.(route, file_path)
				console.info(`[static_export] ${route} -> ${file_path} (${body.length} bytes)`)
			} catch (err) {
				console.error(`[static_export] ${route} -> ${err.message}`)
				errors.push(route)
			}
		}
		if (use_manifest) {
			await mkdir(dirname(manifest_path), { recursive: true })
			await writeFile(manifest_path, JSON.stringify(exported, null, '\t'))
			const stale = prev_manifest.filter(f=>!exported.includes(f))
			for (const file of stale) {
				try {
					await unlink(file)
					console.info(`[static_export] deleted stale: ${file}`)
				} catch {
					// Already gone
				}
			}
		}
		if (errors.length > 0) {
			console.warn(`[static_export] completed with ${errors.length} error(s)`)
		} else {
			console.info(`[static_export] exported ${exported.length} files`)
		}
	} finally {
		// Bun.serve cleanup is handled by process exit
	}
	return { exported, errors }
}
/**
 * @param {string} route
 * @param {string} out_dir
 * @param {string} [content_type]
 * @returns {string}
 */
export function static_export__file_path_(route, out_dir, content_type) {
	const ext = extname(route)
	const is_html = content_type ? content_type.includes('text/html') : !ext || ext === '.html'
	if (ext && !is_html) {
		return join(out_dir, route)
	}
	if (route === '/') {
		return join(out_dir, 'index.html')
	}
	return join(out_dir, route, 'index.html')
}

/// <reference types="bun-types" />
/// <reference types="./index.d.ts" />
import { build } from 'esbuild'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { static_export_ } from '../index.js'
/**
 * @param {cloudflare_export_config_T} config
 * @returns {Promise<cloudflare_export_result_T>}
 */
export async function cloudflare_export_(config) {
	const {
		dynamic_routes = [],
		worker_out = 'dist/worker',
		wrangler = {},
		...static_config
	} = config
	const static_result = await static_export_(static_config)
	let worker_entry_path
	if (dynamic_routes.length > 0) {
		const entry_source = worker_entry__generate_(dynamic_routes)
		const generated_path = join(worker_out, '_worker.src.js')
		await mkdir(worker_out, { recursive: true })
		await writeFile(generated_path, entry_source)
		worker_entry_path = join(worker_out, '_worker.js')
		await build({
			entryPoints: [generated_path],
			bundle: true,
			format: 'esm',
			target: 'es2022',
			platform: 'browser',
			outfile: worker_entry_path,
			minify: true,
		})
		console.info(`[cloudflare_export] worker bundled: ${worker_entry_path}`)
	}
	const wrangler_config = wrangler_toml__generate_(wrangler, static_config.out_dir)
	const wrangler_path = 'wrangler.toml'
	await writeFile(wrangler_path, wrangler_config)
	console.info(`[cloudflare_export] wrote ${wrangler_path}`)
	return {
		...static_result,
		worker_entry_path,
		wrangler_path,
	}
}
/**
 * @param {route_handler_T[]} dynamic_routes
 * @returns {string}
 */
export function worker_entry__generate_(dynamic_routes) {
	const imports = []
	const route_checks = []
	for (let i = 0; i < dynamic_routes.length; i++) {
		const { pattern, handler } = dynamic_routes[i]
		const handler_name = `handler_${i}`
		imports.push(`import ${handler_name} from '${resolve(handler)}'`)
		if (pattern.endsWith('/*')) {
			const prefix = pattern.slice(0, -2)
			route_checks.push(
				`\tif (url.pathname.startsWith('${prefix}')) return ${handler_name}(request, env, ctx)`)
		} else {
			route_checks.push(
				`\tif (url.pathname === '${pattern}') return ${handler_name}(request, env, ctx)`)
		}
	}
	return `${imports.join('\n')}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url)
${route_checks.join('\n')}
		return env.ASSETS.fetch(request)
	}
}
`
}
/**
 * @param {Partial<wrangler_config_T>} overrides
 * @param {string} [out_dir]
 * @returns {string}
 */
export function wrangler_toml__generate_(overrides, out_dir = 'dist/browser') {
	const name = overrides.name || 'app'
	const compatibility_date = overrides.compatibility_date || new Date().toISOString().slice(0, 10)
	let toml = `name = "${name}"
compatibility_date = "${compatibility_date}"
pages_build_output_dir = "${out_dir}"
`
	if (overrides.vars) {
		toml += '\n[vars]\n'
		for (const [key, val] of Object.entries(overrides.vars)) {
			toml += `${key} = "${val}"\n`
		}
	}
	if (overrides.routes) {
		for (const route of overrides.routes) {
			toml += `\n[[routes]]\npattern = "${route.pattern}"\n`
			if (route.zone_name) toml += `zone_name = "${route.zone_name}"\n`
		}
	}
	return toml
}

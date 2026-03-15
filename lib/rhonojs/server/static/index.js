/// <reference types="bun-types" />
/// <reference types="./index.d.ts" />
import { Hono } from 'hono'
import { static_middleware__routes_ } from 'rebuildjs/server'
/**
 * @param {static_middleware__config_T}[config]
 * @returns {Promise<Hono>}
 */
export async function static_middleware_(config) {
	const app = new Hono()
	const routes = await static_middleware__routes_(config)
	for (const { url_path, handler } of routes) {
		app.get(url_path, c=>handler())
	}
	return app
}

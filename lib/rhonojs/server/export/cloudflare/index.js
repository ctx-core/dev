/// <reference types="bun-types" />
/// <reference types="./index.d.ts" />
import {
	cloudflare_export_ as _cloudflare_export_,
	worker_entry__generate_,
	wrangler_toml__generate_,
} from 'rebuildjs/server/export/cloudflare'
import { static_export_ as _static_export_ } from 'rebuildjs/server/export'
import { app__start } from '../../app/index.js'
export { worker_entry__generate_, wrangler_toml__generate_ }
/**
 * @param {cloudflare_export_config_T} config
 * @returns {Promise<cloudflare_export_result_T>}
 */
export function cloudflare_export_(config) {
	return _cloudflare_export_(config, _static_export_, app__start)
}

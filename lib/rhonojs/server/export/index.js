/// <reference types="bun-types" />
/// <reference types="./index.d.ts" />
import {
	static_export_ as _static_export_,
	static_export__file_path_,
} from 'rebuildjs/server/export'
import { app__start } from '../app/index.js'
export { static_export__file_path_ }
/**
 * @param {static_export_config_T} config
 * @returns {Promise<static_export_result_T>}
 */
export function static_export_(config) {
	return _static_export_(config, app__start)
}

import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { basename, extname } from 'node:path'
export const ASSET_EXTENSIONS = /\.(aac|apng|avif|eot|flac|gif|ico|jfif|jpeg|jpg|mov|mp3|mp4|ogg|opus|otf|pdf|pjp|pjpeg|png|svg|ttf|wav|webm|webmanifest|webp|woff|woff2)$/
/**
 * @param {string}file_path
 * @param {object_store_asset_config_T}config
 * @returns {Promise<string>}
 */
export async function object_store_asset_url_(file_path, config) {
	const content = await readFile(file_path)
	return object_store_asset_url_sync_(file_path, content, config)
}
/**
 * @param {string}file_path
 * @param {Buffer}content
 * @param {object_store_asset_config_T}config
 * @returns {string}
 */
export function object_store_asset_url_sync_(file_path, content, config) {
	const { asset_base_url, base_path = '', hash_length = 8 } = config
	const hash = createHash('sha256').update(content).digest('hex').slice(0, hash_length).toUpperCase()
	const ext = extname(file_path)
	const name = basename(file_path, ext)
	const prefix = base_path ? `${base_path}/` : ''
	return `${asset_base_url.replace(/\/$/, '')}/${prefix}${name}-${hash}${ext}`
}
/**
 * @param {string}file_path
 * @param {RegExp}[extensions]
 * @returns {boolean}
 */
export function is_asset_(file_path, extensions = ASSET_EXTENSIONS) {
	return extensions.test(file_path)
}
/**
 * @typedef {object} object_store_asset_config_T
 * @property {string} asset_base_url
 * @property {string} [base_path]
 * @property {number} [hash_length]
 */

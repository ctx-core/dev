import resolve__plugin from 'rollup-plugin-node-resolve'
import commonjs__plugin from 'rollup-plugin-commonjs'
import sourcemaps__plugin from 'rollup-plugin-sourcemaps'
import alias__plugin from 'rollup-plugin-alias'
import json__plugin from 'rollup-plugin-json'
import buble__plugin from 'rollup-plugin-buble'
import globals__plugin from 'rollup-plugin-node-globals'
import builtins__plugin from 'rollup-plugin-node-builtins'
import nodent__plugin from '@ctx-core/nodent/rollup.js'
import path from 'path'
import deepExtend from 'deep-extend'
import { _builtinLibs } from 'repl'
import child_process from 'child_process'
const { execSync } = child_process
export const relativePath = /^\.?\.\//
export function _config__rollup__browser() {
	const ctx =
		deepExtend({
				output: {
					format: 'iife',
					intro:
						`var global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this`,
					globals: {
						global: 'window',
						riot: 'riot'
					}
				},
				external: [
					'crypto',
					'fs',
					'path',
					'process',
					'riot'
				]
			},
			...arguments)
	if (!ctx.plugins) ctx.plugins = _plugins__rollup__browser()
	return _config__rollup(ctx)
}
export function _plugins__rollup__browser(processor__plugin, ...ARR__rest) {
	return [
		alias__plugin({
			'chalk': './chalk.browser.js',
		}),
		globals__plugin(),
		builtins__plugin(),
		sourcemaps__plugin(),
		commonjs__plugin({
			include: [
				/(.*\/)?node_modules\/.*/,
				/.*\.js$/,
			],
			extensions: ['.js', '.coffee']
		}),
		json__plugin(),
		resolve__plugin({
			jsnext: true,
			main: true,
			browser: true
		}),
		..._processor__plugin(processor__plugin),
		nodent__plugin(),
		buble__plugin(),
		...ARR__rest
	]
}
export function _external__node__rollup(opts = {}) {
	const exclude__opts = opts.exclude || []
	const exclude__concat__exclude__opts = [
		'@ctx-core',
		'svelte',
	].concat(exclude__opts)
	const externals =
		_externals__node_modules({
			exclude: exclude__concat__exclude__opts
		})
	const extensions = [
		'.js',
		'.json',
		'.tag'
	]
	const external__npm__node__rollup = _external({
		externals,
		extensions
	})
	return external__npm__node__rollup
}
export function _config__rollup__node() {
	const external = _external__node__rollup()
	const opts = deepExtend({
			output: {
				format: 'cjs'
			},
			external
		},
		...arguments)
	if (!opts.plugins) opts.plugins = _plugins__rollup__node()
	return _config__rollup(opts)
}
export function _plugins__rollup__node(processor__plugin, ...rest) {
	return [
		alias__plugin({
			'svelte/store': 'svelte/store.umd.js',
		}),
		sourcemaps__plugin(),
		json__plugin(),
		..._processor__plugin(processor__plugin),
		buble__plugin(),
		nodent__plugin(),
		...rest
	]
}
export function _external(options) {
	const resolveId = _resolveId(options)
	return external__npm
	function external__npm(id) {
		const resolveId__ = resolveId(id)
		const external__npm__ =
			relativePath.test(id)
			? false
			: !resolveId__
		return external__npm__
	}
}
function _resolveId(options) {
	const externals = options.externals || []
	const GRF__path__external = _GRF__path([...externals, ..._builtinLibs])
	return resolveId
	function resolveId(id, origin) {
		let path__resolve = id
		const ARR__split__id = id.split('/')
		if (path__resolve.slice(0, 1) === '.') {
			const dirname = origin && path.dirname(origin)
			if (dirname) {
				path__resolve = path.join(dirname, id)
			}
			else {
				return null
			}
		}
		if (_match__GRF__path(GRF__path__external, ARR__split__id)) {
			return null
		}
		return path__resolve
	}
}
/**
 * @returns {Object}
 */
function _config__rollup() {
	const config__rollup =
		deepExtend({
				watch: {
					chokidar: { usePolling: true }
				}
			},
			...arguments)
	return config__rollup
}
function _processor__plugin(processor__plugin) {
	if (processor__plugin) {
		const processor__plugin__ = processor__plugin()
		if (processor__plugin__) {
			if (processor__plugin__ === 'array') {
				return processor__plugin__
			}
			return [processor__plugin__]
		}
	}
	return []
}
export function _externals__node_modules(opts = {}) {
	const out = execSync(
		`yarn list --depth=0 | awk '{print $2}' | grep @ | awk -F'@' '{$NF=""; print $0}' | sed 's/^ /@/' | awk '{$1=$1;print}'`
	).toString()
	const ARR__name__package = out.split('\n')
	const externals = []
	const ARR__exclude = opts.exclude || []
	const GRF__path__exclude = _GRF__path(ARR__exclude)
	for (let i = 0; i < ARR__name__package.length; i++) {
		const file = ARR__name__package[i].replace('./node_modules/', '')
		const ARR__split__file = file.split('/')
		if (!_match__GRF__path(GRF__path__exclude, ARR__split__file)) {
			externals.push(file)
		}
	}
	return externals
}
function _GRF__path(ARR__path) {
	const GRF__path = {}
	for (let i = 0; i < ARR__path.length; i++) {
		const path = ARR__path[i]
		const ARR__split__path = path.split('/')
		let node__GRF__path = GRF__path
		for (let j = 0; j < ARR__split__path.length; j++) {
			const split__external = ARR__split__path[j]
			if (!node__GRF__path[split__external]) {
				node__GRF__path[split__external] = {}
			}
			node__GRF__path = node__GRF__path[split__external]
		}
		node__GRF__path[''] = true
	}
	return GRF__path
}
function _match__GRF__path(GRF__path, ARR__split) {
	let NODE__path = GRF__path
	for (let i = 0; i < ARR__split.length; i++) {
		const split = ARR__split[i]
		NODE__path = NODE__path[split]
		if (!NODE__path) return false
		if (NODE__path[''] === true) return true
	}
	return true
}

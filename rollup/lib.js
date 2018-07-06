const node_resolve__plugin = require('rollup-plugin-node-resolve')
const commonjs__plugin = require('rollup-plugin-commonjs')
const sourcemaps__plugin = require('rollup-plugin-sourcemaps')
const alias__plugin = require('rollup-plugin-alias')
const json__plugin = require('rollup-plugin-json')
const buble__plugin = require('rollup-plugin-buble')
const nodent__plugin = require('ctx-core/nodent/rollup.js')
const $path = require('path')
const deepExtend = require('deep-extend')
const resolve = require('resolve')
const relativePath = /^\.?\.\//
const { _builtinLibs } = require('repl')
const { ls } = require('shelljs')
module.exports = {
	_browser__rollup,
	_node__rollup,
	_plugins__browser,
	_plugins__node,
	_external__npm,
	_externals__node_modules,
	resolve__rollup
}
function _browser__rollup() {
	const ctx =
		deepExtend(
			{
				output:
					{
						format: 'iife',
						intro:
							`var global = typeof window !== 'undefined' ? window :
											typeof global !== 'undefined' ? global :
											this`,
						globals:
							{
								global: 'window',
								riot: 'riot'
							}
					},
				external:
					['crypto',
						'fs',
						'path',
						'process',
						'riot']
			},
			...arguments)
	if (!ctx.plugins) ctx.plugins = _plugins__browser()
	return _rollup(ctx)
}
function _plugins__browser(processor__plugin, ...array__rest) {
	return [
		alias__plugin({
			'ctx-core/logger/chalk':
				'ctx-core/logger/chalk.browser.mjs',
			'ctx-core/logger/chalk.mjs':
				'ctx-core/logger/chalk.browser.mjs'
		}),
		sourcemaps__plugin(),
		commonjs__plugin({
			include: 'node_modules/**',
			extensions: ['.js', '.coffee']
		}),
		json__plugin(),
		resolve__rollup({
			paths: ['.', 'ctx-core', 'node_modules'],
			extensions: ['.mjs', '.js', '.json', '.tag']
		}),
		node_resolve__plugin({
			jsnext: true,
			main: true,
			browser: true
		}),
		..._processor__plugin(processor__plugin),
		nodent__plugin(),
		buble__plugin(),
		...array__rest
	]
}
function _node__rollup() {
	const __ =
		deepExtend(
			{
				output:
					{ format: 'cjs' },
				external:
					_external__npm(
						{
							paths:
								['.', 'ctx-core', 'node_modules'],
							externals:
								_externals__node_modules({ exclude: ['__', 'ctx-core', 'svelte', 'svelte-extras', 'svelte-awesome'] }),
							extensions:
								['.mjs', '.js', '.json', '.tag']
						})
			},
			...arguments)
	if (!__.plugins) __.plugins = _plugins__node()
	return _rollup(__)
}
function _plugins__node(processor__plugin, ...rest) {
	return [
		alias__plugin({
			'svelte/store.js':
				'svelte/store.umd.js'
		}),
		sourcemaps__plugin(),
		json__plugin(),
		resolve__rollup({
			paths:
				['.', 'ctx-core', 'node_modules'],
			externals:
				_externals__node_modules({ exclude: ['__', 'ctx-core', 'svelte', 'svelte-extras', 'svelte-awesome'] }),
			extensions:
				['.mjs', '.js', '.json', '.tag']
		}),
		..._processor__plugin(processor__plugin),
		buble__plugin(),
		nodent__plugin(),
		...rest
	]
}
function _external__npm(options) {
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
function resolve__rollup(options) {
	return {
		name: 'resolve__rollup',
		resolveId: _resolveId(options)
	}
}
function _resolveId(options) {
	const externals = options.externals || []
	return resolveId
	function resolveId(id, origin) {
		let path = id
		const path__split = path.split('/')
		const path0 = path__split[0]
		if (externals.indexOf(path0) !== -1) {
			return null
		}
		if (_builtinLibs.indexOf(path0) !== -1) {
			return null
		}
		if (path.slice(0, 1) === '.') {
			const dirname =
				origin
				&& $path.dirname(origin)
			if (dirname) {
				path = $path.join(dirname, id)
			}
			else {
				return null
			}
		}
		return resolve.sync(
			path,
			{
				basedir: process.cwd(),
				paths: [process.cwd()],
				extensions: ['.mjs', '.js']
			})
	}
}
/**
 * @returns {Object}
 */
function _rollup() {
	const rollup =
		deepExtend(
			{
				watch:
					{
						chokidar:
							{ usePolling: true }
					}
			},
			...arguments)
	return rollup
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
// TODO: Figure out way to not use hard coded solution
function _externals__node_modules(opts = {}) {
	const files = ls('-d', './node_modules/*')
	const externals = []
	const exclude = opts.exclude || []
	const set__exclude = new Set(exclude)
	for (let i = 0; i < files.length; i++) {
		const file = files[i].replace('./node_modules/', '')
		if (!set__exclude.has(file)) {
			externals.push(file)
		}
	}
	return externals
}
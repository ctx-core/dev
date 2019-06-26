import commander from 'commander'
const fs = require('fs')
import { promisify } from 'util'
const { exec } = require('child_process')
import { dirname } from 'path'
const exists = promisify(fs.exists)
const chokidar = require('chokidar')
const globby = require('globby')
import { _queue } from '@ctx-core/queue'
import { info, error } from '@ctx-core/logger'
const a1__pattern = [
	`${_dir()}/**/rollup.config.js`,
	`${_dir()}/**/tsconfig.json`,
	`${_dir()}/**/package.json`,
	`${_dir()}/**/*.svelte`,
]
export async function cli(opts = {}) {
	const {
		_path__package_json = _path__package_json,
	} = opts
	commander
		.option('-d --dir <root-directory>', 'Root directory')
		.option('-w --watch', 'Watch **/src/** files')
		.parse(process.argv)
	if (commander.watch) {
		await watch()
	} else {
		const a1__pattern__ = [`${_dir()}/**/src`].concat(a1__pattern)
		const a1__src = await globby(a1__pattern__, { gitignore: true })
		const queue = _queue()
		await Promise.all(
			a1__src.map(
				src =>
					queue.add(() => run(src))))
	}
}
async function run(path) {
	const path__package_json = await _path__package_json(path)
	if (path__package_json) {
		const build =
			exec(`cd ${dirname(path__package_json)}; npm run build --if-present`)
		build.stdout.on('data', info)
		build.stderr.on('data', error)
	}
}
async function watch() {
	const a1__pattern__ = [`${_dir()}/**/src/**`].concat(a1__pattern)
	const a1__dir = await globby(a1__pattern__, { gitignore: true })
	const watcher = chokidar.watch(a1__dir)
	watcher.on('change', run)
}
async function _path__package_json(path) {
	const path__dirname = dirname(path)
	if (path === path__dirname) return
	const path__package_json = `${path}/package.json`
	const path__tsconfig = `${path}/tsconfig.json`
	if (await exists(path__package_json) && await exists(path__tsconfig)) {
		return path__package_json
	}
	return await _path__package_json(path__dirname)
}
function _dir() {
	return commander.dir || process.cwd()
}

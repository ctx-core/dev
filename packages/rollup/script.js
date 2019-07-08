import commander from 'commander'
const fs = require('fs')
import { promisify } from 'util'
import { dirname } from 'path'
const exists = promisify(fs.exists)
const chokidar = require('chokidar')
const globby = require('globby')
import { _queue } from '@ctx-core/queue'
import { _a1__piped } from '@ctx-core/pipe'
import { info, error } from '@ctx-core/logger'
const exec = promisify(require('child_process').exec)
const a1__pattern = [
	`${_dir()}/**/*.ts`,
	`${_dir()}/**/rollup.config.js`,
	`${_dir()}/**/tsconfig.json`,
	`${_dir()}/**/package.json`,
	`${_dir()}/**/*.svelte`,
]
let a1__piped
export async function cli(opts = {}) {
	const {
		_path__package_json = _path__package_json,
	} = opts
	commander
		.option('-d --dir <root-directory>', 'Root directory')
		.option('-b --build', 'rebuild the packages')
		.option('-c --compile', 'compile the packages')
		.option('-l --clean', 'clean the packages')
		.option('-p --parallel <threads>', 'runs in parallel with threads')
		.option('-w --watch', 'Watch files')
		.parse(process.argv)
	a1__piped = await _a1__piped()
	if (commander.build) {
		await enueue__fn(script)
	} else if (commander.clean) {
		await enueue__fn(clean)
	} else if (commander.compile) {
		await enueue__fn(compile)
	} else if (commander.watch) {
		await enueue__fn(compile)
		await watch()
	} else {
		await enueue__fn(compile)
	}
}
async function _a1__src() {
	return globby(a1__pattern, { gitignore: true })
}
async function enueue__fn(fn) {
	const a1__path__package_json = await _a1__path__package_json()
	const parallel = parseInt(commander.parallel)
	if (parallel) {
		const queue = _queue(parallel)
		return Promise.all(
			a1__path__package_json.map(
				path__package_json =>
					queue.add(async () => await fn(path__package_json))))
	} else {
		const a1__out = []
		for (let i = 0; i < a1__path__package_json.length; i++) {
			a1__out.push(
				await fn(a1__path__package_json[i])
			)
		}
		return a1__out
	}
}
async function script(path__package_json) {
	return await run(path__package_json, 'build')
}
async function clean(path__package_json) {
	return await run(path__package_json, 'clean')
}
async function compile(path__package_json) {
	return await run(path__package_json, 'compile')
}
async function _a1__path__package_json() {
	const a1__src =
		a1__piped
		? a1__piped
		: await _a1__src()
	const set = new Set()
	await Promise.all(a1__src.map(async src => {
		const path__package_json = await _path__package_json(src)
		if (path__package_json) {
			set.add(path__package_json)
		}
	}))
	return Array.from(set)
}
async function run(path__package_json, script) {
	if (path__package_json && await exists(path__package_json)) {
		const { stdout, stderr } =
			await exec(`cd ${dirname(path__package_json)}; npm run ${script} --if-present`)
		if (stdout) console.info(stdout)
		if (stderr) console.error(stderr)
	}
}
async function watch() {
	const a1__dir = await globby(a1__pattern, { gitignore: true })
	const watcher = chokidar.watch(a1__dir)
	watcher.on(
		'change',
		async path =>
			compile(await _path__package_json(path)))
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


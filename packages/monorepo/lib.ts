import { promisify } from 'util'
import { map, flatten } from '@ctx-core/array'
import { _queue } from '@ctx-core/queue'
import fs from 'fs'
import child_process from 'child_process'
const exec = promisify(child_process.exec)
const globby = require('globby')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
export async function _workspaces() {
	const txt__workspaces = (await exec('yarn workspaces info')).stdout
	const a1__txt__workspaces = txt__workspaces.split('\n')
	const line__start__json__workspaces = a1__txt__workspaces.indexOf('{')
	const line__end__json__workspaces = a1__txt__workspaces.indexOf('}')
	const json__workspaces =
		a1__txt__workspaces.slice(
			line__start__json__workspaces,
			line__end__json__workspaces + 1
		).join('\n')
	return JSON.parse(json__workspaces)
}
export async function each__package__json(txt__glob, fn) {
	const a1__package__json = await globby(txt__glob)
	const a1__promise = map(a1__package__json, fn)
	await Promise.all(a1__promise)
}
type Opts__threads = {
	threads?:number
}
export async function npm_check_updates__monorepo(opts:Opts__threads = {}) {
	const package_name__x__latest_version = {}
	const queue = _queue(opts.threads || 20)
	const workspaces = await _workspaces()
	const a1__name__workspace = Object.keys(workspaces)
	const a1__promise = _a1__promise(a1__name__workspace, _promise__workspace)
	a1__name__workspace.push('.')
	a1__promise.push(_promise('.'))
	const a1__stdout = await Promise.all(a1__promise)
	return _h1__stdout__h0__name__workspace(a1__name__workspace, a1__stdout)
	async function _promise(location = '.') {
		const path__package__json = `${location}/package.json`
		const pkg = JSON.parse(
			(await readFile(path__package__json)).toString()
		)
		const { dependencies, peerDependencies, devDependencies } = pkg
		const update_a2 = []
		update_a2.push(await update__dependencies(dependencies))
		update_a2.push(await update__dependencies(devDependencies))
		update_a2.push(await update__dependencies(peerDependencies))
		const update_a1 = flatten(update_a2)
		if (update_a1.length) {
			await writeFile(path__package__json, JSON.stringify(pkg, null, '\t'))
		}
		return update_a1.join('\n')
	}
	async function _promise__workspace(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
		return _promise(location)
	}
	async function update__dependencies(dependencies) {
		const update_a1 = []
		for (let package_name in dependencies) {
			const dependency_workspace = workspaces[package_name]
			const version = dependencies[package_name]
			if (dependency_workspace) {
				const { location } = dependency_workspace
				const pkg = JSON.parse(
					(await readFile(`${location}/package.json`)).toString()
				)
				const latest_version = pkg.version
				dependencies[package_name] =
					`${version.slice(0, 1) === '^' ? '^' : ''}${latest_version}`
			} else {
				if (!package_name__x__latest_version[package_name]) {
					const promise = queue.add(async ()=>
						(
							await exec(`npm show ${package_name}@latest | grep latest | grep \\: | cut -f2 -d: | xargs echo`)
						).stdout.trim()
					)
					package_name__x__latest_version[package_name] = promise
				}
				if (package_name__x__latest_version[package_name].then) {
					package_name__x__latest_version[package_name] =
						await package_name__x__latest_version[package_name]
				}
				const latest_stripped_version = package_name__x__latest_version[package_name]
				const has_carrot = version.slice(0, 1) === '^'
				const stripped_version = has_carrot ? version.slice(1) : version
				if (stripped_version !== latest_stripped_version) {
					const latest_version = `${has_carrot ? '^' : ''}${latest_stripped_version}`
					update_a1.push(`${version} -> ${latest_version}`)
					dependencies[package_name] = latest_version
				}
			}
		}
		return update_a1
	}
}
export async function run_parallel__workspaces(cmd_a1, opts:Opts__threads = {}) {
	const queue = _queue(opts.threads || 20)
	const workspaces = await _workspaces()
	const cmd = cmd_a1.join(' ')
	const name_a1__workspace = Object.keys(workspaces)
	const promise_a1 = _a1__promise(name_a1__workspace, _promise)
	const stdout_a1 = await Promise.all(promise_a1)
	return _h1__stdout__h0__name__workspace(name_a1__workspace, stdout_a1)
	async function _promise(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
		return (
			queue.add(
				async ()=>
					(await exec(`cd ${location}; ${cmd}`)).stdout.trim()
			)
		)
	}
}
function _a1__promise(a1__workspace, _promise) {
	const a1__promise = []
	for (let i = 0; i < a1__workspace.length; i++) {
		const name__workspace = a1__workspace[i]
		a1__promise.push(_promise(name__workspace))
	}
	return a1__promise
}
function _h1__stdout__h0__name__workspace(a1__name__workspace, stdout_a1) {
	const stdout__name__workspace = {}
	for (let i = 0; i < a1__name__workspace.length; i++) {
		const name__workspace = a1__name__workspace[i]
		stdout__name__workspace[name__workspace] = stdout_a1[i]
	}
	return stdout__name__workspace
}

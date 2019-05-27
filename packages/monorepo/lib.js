import { promisify } from 'util'
import fs from 'fs'
import child_process from 'child_process'
const exec = promisify(child_process.exec)
const glob = promisify(require('glob'))
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
export async function each__package__json(fn) {
	const a1__package__json = await glob(`${__dirname}/../packages/*/package.json`)
	const a1__promise = map(a1__package__json, fn)
	await Promise.all(a1__promise)
}
export async function npm_check_updates__monorepo(opts = {}) {
	const { ncu_flags = '-au  --packageFile package.json'} = opts
	const workspaces = await _workspaces()
	const a1__name__workspace = Object.keys(workspaces)
	const a1__promise = _a1__promise(a1__name__workspace, _promise__workspace)
	a1__name__workspace.push('.')
	a1__promise.push(_promise('.'))
	const a1__stdout = await Promise.all(a1__promise)
	return _h1__stdout__h0__name__workspace(a1__name__workspace, a1__stdout)
	async function _promise(location = '.') {
		const path__package__json = `${location}/package.json`
		const pkg = JSON.parse(await readFile(path__package__json))
		const { dependencies, peerDependencies, devDependencies } = pkg
		let updated__dependency__workspaces
		if (dependencies && await update__dependencies__workspaces(dependencies)) {
			updated__dependency__workspaces = true
		}
		if (peerDependencies && await update__dependencies__workspaces(peerDependencies)) {
			updated__dependency__workspaces = true
		}
		if (devDependencies && await update__dependencies__workspaces(devDependencies)) {
			updated__dependency__workspaces = true
		}
		if (updated__dependency__workspaces) {
			pkg.dependencies = dependencies
			pkg.devDependencies = devDependencies
			await writeFile(path__package__json, JSON.stringify(pkg, null, '\t'))
		}
		return (await exec(`cd ${location}; ncu ${ncu_flags}`)).stdout
	}
	async function _promise__workspace(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
		return _promise(location)
	}
	async function update__dependencies__workspaces(dependencies) {
		let updated__dependency__workspaces
		const regex__guard = new RegExp('^[\\^0-9]')
		const regex__extract = new RegExp('^\\^?(.*)')
		const a1__promise__update__dependency = []
		for (let name__dependency in dependencies) {
			a1__promise__update__dependency.push(_promise__update__dependency(name__dependency))
		}
		await Promise.all(a1__promise__update__dependency)
		return updated__dependency__workspaces
		async function _promise__update__dependency(name__dependency) {
			const workspace__dependency = workspaces[name__dependency]
			const txt__dependency = dependencies[name__dependency]
			if (workspace__dependency && regex__guard.test(txt__dependency)) {
				const { location } = workspace__dependency
				const pkg = JSON.parse(await readFile(`${location}/package.json`))
				const version__pkg = pkg.version
				const a1__match__extract = regex__extract.exec(txt__dependency)
				const version__dependency = a1__match__extract[1]
				if (version__dependency !== version__pkg) {
					const txt__dependency__new =
						(a1__match__extract[0] != a1__match__extract[1])
						? `^${version__pkg}`
						: version__pkg
					dependencies[name__dependency] = txt__dependency__new
					updated__dependency__workspaces = true
				}
			}
		}
	}
}
export async function run_parallel__workspaces(...a1__cmd) {
	const workspaces = await _workspaces()
	const cmd = a1__cmd.join(' ')
	const a1__name__workspace = Object.keys(workspaces)
	const a1__promise = _a1__promise(a1__name__workspace, _promise)
	const a1__stdout = await Promise.all(a1__promise)
	return _h1__stdout__h0__name__workspace(a1__name__workspace, a1__stdout)
	async function _promise(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
		return (await exec(`cd ${location}; ${cmd}`)).stdout
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
function _h1__stdout__h0__name__workspace(a1__name__workspace, a1__stdout) {
	const stdout__name__workspace = {}
	for (let i = 0; i < a1__name__workspace.length; i++) {
		const name__workspace = a1__name__workspace[i]
		stdout__name__workspace[name__workspace] = a1__stdout[i]
	}
	return stdout__name__workspace
}

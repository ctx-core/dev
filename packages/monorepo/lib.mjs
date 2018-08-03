import { promisify } from 'util'
import fs from 'fs'
import child_process from 'child_process'
const exec = promisify(child_process.exec)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
export async function npm_check_updates__workspaces() {
	const workspaces = await _workspaces()
	const ARR__name__workspace = Object.keys(workspaces)
	const ARR__promise = _ARR__promise(ARR__name__workspace, _promise)
	const ARR__stdout = await Promise.all(ARR__promise)
	return _stdout__BY__name__workspace(ARR__name__workspace, ARR__stdout)
	async function _promise(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
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
		return (await exec(`cd ${location}; ncu -au --packageFile package.json`)).stdout
	}
	async function update__dependencies__workspaces(dependencies) {
		let updated__dependency__workspaces
		const regex__guard = new RegExp('^[\\^0-9]')
		const regex__extract = new RegExp('^\\^?(.*)')
		const ARR__promise__update__dependency = []
		for (let name__dependency in dependencies) {
			ARR__promise__update__dependency.push(_promise__update__dependency(name__dependency))
		}
		await Promise.all(ARR__promise__update__dependency)
		return updated__dependency__workspaces
		async function _promise__update__dependency(name__dependency) {
			const workspace__dependency = workspaces[name__dependency]
			const txt__dependency = dependencies[name__dependency]
			if (workspace__dependency && regex__guard.test(txt__dependency)) {
				const { location } = workspace__dependency
				const pkg = JSON.parse(await readFile(`${location}/package.json`))
				const version__pkg = pkg.version
				const ARR__match__extract = regex__extract.exec(txt__dependency)
				const version__dependency = ARR__match__extract[1]
				if (version__dependency !== version__pkg) {
					const txt__dependency__new =
						(ARR__match__extract[0] != ARR__match__extract[1])
						? `^${version__pkg}`
						: version__pkg
					dependencies[name__dependency] = txt__dependency__new
					updated__dependency__workspaces = true
				}
			}
		}
	}
}
export async function run_parallel__workspaces(...ARR__cmd) {
	const workspaces = await _workspaces()
	const cmd = ARR__cmd.join(' ')
	const ARR__name__workspace = Object.keys(workspaces)
	const ARR__promise = _ARR__promise(ARR__name__workspace, _promise)
	const ARR__stdout = await Promise.all(ARR__promise)
	return _stdout__BY__name__workspace(ARR__name__workspace, ARR__stdout)
	async function _promise(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
		return (await exec(`cd ${location}; ${cmd}`)).stdout
	}
}
function _ARR__promise(ARR__name__workspace, _promise) {
	const ARR__promise = []
	for (let i = 0; i < ARR__name__workspace.length; i++) {
		const name__workspace = ARR__name__workspace[i]
		ARR__promise.push(_promise(name__workspace))
	}
	return ARR__promise
}
function _stdout__BY__name__workspace(ARR__name__workspace, ARR__stdout) {
	const stdout__BY__name__workspace = {}
	for (let i = 0; i < ARR__name__workspace.length; i++) {
		const name__workspace = ARR__name__workspace[i]
		stdout__BY__name__workspace[name__workspace] = ARR__stdout[i]
	}
	return stdout__BY__name__workspace
}
export async function _workspaces() {
	const txt__workspaces = (await exec('yarn workspaces info')).stdout
	const ARR__txt__workspaces = txt__workspaces.split('\n')
	const line__start__json__workspaces = ARR__txt__workspaces.indexOf('{')
	const line__end__json__workspaces = ARR__txt__workspaces.indexOf('}')
	const json__workspaces =
		ARR__txt__workspaces.slice(
			line__start__json__workspaces,
			line__end__json__workspaces + 1
		).join('\n')
	return JSON.parse(json__workspaces)
}
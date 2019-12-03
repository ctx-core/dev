import resolve from 'resolve'
import fs from 'fs'
export function _version__package(path__package) {
	return _json__package(path__package).version
}
export const _version = _version__package
export function verify__version__node(path__package?) {
	const version__node__expected = _version__node(path__package)
	const version__node__actual = process.versions['node']
	if (
		version__node__expected
		&& version__node__expected !== version__node__actual
	) {
		throw `Expected to be running node version ${version__node__expected}. Running ${version__node__actual}.`
	}
}
export function _version__node(path__package?) {
	const json__package = _json__package(path__package)
	const { engines } = json__package
	const version__node = engines && engines.node
	return version__node
}
export function _json__package(path__package?) {
	let json
	if (path__package) {
		const resolve__path = resolve.sync(path__package, { basedir: __dirname })
		const search = `/${path__package}/`
		const index__directory = resolve__path.lastIndexOf(search) + search.length
		const directory = resolve__path.slice(0, index__directory)
		json = fs.readFileSync(`${directory}/package.json`)
	} else {
		json = fs.readFileSync(`./package.json`)
	}
	return JSON.parse(json)
}

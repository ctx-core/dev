import { reject } from '@ctx-core/array'
export function _external(pkg) {
	return reject(
		Object.keys(pkg.dependencies),
		path => /(@ctx-core|@sapper)\/.*/.test(path)
	).concat(
		require('module').builtinModules || Object.keys(process.binding('natives'))
	)
}

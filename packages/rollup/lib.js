import { reject } from '@ctx-core/array'
import pkg from '@mfgchina/web/package'
export function _external(pkg) {
	return reject(
		Object.keys(pkg.dependencies||{})
			.concat(Object.keys(pkg.devDependencies||{})),
		path => /(@ctx-core|@sapper)\/.*/.test(path)
	).concat(
		require('module').builtinModules || Object.keys(process.binding('natives'))
	)
}

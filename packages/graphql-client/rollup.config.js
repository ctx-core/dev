import { join } from 'path'
import typescript_plugin from 'rollup-plugin-typescript2'
import pkg from './package.json'
export function _config(dir = '.') {
	const config__ = {
		plugins: [typescript_plugin({
			module: 'ES2018',
			tsconfigOverride: {
				compilerOptions: {
					declarationDir: __dirname,
				},
				include: [join(dir, 'src/lib/index.ts')],
				exclude: [],
			},
		})],
		external:
			Object.keys(pkg.dependencies || {})
				.concat(Object.keys(pkg.devDependencies || {}))
				.concat(pkg.name)
				.concat(
					require('module').builtinModules || Object.keys(process.binding('natives'))
				),
	}
	return [
		{
			input: join(dir, 'src/lib/index.ts'),
			output: [
				{
					file: join(dir, 'lib/index.mjs'),
					format: 'esm',
				},
				{
					file: join(dir, 'lib/index.js'),
					format: 'cjs',
				},
			],
			...config__,
		},
	]
}
export default _config()

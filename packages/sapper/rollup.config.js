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
				include: [
					join(dir, 'src/express/index.ts'),
					join(dir, 'src/store/index.ts'),
				],
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
			input: join(dir, 'src/express/index.ts'),
			output: [
				{
					file: join(dir, 'express/index.mjs'),
					format: 'esm',
				},
				{
					file: join(dir, 'express/index.js'),
					format: 'cjs',
				},
			],
			...config__,
		},
		{
			input: join(dir, 'src/store/index.ts'),
			output: [
				{
					file: join(dir, 'store/index.mjs'),
					format: 'esm',
				},
				{
					file: join(dir, 'store/index.js'),
					format: 'cjs',
				},
			],
			...config__,
		},
	]
}
export default _config()

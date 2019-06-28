import typescript_plugin from 'rollup-plugin-typescript2'
import pkg from './package.json'
const config__ = {
	plugins: [typescript_plugin({
		module: 'ES2018',
		tsconfigOverride: {
			compilerOptions: {
				declarationDir: __dirname,
			},
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
export default [
	{
		input: 'lib/index.ts',
		output: [
			{
				file: 'lib/index.mjs',
				format: 'esm',
			},
			{
				file: 'lib/index.js',
				format: 'cjs',
			},
		],
		...config__,
	},
	{
		input: 'store/index.ts',
		output: [
			{
				file: 'store/index.mjs',
				format: 'esm',
			},
			{
				file: 'store/index.js',
				format: 'cjs',
			},
		],
		...config__,
	},
]

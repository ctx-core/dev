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
		input: 'src/lib/index.ts',
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
		input: 'src/polka/index.ts',
		output: [
			{
				file: 'polka/index.mjs',
				format: 'esm',
			},
			{
				file: 'polka/index.js',
				format: 'cjs',
			},
		],
		...config__,
	},
]

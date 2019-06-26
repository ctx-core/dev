import typescript_plugin from 'rollup-plugin-typescript2'
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
		plugins: [typescript_plugin({
			module: 'ES2018',
		})],
	}
]

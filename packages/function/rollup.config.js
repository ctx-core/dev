import fs from 'fs'
import typescript_plugin from 'rollup-plugin-typescript2'
import typescript from 'typescript'
import pkg from './package.json'
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

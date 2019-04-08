import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
export default {
	input: `${__dirname}/lib.js`,
	output: {
		file: `${__dirname}/build/etsy_cache.js`,
		format: 'cjs',
	},
	plugins: [
		resolve(),
		commonjs(),
		json(),
		babel({
			runtimeHelpers: true,
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				['@babel/plugin-transform-runtime', {
					useESModules: true
				}]
			]
		}),
	],
}
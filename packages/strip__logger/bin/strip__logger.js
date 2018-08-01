#!/usr/bin/env node
/**
 * @module @ctx-core/logger/strip-logger
 * @see {@link https://github.com/sindresorhus/strip-debug}
 */
const { output__strip__logger } = require('../lib.js')
main()
function main() {
	const fs = require('fs')
	const { argv } = process
	const file = argv[2]
	let src
	if (file) {
		src = fs.readFileSync(file, 'utf8')
		output__strip__logger(src)
	} else {
		const ARR__src = []
		process.stdin.on('readable', () => {
			const chunk = process.stdin.read()
			if (chunk) {
				ARR__src.push(chunk)
			}
		})
		process.stdin.on('end', () => {
			src = ARR__src.join('')
			output__strip__logger(src)
		})
	}
}

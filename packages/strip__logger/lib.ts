#!/usr/bin/env node
/**
 * @module @ctx-core/logger/strip-logger
 * @see {@link https://github.com/sindresorhus/strip-debug}
 */
import rocambole from 'rocambole'
import strip__debugger from 'rocambole-strip-debugger'
import strip__console from 'rocambole-strip-console'
import strip__alert from 'rocambole-strip-alert'
import updateNode from 'rocambole-node-update'
// esprima@2.1 introduces a "handler" property on TryStatement, so we would
// loop the same node twice (see jquery/esprima/issues/1031 and #264)
rocambole.BYPASS_RECURSION.handler = true
export function main() {
	const fs = require('fs')
	const { argv } = process
	const file = argv[2]
	let src
	if (file) {
		src = fs.readFileSync(file, 'utf8')
		output__strip__logger(src)
	} else {
		const a1__src = []
		process.stdin.on('readable', () => {
			const chunk = process.stdin.read()
			if (chunk) {
				a1__src.push(chunk)
			}
		})
		process.stdin.on('end', () => {
			src = a1__src.join('')
			output__strip__logger(src)
		})
	}
}
export function output__strip__logger(src) {
	console.info(strip__logger(src).toString())
}
export function strip__logger(src) {
	return rocambole.moonwalk(src, node => {
		strip__debugger(node)
		strip__console(node)
		strip__alert(node)
		FN__strip__logger(node)
	})
}
function FN__strip__logger(node) {
	if (node.type !== 'CallExpression') {
		return
	}
	const main = node.callee
	if (
		main.type === 'Identifier'
		&& (
			main.name === 'log'
			|| main.name === 'log$$1'
			|| main.name === 'debug'
			|| main.name === 'debug$$1'
		)) {
		updateNode(node, 'void 0')
	}
}
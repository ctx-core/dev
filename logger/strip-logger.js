#!/usr/bin/env node
/**
 * @module ctx-core/logger/strip-logger
 * @see {@link https://github.com/sindresorhus/strip-debug}
 */
const rocambole = require('rocambole')
    , stripDebugger = require('rocambole-strip-debugger')
    , stripConsole = require('rocambole-strip-console')
    , stripAlert = require('rocambole-strip-alert')
    , updateNode = require('rocambole-node-update')
// esprima@2.1 introduces a "handler" property on TryStatement, so we would
// loop the same node twice (see jquery/esprima/issues/1031 and #264)
rocambole.BYPASS_RECURSION.handler = true;
module.exports = strip
if (!module.parent) {
  main()
}
function main() {
  const fs = require('fs')
      , {argv} = process
      , file = argv[2]
  let src
  if (file) {
    src = fs.readFileSync(file, 'utf8')
    output(src)
  } else {
    const $$src = []
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk) {
        $$src.push(chunk)
      }
    })
    process.stdin.on('end', () => {
      src = $$src.join('')
      output(src)
    })
  }
}
function output(src) {
  console.info(strip(src).toString())
}
function strip (src) {
	return rocambole.moonwalk(src, node => {
		stripDebugger(node)
		stripConsole(node)
		stripAlert(node)
    stripLogger(node)
	})
}
function stripLogger(node) {
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
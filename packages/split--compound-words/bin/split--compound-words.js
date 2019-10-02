#!/usr/bin/env node
require = require('esm')(module)
const { createInterface } = require('readline')
const { _queue } = require('@ctx-core/queue')
const { split__compound_words } = require('../lib')
main()
async function main() {
	const rl__stdin = createInterface(process.stdin)
	const queue = _queue()
	rl__stdin.on('line', line => {
		queue.add(async () => {
			const compound_words = await split__compound_words(line)
			process.stdout.write(`${compound_words}\n`)
		})
	})
	rl__stdin.on('close', async () => {
		await queue.close()
		process.exit(0)
	})
}

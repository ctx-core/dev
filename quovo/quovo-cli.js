#!/usr/bin/env node
var fs = require('fs')
try {
	fs.statSync('private/dist/quovo-cli.js')
} catch (message__error) {
	if (message__error.code === 'ENOENT') {
		console.error(
			'quovo-cli not built. run `rollup -c ctx-core/quovo/cli.rollup.js`\n'
			+ message__error)
	} else {
		console.error(message__error)
	}
	process.exit(1)
}
require('private/dist/quovo-cli')
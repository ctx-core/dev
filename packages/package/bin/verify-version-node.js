#!/usr/bin/env node
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2), {
	h: 'help',
	p: 'package-dir'
})
main()
function main() {
	if (argv.help) {
		help__msg()
		return
	}
	require('@ctx-core/package/lib.js').verify__version__node(argv.package)
}
function help__msg() {
	return `
Usage: verify-version-node.js [-p <package-dir>]

Options:

-h, --help				This help message
-p, --package-dir	Directory of package (defaults to '.')
		`.trim()
}
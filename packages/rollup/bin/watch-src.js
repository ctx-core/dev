#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { promisify } = require('util')
const { exec } = require('child_process')
const { dirname } = require('path')
const exists = promisify(fs.exists)
const chokidar = require('chokidar')
const { info, error } = require('@ctx-core/logger')
main()
async function main() {
	const watcher = chokidar.watch('./**/src/**')
	watcher.on('change', async (path, stats) => {
		const path__package_json = await _path__package_json(path)
		if (path__package_json) {
			const build = exec(`cd ${dirname(path__package_json)}; npm run build`)
			build.stdout.on('data', info)
			build.stderr.on('data', error)
		}
	})
}
async function _path__package_json(path) {
	const path__dirname = dirname(path)
	if (path === path__dirname) return
	const path__package_json = `${path__dirname}/package.json`
	if (await exists(path__package_json)) {
		return path__package_json
	}
	return await _path__package_json(path__dirname)
}

#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { promisify } = require('util')
const { dirname } = require('path')
const exists = promisify(fs.exists)
const { cli } = require('../script')
cli({
	_path__package_json,
})
async function _path__package_json(path) {
	const path__dirname = dirname(path)
	if (path === path__dirname) return
	const path__package_json = `${path}/package.json`
	const path__tsconfig = `${path}/tsconfig.json`
	if (await exists(path__package_json) && await exists(path__tsconfig)) {
		return path__package_json
	}
	return await _path__package_json(path__dirname)
}

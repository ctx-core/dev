#!/usr/bin/env node
require = require('esm')(module)
const { _projects_json } = require('../_projects_json')
;(async ()=>{
	console.info(JSON.stringify(await _projects_json(), null, 2))
})()

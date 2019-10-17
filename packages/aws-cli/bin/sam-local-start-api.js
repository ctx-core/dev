#!/usr/bin/env node
require = require('esm')(module)
const {
	run__cli,
	cli__sam_local_start_api,
} = require('@ctx-core/aws-cli')
run__cli(async () => {
	const a1__arg = process.argv.slice(2)
	return cli__sam_local_start_api(a1__arg, {
		'--template': 'stack-template.yaml',
		'--port': process.env.PORT,
	})
})

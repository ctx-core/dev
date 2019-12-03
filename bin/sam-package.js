#!/usr/bin/env node
require = require('esm')(module)
const {
	run__cli,
	cli__sam_package,
} = require('@ctx-core/aws-cli')
run__cli(async () => {
	const a1__arg = process.argv.slice(2)
	return cli__sam_package(a1__arg, {
		'--template-file': 'stack-template.yaml',
		'--s3-bucket': process.env.AWS_SAM_BUCKET,
		'--output-template': 'packaged-template.yaml',
	})
})

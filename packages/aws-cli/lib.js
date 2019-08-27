import {
	pick__a1__arg,
	_h__flag__pick,
	_a1__arg__default,
} from '@ctx-core/cli-args'
export function _value__flag(a1__arg = process.argv.slice(1), flag = '') {
	const h__flag = _h__flag__pick(a1__arg, flag)
	return h__flag[flag]
}
export function _env_name(a1__arg = process.argv.slice(1)) {
	const env_name =
		_value__flag(a1__arg, '--env-name')
		|| process.env.NODE_ENV
		|| 'development'
	return env_name
}
export function _a1__arg__pick__cloudformation_delete_stack(a1__arg = process.argv.slice(1)) {
	return pick__a1__arg(a1__arg,
		'--stack-name',
		'--retain-resources',
		'--role-arn',
		'--client-request-token',
		'--cli-input-json',
		'--generate-cli-skeleton',
		'help',
	)
}
export function _a1__arg__pick__cloudformation_deploy(a1__arg = process.argv.slice(1)) {
	return pick__a1__arg(a1__arg,
		'--template-file',
		'--stack-name',
		'--s3-bucket',
		'--force-upload',
		'--s3-prefix',
		'--kms-key-id',
		'--parameter-overrides',
		'--capabilities',
		'--no-execute-changeset',
		'--role-arn',
		'--notification-arns',
		'--fail-on-empty-changeset',
		'--tags',
		'help',
	)
}
export function _a1__arg__pick__cloudformation_describe_stack_events(a1__arg = process.argv.slice(1)) {
	return pick__a1__arg(a1__arg,
		'--stack-name',
		'--cli-input-json',
		'--starting-token',
		'--max-items',
		'--generate-cli-skeleton',
		'help',
	)
}
export function _a1__arg__pick__sam_build(a1__arg = process.argv.slice(1)) {
	return pick__a1__arg(a1__arg,
		'-b, --build-dir',
		'-s, --base-dir',
		'-u, --use-container',
		'-m, --manifest',
		'-t, --template',
		'--parameter-overrides',
		'--skip-pull-image',
		'--docker-network',
		'--debug',
		'--profile',
		'--region',
		'--help',
	)
}
export function _a1__arg__pick__sam_local_start_api(a1__arg = process.argv.slice(1)) {
	return pick__a1__arg(a1__arg,
		'--host',
		'-p, --port',
		'-s, --static-dir',
		'-t, --template',
		'-n, --env-vars',
		'--parameter-overrides',
		'-d, --debug-port',
		'--debugger-path',
		'--debug-args',
		'-v, --docker-volume-basedir',
		'-l, --log-file',
		'--layer-cache-basedir',
		'--skip-pull-image',
		'--docker-network',
		'--force-image-build',
		'--debug',
		'--profile',
		'--region',
		'--help',
	)
}
export function _a1__arg__pick__sam_package(a1__arg = process.argv.slice(1)) {
	return pick__a1__arg(a1__arg,
		'--s3-bucket',
		'--output-template',
		'--debug',
		'--help',
	)
}

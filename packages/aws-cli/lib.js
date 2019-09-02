import {
	pick__a1__arg,
	_h__flag__pick,
} from '@ctx-core/cli-args'
import { _a1__arg__default } from '@ctx-core/cli-args'
export function _value__flag(a1__arg = process.argv.slice(1), ...a1__flag) {
	const h__flag = _h__flag__pick(a1__arg, ...a1__flag)
	for (let i = 0; i < a1__flag.length; i++) {
		const value = h__flag[a1__flag[i]]
		if (value) return value
	}
	return
}
export function _stage(a1__arg = process.argv.slice(1)) {
	const stage =
		_value__flag(a1__arg, '--stage')
		|| process.env.NODE_ENV
		|| 'development'
	return stage
}
export function _env_name(a1__arg = process.argv.slice(1)) {
	const env_name =
		_value__flag(a1__arg, '--env-name')
		|| process.env.NODE_ENV
		|| 'development'
	return env_name
}
//region _a1__arg__cloudformation_delete_stack
export function _a1__arg__cloudformation_delete_stack(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--stack-name',
		'--retain-resources',
		'--role-arn',
		'--client-request-token',
		'--cli-input-json',
		'--generate-cli-skeleton',
		'help',
	)
}
//endregion
//region _a1__arg__cloudformation_deploy
export function _a1__arg__cloudformation_deploy(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
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
//endregion
//region _a1__arg__cloudformation_describe_stack_events
export function _a1__arg__cloudformation_describe_stack_events(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--stack-name',
		'--cli-input-json',
		'--starting-token',
		'--max-items',
		'--generate-cli-skeleton',
		'help',
	)
}
//endregion
//region _a1__arg__cloudformation_package
export function _a1__arg__cloudformation_package(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--template-file',
		'--s3-bucket',
		'--s3-prefix',
		'--kms-key-id',
		'--output-template-file',
		'--use-json',
		'--force-upload',
		'--metadata',
		'help',
	)
}
//endregion
//region _a1__arg__logs__describe_log_groups
export function _a1__arg__logs__describe_log_groups(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--log-group-name',
		'--log-group-name-prefix',
		'--cli-input-json',
		'--starting-token',
		'--page-size',
		'--max-items',
		'--generate-cli-skeleton',
		'help',
	)
}
//endregion
//region _a1__arg__logs__describe_log_streams
export function _a1__arg__logs__describe_log_streams(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--log-group-name',
		'--log-stream-name-prefix',
		'--order-by',
		'--no-descending',
		'--descending',
		'--cli-input-json',
		'--starting-token',
		'--page-size',
		'--max-items',
		'--generate-cli-skeleton',
		'help',
	)
}
//endregion
//region _a1__arg__logs__get_log_events
export function _a1__arg__logs__get_log_events(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--log-group-name',
		'--log-stream-name',
		'--start-time',
		'--end-time',
		'--next-token',
		'--limit',
		'--start-from-head',
		'--no-start-from-head',
		'--cli-input-json',
		'--generate-cli-skeleton',
		'help',
	)
}
//endregion
//region _a1__arg__sam_build
export function _a1__arg__sam_build(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
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
//endregion
//region _a1__arg__sam_local_start_api
export function _a1__arg__sam_local_start_api(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
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
//endregion
//region _a1__arg__sam_package
export function _a1__arg__sam_package(
	a1__arg = process.argv.slice(1),
	h1__dfn__flag__h0__value = {},
	a1__cancel = []
) {
	return pick__a1__arg(
		_a1__arg__default(a1__arg, h1__dfn__flag__h0__value, a1__cancel),
		'--s3-bucket',
		'--output-template',
		'--debug',
		'--help',
	)
}
//endregion


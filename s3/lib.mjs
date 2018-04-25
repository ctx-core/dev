import AWS from 'aws-sdk'
import 'ctx-core/s3/env'
import {log,error,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/s3/lib.mjs'
export function _S3() {
	return new AWS.S3(...arguments)
}
/**
 * S3 listObjectsV2
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property}
 */
export function listObjectsV2(ctx) {
	log(`${logPrefix}|listObjectsV2`)
	return _S3().listObjectsV2(ctx).promise()
}
/**
 * S3 getObject
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property}
 */
export function getObject(ctx) {
	log(`${logPrefix}|getObject`)
	return _S3().getObject(ctx).promise()
}
/**
 * S3 putObject
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property}
 */
export function putObject(ctx) {
	log(`${logPrefix}|putObject`)
	return _S3().putObject(ctx).promise()
}

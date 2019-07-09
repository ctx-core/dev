//import AWS from 'aws-sdk'
const AWS = require('aws-sdk')
import './env'
import { log, error, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/s3/lib.js'
export function _S3() {
	return new AWS.S3(...arguments)
}
/**
 * @typedef opts__listObjectsV2
 * @property {string}Bucket
 * @property {string}[ContinuationToken]
 * @property {string}[Delimiter]
 * @property {string}[EncodingType]
 * @property {boolean}[FetchOwner]
 * @property {string}[MaxKeys]
 * @property {string}[Prefix]
 * @property {string}[RequestPayer]
 * @property {string}[StartAfter]
 */
/**
 * S3 listObjectsV2
 * @param {opts__listObjectsV2}opts
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property}
 */
export function listObjectsV2(opts = {}) {
	log(`${logPrefix}|listObjectsV2`)
	return _S3().listObjectsV2(opts).promise()
}
/**
 * @typedef opts__getObject
 * @property {string}Bucket
 * @property {string}Key
 * @property {string}[IfMatch]
 * @property {Date|string|number}[IfModifiedSince]
 * @property {string}[IfNoneMatch]
 * @property {Date|string|number}[IfUnmodifiedSince]
 * @property {string}[PartNumber]
 * @property {string}[Range]
 * @property {string}[RequestPayer]
 * @property {string}[ResponseCacheControl]
 * @property {string}[ResponseContentDisposition]
 * @property {string}[ResponseContentEncoding]
 * @property {string}[ResponseContentLanguage]
 * @property {string}[ResponseContentType]
 * @property {Date|string|number}[ResponseExpires]
 * @property {string}[SSECustomerAlgorithm]
 * @property {Buffer|string}[SSECustomerKey]
 * @property {string}[SSECustomerKeyMD5]
 * @property {string}[VersionId]
 */
/**
 * S3 getObject
 * @param {opts__getObject}opts
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property}
 */
export function getObject(opts = {}) {
	log(`${logPrefix}|getObject`)
	return _S3().getObject(opts).promise()
}
/**
 * @typedef {'private'|'public-read'|'public-read-write'|'authenticated-read'|'aws-exec-read'|'bucket-owner-read'|'bucket-owner-full-control'}ACL
 */
/**
 * @typedef {'STANDARD'|'REDUCED_REDUNDANCY'|'STANDARD_IA'|'ONEZONE_IA'|'INTELLIGENT_TIERING'|'GLACIER'|'DEEP_ARCHIVE'}StorageClass
 */
/**
 * @typedef opts__putObject
 * @property {string}Bucket
 * @property {string}Key
 * @property {ACL}ACL
 * @property {Buffer|string}Body
 * @property {string}CacheControl
 * @property {string}ContentDisposition
 * @property {string}ContentEncoding
 * @property {string}ContentLanguage
 * @property {string}ContentLength
 * @property {string}ContentMD5
 * @property {string}ContentType
 * @property {Date|string}Expires
 * @property {string}GrantFullControl
 * @property {string}GrantRead
 * @property {string}GrantReadACP
 * @property {string}GrantWriteACP
 * @property MetadataKey
 * @property {'ON'|'OFF'}ObjectLockLegalHoldStatus
 * @property {'GOVERNANCE'|'COMPLIANCE'}ObjectLockMode
 * @property {Date|string}ObjectLockRetainUntilDate
 * @property {string}RequestPayer
 * @property {string}SSECustomerAlgorithm
 * @property {string}SSECustomerKeyMD5
 * @property {string}SSEKMSKeyId
 * @property {'AES256'|'aws:kms'}ServerSideEncryption
 * @property {StorageClass}StorageClass
 * @property {string}Tagging
 * @property {string}WebsiteRedirectLocation
 */
/**
 * S3 putObject
 * @param {opts__putObject}opts
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property}
 */
export function putObject(opts = {}) {
	log(`${logPrefix}|putObject`)
	return _S3().putObject(opts).promise()
}
/**
 * Returns the String of the Body Buffer
 * @param opts
 * @param {Buffer|string}opts.Body
 * @returns {string}
 */
export function _string__Body__Object({ Body }) {
	return Body.toString()
}
/**
 * Returns the Date of LastModified
 * @param opts
 * @param {string}opts.LastModified
 * @returns {string}
 */
export function _date__LastModified__Object({ LastModified }) {
	return new Date(Date.parse(LastModified))
}

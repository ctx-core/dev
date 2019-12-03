/// <reference types="node" />
import { S3Client } from '@aws-sdk/client-s3-node/S3Client';
import { ListObjectsInput } from '@aws-sdk/client-s3-node/commands/ListObjectsCommand';
import './env';
import { GetObjectInput } from '@aws-sdk/client-s3-node/types/GetObjectInput';
import { PutObjectInput } from '@aws-sdk/client-s3-node/types/PutObjectInput';
interface Opts__S3Client extends ListObjectsInput {
    region?: string;
}
export declare function _S3Client({ region }: Opts__S3Client): S3Client;
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
 * S3 ListObjectsCommand
 * @param {opts__listObjectsV2}opts
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property}
 */
export declare function listObjects(opts: Opts__S3Client): Promise<import("@aws-sdk/client-s3-node/types/ListObjectsOutput").ListObjectsOutput>;
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
interface Opts__getObject extends GetObjectInput {
    region?: string;
}
/**
 * S3 getObject
 * @param {opts__getObject}opts
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property}
 */
export declare function getObject(opts: Opts__getObject): Promise<import("@aws-sdk/client-s3-node/types/GetObjectOutput").GetObjectOutput<import("stream").Readable>>;
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
interface Opts__putObject extends PutObjectInput {
    region?: string;
}
/**
 * S3 putObject
 * @param {opts__putObject}opts
 * @returns {Promise}
 * @see {@link http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property}
 */
export declare function putObject(opts: Opts__putObject): Promise<import("@aws-sdk/client-s3-node/types/PutObjectOutput").PutObjectOutput>;
/**
 * Returns the String of the Body Buffer
 * @param opts
 * @param {Buffer|string}opts.Body
 * @returns {string}
 */
export declare function _string__Body__Object({ Body }: {
    Body: any;
}): any;
/**
 * Returns the Date of LastModified
 * @param opts
 * @param {string}opts.LastModified
 * @returns {string}
 */
export declare function _date__LastModified__Object({ LastModified }: {
    LastModified: any;
}): Date;
export {};

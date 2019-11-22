import { sleep } from '@ctx-core/sleep'
import { S3Client } from '@aws-sdk/client-s3-node/S3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3-node/commands/PutObjectCommand'
import {
	_a1__listing__etsy,
	_a1__images__listing__etsy,
} from './lib'
type Opts__put__a1__listing__etsy = {
	region?:string
	Bucket?:string
	KEY__A1__LISTING__ETSY?:string
}
export async function put__a1__listing__etsy(a1__listing__etsy, opts:Opts__put__a1__listing__etsy = {}) {
	const {
		region = 'us-east-1',
		Bucket = process.env.S3_BUCKET,
		KEY__A1__LISTING__ETSY = process.env.KEY__A1__LISTING__ETSY,
	} = opts
	const s3 = new S3Client({ region })
	const obj__PutObjectCommand = new PutObjectCommand({
		Bucket,
		Key: KEY__A1__LISTING__ETSY,
		Body: JSON.stringify(a1__listing__etsy),
	})
	return await s3.send(obj__PutObjectCommand)
}
export const put__arr__listing__etsy = put__a1__listing__etsy
type Opts__put__a1__images__listing__etsy = {
	region?:string
	Bucket?:string
	KEY__A1__IMAGES__LISTING__ETSY?:string
}
export async function put__a1__images__listing__etsy(a1__images__listing__etsy, opts:Opts__put__a1__images__listing__etsy = {}) {
	const {
		region = 'us-east-1',
		Bucket = process.env.S3_BUCKET,
		KEY__A1__IMAGES__LISTING__ETSY = process.env.KEY__A1__IMAGES__LISTING__ETSY,
	} = opts
	const s3 = new S3Client({ region })
	const obj__PutObjectCommand = new PutObjectCommand({
		Bucket,
		Key: KEY__A1__IMAGES__LISTING__ETSY,
		Body: JSON.stringify(a1__images__listing__etsy),
	})
	return await s3.send(obj__PutObjectCommand)
}
export const put__arr__images__listing__etsy = put__a1__images__listing__etsy
export async function put__cache__etsy() {
	const a1__listing__etsy = await _a1__listing__etsy()
	const a1__images__listing__etsy = []
	const length__page = 5
	for (let i = 0; i < a1__listing__etsy.length; i += length__page) {
		if (i) await sleep(1000)
		const a1__images__listing__etsy__page__ =
			await _a1__images__listing__etsy(a1__listing__etsy.slice(i, i + length__page))
		a1__images__listing__etsy.push.apply(
			a1__images__listing__etsy,
			a1__images__listing__etsy__page__)
	}
	await Promise.all([
		put__a1__listing__etsy(a1__listing__etsy),
		put__a1__images__listing__etsy(a1__images__listing__etsy),
	])
}

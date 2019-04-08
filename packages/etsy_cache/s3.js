import { sleep } from '@ctx-core/sleep'
import { putObject } from '@ctx-core/s3'
import {
	_arr__listing__etsy,
	_arr__images__listing__etsy,
} from './lib'
export async function put__arr__listing__etsy(arr__listing__etsy, opts = {}) {
	const {
		Bucket = process.env.S3_BUCKET,
		KEY__ARR__LISTING__ETSY = process.env.KEY__ARR__LISTING__ETSY,
	} = opts
	return putObject({
		Bucket,
		Key: KEY__ARR__LISTING__ETSY,
		Body: JSON.stringify(arr__listing__etsy),
	})
}
export async function put__arr__images__listing__etsy(arr__images__listing__etsy, opts = {}) {
	const {
		Bucket = process.env.S3_BUCKET,
		KEY__ARR__IMAGES__LISTING__ETSY = process.env.KEY__ARR__IMAGES__LISTING__ETSY,
	} = opts
	return putObject({
		Bucket,
		Key: KEY__ARR__IMAGES__LISTING__ETSY,
		Body: JSON.stringify(arr__images__listing__etsy),
	})
}
export async function put__cache__etsy() {
	const arr__listing__etsy = await _arr__listing__etsy()
	const arr__images__listing__etsy = []
	const length__page = 5
	for (let i = 0; i < arr__listing__etsy.length; i += length__page) {
		if (i) await sleep(1000)
		const arr__images__listing__etsy__page__ =
			await _arr__images__listing__etsy(arr__listing__etsy.slice(i, i + length__page))
		arr__images__listing__etsy.push.apply(
			arr__images__listing__etsy,
			arr__images__listing__etsy__page__)
	}
	await Promise.all([
		put__arr__listing__etsy(arr__listing__etsy),
		put__arr__images__listing__etsy(arr__images__listing__etsy),
	])
}

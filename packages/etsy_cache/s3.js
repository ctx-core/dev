import { sleep } from '@ctx-core/sleep'
import { putObject } from '@ctx-core/s3'
import {
	_a1__listing__etsy,
	_a1__images__listing__etsy,
} from './lib'
export async function put__a1__listing__etsy(a1__listing__etsy, opts = {}) {
	const {
		Bucket = process.env.S3_BUCKET,
		KEY__ARR__LISTING__ETSY = process.env.KEY__ARR__LISTING__ETSY,
	} = opts
	return putObject({
		Bucket,
		Key: KEY__ARR__LISTING__ETSY,
		Body: JSON.stringify(a1__listing__etsy),
	})
}
export const put__arr__listing__etsy = put__a1__listing__etsy
export async function put__a1__images__listing__etsy(a1__images__listing__etsy, opts = {}) {
	const {
		Bucket = process.env.S3_BUCKET,
		KEY__ARR__IMAGES__LISTING__ETSY = process.env.KEY__ARR__IMAGES__LISTING__ETSY,
	} = opts
	return putObject({
		Bucket,
		Key: KEY__ARR__IMAGES__LISTING__ETSY,
		Body: JSON.stringify(a1__images__listing__etsy),
	})
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

import { fetch } from '@ctx-core/fetch'
export async function fetch__a1__listing__etsy__s3(opts = {}) {
	const {
		S3_BUCKET = process.env.S3_BUCKET
	} = opts
	const {
		KEY__A1__LISTING__ETSY = process.env.KEY__A1__LISTING__ETSY,
	} = opts
	return fetch(
		`https://s3.amazonaws.com/${S3_BUCKET}/${KEY__A1__LISTING__ETSY}`,
		{ mode: 'cors' }
	)
}
export const fetch__arr__listing__etsy__s3 = fetch__a1__listing__etsy__s3
export async function _a1__listing__etsy__s3(opts = {}) {
	const response = await fetch__a1__listing__etsy__s3(opts)
	return response.json()
}
export const _arr__listing__etsy__s3 = _a1__listing__etsy__s3
export async function fetch__a1__images__listing__etsy__s3(opts = {}) {
	const {
		S3_BUCKET = process.env.S3_BUCKET
	} = opts
	const {
		KEY__A1__IMAGES__LISTING__ETSY = process.env.KEY__A1__IMAGES__LISTING__ETSY,
	} = opts
	return fetch(
		`https://s3.amazonaws.com/${S3_BUCKET}/${KEY__A1__IMAGES__LISTING__ETSY}`,
		{ mode: 'cors' }
	)
}
export const fetch__arr__images__listing__etsy__s3 = fetch__a1__images__listing__etsy__s3
export async function _a1__images__listing__etsy__s3(opts = {}) {
	const response = await fetch__a1__images__listing__etsy__s3(opts)
	return response.json()
}
export const _arr__images__listing__etsy__s3 = _a1__images__listing__etsy__s3
export async function fetch__a1__listing__etsy(opts = {}) {
	const {
		ETSY_API_KEY = process.env.ETSY_API_KEY,
		ETSY_STORE_ID = process.env.ETSY_STORE_ID,
	} = opts
	return fetch(`https://openapi.etsy.com/v2/shops/${ETSY_STORE_ID}/listings/active?api_key=${ETSY_API_KEY}`)
}
export const fetch__arr__listing__etsy = fetch__a1__listing__etsy
export async function fetch__images__listing__etsy(listing_id, opts = {}) {
	const {
		ETSY_API_KEY = process.env.ETSY_API_KEY,
	} = opts
	return fetch(`https://openapi.etsy.com/v2/listings/${listing_id}/images?api_key=${ETSY_API_KEY}`)
}

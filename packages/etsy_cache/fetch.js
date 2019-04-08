import { fetch } from '@ctx-core/fetch'
export async function _arr__listing__etsy__s3(opts = {}) {
	const response = await fetch__arr__listing__etsy__s3(opts)
	return response.json()
}
export async function fetch__arr__listing__etsy__s3(opts = {}) {
	const {
		S3_BUCKET = process.env.S3_BUCKET
	} = opts
	const {
		KEY__ARR__LISTING__ETSY = process.env.KEY__ARR__LISTING__ETSY,
	} = opts
	return fetch(
		`https://s3.amazonaws.com/${S3_BUCKET}/${KEY__ARR__LISTING__ETSY}`,
		{ mode: 'cors' }
	)
}
export async function _arr__images__listing__etsy__s3(opts = {}) {
	const response = await fetch__arr__images__listing__etsy__s3(opts)
	return response.json()
}
export async function fetch__arr__images__listing__etsy__s3(opts = {}) {
	const {
		S3_BUCKET = process.env.S3_BUCKET
	} = opts
	const {
		KEY__ARR__IMAGES__LISTING__ETSY = process.env.KEY__ARR__IMAGES__LISTING__ETSY,
	} = opts
	return fetch(
		`https://s3.amazonaws.com/${S3_BUCKET}/${KEY__ARR__IMAGES__LISTING__ETSY}`,
		{ mode: 'cors' }
	)
}
export async function fetch__arr__listing__etsy(opts = {}) {
	const {
		ETSY_API_KEY = process.env.ETSY_API_KEY,
		ETSY_STORE_ID = process.env.ETSY_STORE_ID,
	} = opts
	return fetch(`https://openapi.etsy.com/v2/shops/${ETSY_STORE_ID}/listings/active?api_key=${ETSY_API_KEY}`)
}
export async function fetch__images__listing__etsy(listing_id, opts = {}) {
	const {
		ETSY_API_KEY = process.env.ETSY_API_KEY,
	} = opts
	return fetch(`https://openapi.etsy.com/v2/listings/${listing_id}/images?api_key=${ETSY_API_KEY}`)
}

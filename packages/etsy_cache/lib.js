import {
	fetch__a1__listing__etsy,
	fetch__images__listing__etsy,
} from './fetch'
export async function _a1__listing__etsy() {
	const response = await fetch__a1__listing__etsy()
	const { results } = await response.json()
	return results
}
export const _arr__listing__etsy = _a1__listing__etsy
export async function _a1__images__listing__etsy(a1__listing__etsy) {
	const a1__promise__images__listing__etsy = []
	for (let i = 0; i < a1__listing__etsy.length; i++) {
		const listing__etsy = a1__listing__etsy[i]
		const { listing_id } = listing__etsy
		a1__promise__images__listing__etsy.push(_images__listing__etsy(listing_id))
	}
	const a1__images__listing__etsy = await Promise.all(a1__promise__images__listing__etsy)
	return a1__images__listing__etsy
	async function _images__listing__etsy(listing_id) {
		const response = await fetch__images__listing__etsy(listing_id)
		if (response.headers.get('content-type') == 'application/json') {
			const json = await response.json()
			return json.results[0]
		} else {
			console.warn(`listing_id ${listing_id} failed`, response.headers)
		}
	}
}
export const _arr__images__listing__etsy = _a1__images__listing__etsy
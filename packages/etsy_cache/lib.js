import {
	fetch__arr__listing__etsy,
	fetch__images__listing__etsy,
} from './fetch'
export async function _arr__listing__etsy() {
	const response = await fetch__arr__listing__etsy()
	const { results } = await response.json()
	return results
}
export async function _arr__images__listing__etsy(arr__listing__etsy) {
	const arr__promise__images__listing__etsy = []
	for (let i = 0; i < arr__listing__etsy.length; i++) {
		const listing__etsy = arr__listing__etsy[i]
		const { listing_id } = listing__etsy
		arr__promise__images__listing__etsy.push(_images__listing__etsy(listing_id))
	}
	const arr__images__listing__etsy = await Promise.all(arr__promise__images__listing__etsy)
	return arr__images__listing__etsy
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
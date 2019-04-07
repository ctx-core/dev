import { fetch } from '@ctx-core/fetch'
export async function _medium(pathname) {
	const response = await fetch__medium(pathname)
	return response.json()
}
export async function fetch__medium(pathname) {
	return fetch(`https://api.instagram.com/oembed/?url=http://instagr.am${pathname}`)
}

import { fetch } from '@ctx-core/fetch'
export function fetch__a1__pathname__medium(opts={}) {
	const {
		Bucket=process.env.S3_BUCKET,
		KEY__A1__PATHNAME__MEDIUM=process.env.KEY__A1__PATHNAME__MEDIUM,
	} = opts
	return fetch(
		`https://s3.amazonaws.com/${Bucket}/${KEY__A1__PATHNAME__MEDIUM}`,
		{ mode: 'cors' }
	)
}
export const fetch__arr__pathname__medium = fetch__a1__pathname__medium
export async function _a1__pathname__medium(opts = {}) {
	const response = await fetch__a1__pathname__medium()
	const text = await response.text()
	return text.split('\n')
}
export const _arr__pathname__medium = _a1__pathname__medium
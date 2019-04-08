import { fetch } from '@ctx-core/fetch'
export function fetch__arr__pathname__medium(opts={}) {
	const {
		Bucket=process.env.S3_BUCKET,
		KEY__ARR__PATHNAME__MEDIUM=process.env.KEY__ARR__PATHNAME__MEDIUM,
	} = opts
	return fetch(
		`https://s3.amazonaws.com/${Bucket}/${KEY__ARR__PATHNAME__MEDIUM}`,
		{ mode: 'cors' }
	)
}
export async function _arr__pathname__medium(opts = {}) {
	const response = await fetch__arr__pathname__medium()
	const text = await response.text()
	return text.split('\n')
}

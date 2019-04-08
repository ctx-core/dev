import { putObject, getObject } from '@ctx-core/s3'
const Bucket = process.env.S3_BUCKET
export async function get__arr__pathname__medium(opts = {}) {
	const {
		KEY__ARR__PATHNAME__MEDIUM = process.env.KEY__ARR__PATHNAME__MEDIUM,
	} = opts
	return getObject({
		Bucket,
		Key: KEY__ARR__PATHNAME__MEDIUM,
	})
}
export async function put__arr__pathname__medium(arr__pathname__medium, opts = {}) {
	const {
		KEY__ARR__PATHNAME__MEDIUM = process.env.KEY__ARR__PATHNAME__MEDIUM,
	} = opts
	return putObject({
		Bucket,
		Key: KEY__ARR__PATHNAME__MEDIUM,
		Body: arr__pathname__medium.join('\n'),
	})
}

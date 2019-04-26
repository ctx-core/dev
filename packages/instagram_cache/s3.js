import { putObject, getObject } from '@ctx-core/s3'
const Bucket = process.env.S3_BUCKET
export async function get__a1__pathname__medium(opts = {}) {
	const {
		KEY__ARR__PATHNAME__MEDIUM = process.env.KEY__ARR__PATHNAME__MEDIUM,
	} = opts
	return getObject({
		Bucket,
		Key: KEY__ARR__PATHNAME__MEDIUM,
	})
}
export const get__arr__pathname__medium = get__a1__pathname__medium
export async function put__a1__pathname__medium(a1__pathname__medium, opts = {}) {
	const {
		KEY__ARR__PATHNAME__MEDIUM = process.env.KEY__ARR__PATHNAME__MEDIUM,
	} = opts
	return putObject({
		Bucket,
		Key: KEY__ARR__PATHNAME__MEDIUM,
		Body: a1__pathname__medium.join('\n'),
	})
}
export const put__arr__pathname__medium = put__a1__pathname__medium
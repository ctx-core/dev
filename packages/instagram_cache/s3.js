import { S3Client } from '@aws-sdk/client-s3-node/S3Client'
import { GetObjectCommand} from '@aws-sdk/client-s3-node/commands/GetObjectCommand'
import { PutObjectCommand} from '@aws-sdk/client-s3-node/commands/PutObjectCommand'
const Bucket = process.env.S3_BUCKET
export async function get__a1__pathname__medium(opts = {}) {
	const {
		region = 'us-east-1',
		KEY__A1__PATHNAME__MEDIUM =
			process.env.KEY__A1__PATHNAME__MEDIUM,
	} = opts
	const s3 = new S3Client({ region })
	return await s3.send(new GetObjectCommand({
		Bucket,
		Key: KEY__A1__PATHNAME__MEDIUM,
	}))
}
export const get__arr__pathname__medium = get__a1__pathname__medium
export async function put__a1__pathname__medium(a1__pathname__medium, opts = {}) {
	const {
		region = 'us-east-1',
		KEY__A1__PATHNAME__MEDIUM =
			process.env.KEY__A1__PATHNAME__MEDIUM,
	} = opts
	const s3 = new S3Client({ region })
	return await s3.send(new PutObjectCommand({
		Bucket,
		Key: KEY__A1__PATHNAME__MEDIUM,
	}))
}
export const put__arr__pathname__medium = put__a1__pathname__medium

import { throw__missing__env } from '@ctx-core/env/env'
export const AWS_REGION = process.env.AWS_REGION || 'us-east-1'
if (!process.env.AWS_ACCESS_KEY_ID)
	throw__missing__env('AWS_ACCESS_KEY_ID')
if (!process.env.AWS_SECRET_ACCESS_KEY)
	throw__missing__env('AWS_SECRET_ACCESS_KEY')

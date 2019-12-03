import { throw__missing__env } from '@ctx-core/env/env'
const SESSION_KEY =
	process.env.SESSION_KEY
	|| throw__missing__env('SESSION_KEY')
export { SESSION_KEY }

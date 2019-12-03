import { ManagementClient } from 'auth0'
type Params__management__auth0 = {
	domain?:string
	clientId?:string
	clientSecret?:string
}
export function _management__auth0(params:Params__management__auth0 = {}) {
	const domain = params.domain || process.env.AUTH0_DOMAIN
	const clientId = params.clientId || process.env.AUTH0_MANAGEMENT_ID
	const clientSecret = params.clientSecret || process.env.AUTH0_MANAGEMENT_SECRET
	const scope = ''
	return new ManagementClient({
		domain,
		clientId,
		clientSecret,
		scope,
	})
}

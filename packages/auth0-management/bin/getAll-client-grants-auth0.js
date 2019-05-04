#!/usr/bin/env node
require = require('esm')(module)
const { _management__auth0 } = require('@ctx-core/auth0-management')
const { get__client_grants__v2__auth0, _audience } = require('@ctx-core/auth0-management/fetch')
//main()
main2()
async function main() {
	const auth0__management = _management__auth0()
	const a1__clientGrant = await auth0__management.clientGrants.getAll()
	console.info(JSON.stringify(a1__clientGrant, null, 2))
}
async function main2() {
  const response = await get__client_grants__v2__auth0({
		json: {
			client_id: process.env.AUTH0_CLIENT_ID,
			audience: _audience()
		}
	})
	const json = await response.json()
	console.info(JSON.stringify(json, null, 2))
}

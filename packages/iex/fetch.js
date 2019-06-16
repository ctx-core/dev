import { clone } from '@ctx-core/object'
import { fetch } from '@ctx-core/fetch'
import { _yyyymmddhhmmss__utc, _yyyymmdd__utc } from '@ctx-core/date'
import crypto from 'crypto'
const IEX_HOST = process.env.IEX_HOST
const IEX_PUBLIC_KEY = process.env.IEX_PUBLIC_KEY
const IEX_SECRET_KEY = process.env.IEX_SECRET_KEY
const schema__host__version = `https://${IEX_HOST}/beta`
export function get__marketcap({ ticker }, opts = {}) {
	return (
		fetch__iex(
			`${schema__host__version}/stock/${ticker}/stats/marketcap`,
			opts)
	)
}
export async function _marketcap(params, opts = {}) {
	const res = await get__marketcap(params, opts)
	return res.json()
}
export function get__peRatio({ ticker }, opts = {}) {
	return (
		fetch__iex(
			`${schema__host__version}/stock/${ticker}/stats/peRatio`,
			opts)
	)
}
export async function _peRatio(params, opts = {}) {
	const res = await get__marketcap(params, opts)
	return res.json()
}
export function get__quote({ ticker }, opts = {}) {
	console.debug('get__quote|debug|1')
	console.debug(`${schema__host__version}/stock/${ticker}/quote`)
	return (
		fetch__iex(
			`${schema__host__version}/stock/${ticker}/quote`,
			opts)
	)
}
export async function _quote(params, opts = {}) {
	const res = await get__quote(params, opts)
	const quote = await res.json()
	return quote
}
export async function fetch__iex(url, opts = {}) {
	return fetch(..._a1__arg__fetch__iex(url, opts))
}
function _a1__arg__fetch__iex(canonical_uri, opts = {}) {
	const opts__iex = clone(opts)
	const method = 'GET'
	const canonical_querystring =
		`token=${IEX_PUBLIC_KEY}`
	const iexdate =
		`${_yyyymmddhhmmss__utc()}Z`
	const datestamp = _yyyymmdd__utc()
	const canonical_headers =
		`host:${IEX_HOST}\nx-iex-date:${iexdate}\n`
	const signed_headers = 'host;x-iex-date'
	const payload = ''
	const payload_hash =
		crypto
			.createHash('sha256')
			.update(payload)
			.digest('hex')
	const canonical_request = [
		method,
		canonical_uri,
		canonical_querystring,
		canonical_headers,
		signed_headers,
		payload_hash,
	].join('\n')
	const algorithm = 'IEX-HMAC-SHA256'
	const credential_scope = datestamp + '/' + 'iex_request'
	const string_to_sign = [
		algorithm,
		iexdate,
		credential_scope,
		crypto
			.createHash('sha256')
			.update(canonical_request, 'utf8')
			.digest('hex'),
	].join('\n')
	const signing_key = getSignatureKey(IEX_SECRET_KEY, datestamp)
	const signature =
		crypto
			.createHmac('sha256', signing_key)
			.update(string_to_sign, 'utf8')
			.digest('hex')
	const authorization_header = [
		`${algorithm} Credential=${IEX_PUBLIC_KEY}/${credential_scope}`,
		`SignedHeaders=${signed_headers}`,
		`Signature=${signature}`,
	].join(', ')
	const headers = {
		'x-iex-date': iexdate,
		'Authorization': authorization_header
	}
	opts__iex.headers = clone(opts.headers, headers)
	return [`${canonical_uri}?${canonical_querystring}`, opts__iex]
}
function sign(secret, data) {
	return crypto.createHmac('sha256', secret).update(data, 'utf8').digest('hex')
}
function getSignatureKey(key, datestamp) {
	const signedDate = sign(key, datestamp)
	return sign(signedDate, 'iex_request')
}

import { clone } from '@ctx-core/object'
import { fetch } from '@ctx-core/fetch'
import { _yyyymmddhhmmss__utc, _yyyymmdd__utc } from '@ctx-core/date'
import crypto from 'crypto'
// # ref_data_symbols
export async function get__ref_data_symbols(opts = {}) {
	return (
		fetch__iex(
			`/ref-data/symbols`,
			opts)
	)
}
export async function _ref_data_symbols(opts = {}) {
	const res = await get__ref_data_symbols(opts)
	return res.json()
}
// # ref_data_exchange_symbols
export async function get__ref_data_exchange_symbols(opts = {}, params = {}) {
	return (
		fetch__iex(
			`/ref-data/exchange/${params.exchange}/symbols`,
			opts)
	)
}
export async function _ref_data_exchange_symbols(opts = {}, params = {}) {
	const res = await get__ref_data_exchange_symbols(opts, params)
	return res.json()
}
// # ref_data_exchanges
export async function get__ref_data_exchanges(opts = {}) {
	return (
		fetch__iex(
			`/ref-data/exchanges`,
			opts)
	)
}
export async function _ref_data_exchanges(opts = {}) {
	const res = await get__ref_data_exchanges(opts)
	return res.json()
}
// # marketcap
export function get__marketcap({ ticker }, opts = {}) {
	return (
		fetch__iex(
			`/stock/${ticker}/stats/marketcap`,
			opts)
	)
}
export async function _marketcap(params, opts = {}) {
	const res = await get__marketcap(params, opts)
	return res.json()
}
// # peRatio
export function get__peRatio({ ticker }, opts = {}) {
	return (
		fetch__iex(
			`/stock/${ticker}/stats/peRatio`,
			opts)
	)
}
export async function _peRatio(params, opts = {}) {
	const res = await get__peRatio(params, opts)
	return res.json()
}
// # ytdChangePercent
export function get__ytdChangePercent({ ticker }, opts = {}) {
	return (
		fetch__iex(
			`/stock/${ticker}/stats/ytdChangePercent`,
			opts)
	)
}
export async function _ytdChangePercent(params, opts = {}) {
	const res = await get__ytdChangePercent(params, opts)
	return res.json()
}
// # quote
export function get__quote({ ticker }, opts = {}) {
	return (
		fetch__iex(
			`/stock/${ticker}/quote`,
			opts)
	)
}
export async function _quote(params, opts = {}) {
	const res = await get__quote(params, opts)
	return res.json()
}
// # lib
export async function fetch__iex(path, opts = {}) {
	return fetch(..._a1__arg__fetch__iex(path, opts))
}
function _a1__arg__fetch__iex(path, opts = {}) {
	const opts__iex = clone(opts)
	const IEX_HOST = opts.IEX_HOST || process.env.IEX_HOST
	const IEX_PUBLIC_KEY = opts.IEX_PUBLIC_KEY || process.env.IEX_PUBLIC_KEY
	const IEX_SECRET_KEY = opts.IEX_SECRET_KEY || process.env.IEX_SECRET_KEY
	const schema__host__version = `https://${IEX_HOST}/beta`
	const canonical_uri = `${schema__host__version}${path}`
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

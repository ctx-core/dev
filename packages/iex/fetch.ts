import { clone } from '@ctx-core/object'
import { fetch } from '@ctx-core/fetch'
import { _yyyymmddhhmmss__utc, _yyyymmdd__utc } from '@ctx-core/date'
import crypto from 'crypto'
// # ref_data_symbols
export function _path__ref_data_symbols() {
	return `/ref-data/symbols`
}
export async function get__ref_data_symbols(opts = {}) {
	return (
		fetch__iex(
			_path__ref_data_symbols(),
			opts)
	)
}
export async function _ref_data_symbols(opts = {}) {
	const res = await get__ref_data_symbols(opts)
	return res.ok && res.json()
}
type Opts__path__ref_data_exchange_symbols = {
	exchange:string
}
// # ref_data_exchange_symbols
export function _path__ref_data_exchange_symbols({ exchange }:Opts__path__ref_data_exchange_symbols) {
	return `/ref-data/exchange/${exchange}/symbols`
}
export async function get__ref_data_exchange_symbols(opts, params:Opts__path__ref_data_exchange_symbols) {
	return (
		fetch__iex(
			_path__ref_data_exchange_symbols(params),
			opts)
	)
}
export async function _ref_data_exchange_symbols(opts, params) {
	const res = await get__ref_data_exchange_symbols(opts, params)
	return res.ok && res.json()
}
// # ref_data_exchanges
export function _path__ref_data_exchanges() {
	return `/ref-data/exchanges`
}
export async function get__ref_data_exchanges(opts = {}) {
	return (
		fetch__iex(
			_path__ref_data_exchanges(),
			opts)
	)
}
export async function _ref_data_exchanges(opts = {}) {
	const res = await get__ref_data_exchanges(opts)
	return res.ok && res.json()
}
// # fx_rate
export function _path__fx_rate({ from, to }) {
	return `/fx/rate/${from}/${to}`
}
export function get__fx_rate({ from, to }, opts = {}) {
	return (
		fetch__iex(
			_path__fx_rate({ from, to }),
			opts)
	)
}
export async function _fx_rate(params, opts = {}) {
	const { from, to } = params
	if (!from) return
	if (from === to) return 1.0
	const res = await get__fx_rate(params, opts)
	const json = await res.json()
	return json.rate
}
// # marketcap
export function _path__marketcap({ ticker }) {
	return `/stock/${ticker}/stats/marketcap`
}
export function get__marketcap({ ticker }, opts = {}) {
	return (
		fetch__iex(
			_path__marketcap({ ticker }),
			opts)
	)
}
export async function _marketcap(params, opts = {}) {
	const res = await get__marketcap(params, opts)
	return res.ok && res.json()
}
// # peRatio
export function _path__peRatio({ ticker }) {
	return `/stock/${ticker}/stats/peRatio`
}
export function get__peRatio({ ticker }, opts = {}) {
	return (
		fetch__iex(
			_path__peRatio({ ticker }),
			opts)
	)
}
export async function _peRatio(params, opts = {}) {
	const res = await get__peRatio(params, opts)
	return res.ok && res.json()
}
// # ytdChangePercent
export function _path__ytdChangePercent({ ticker }) {
	return `/stock/${ticker}/stats/ytdChangePercent`
}
export function get__ytdChangePercent({ ticker }, opts = {}) {
	return (
		fetch__iex(
			_path__ytdChangePercent({ ticker }),
			opts)
	)
}
export async function _ytdChangePercent(params, opts = {}) {
	const res = await get__ytdChangePercent(params, opts)
	return res.ok && res.json()
}
// # quote
/**
 * @param opts
 * @param {string}opts.ticker
 * @returns {string}
 */
export function _path__quote({ ticker }) {
	return `/stock/${ticker}/quote`
}
export function get__quote({ ticker }, opts = {}) {
	return fetch__iex(_path__quote({ ticker }), opts)
}
export async function _quote(params, opts = {}) {
	const res = await get__quote(params, opts)
	return res.ok && res.json()
}
// # lib
export async function fetch__iex(path, opts = {}) {
	return fetch(..._a1__arg__fetch__iex(path, opts))
}
type Opts__a1__arg__fetch__iex = {
	IEX_HOST?:string
	IEX_PUBLIC_KEY?:string
	IEX_SECRET_KEY?:string
	headers?:any
}
function _a1__arg__fetch__iex(path, opts:Opts__a1__arg__fetch__iex = {}) {
	const opts__iex = clone(opts)
	const IEX_HOST = opts.IEX_HOST || process.env.IEX_HOST
	const IEX_PUBLIC_KEY = opts.IEX_PUBLIC_KEY || process.env.IEX_PUBLIC_KEY
	const IEX_SECRET_KEY = opts.IEX_SECRET_KEY || process.env.IEX_SECRET_KEY
	const schema__host__version = `https://${IEX_HOST}/beta`
	const canonical_uri = `${schema__host__version}${path}`
	const method = 'GET'
	const canonical_querystring =
		`token=${IEX_PUBLIC_KEY}`
	const iexdate = `${_yyyymmddhhmmss__utc()}Z`
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

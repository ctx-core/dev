/** @module @ctx-core/currency */
import {
	format__commas,
	unformat__commas,
	isNumber,
} from '@ctx-core/number'
type Ctx__currency_code = {
	currency_code?:string
	currency?:string
}
type Opts__format__currency = {
	digits?:number
}
type Opts__default = {
	default?:string
	currency_code?:string
	currency?:string
	digits?:number
}
/**
 * Formats currency to USD ($) with commas
 * @param {string|number} amount - The currency amount to be outputted
 * @param {*} opts
 * @param {*} opts.default
 * @param {string=} opts.currency_code
 * @param {string=} opts.currency
 * @param {Int=} opts.digits
 * @returns {string} The formatted currency with as USD
 * @example
 * format__currency(1000000) // $1,000,000.00
 * @example
 * format__currency(1000000, {digits: 0}) // $1,000,000
 */
export function format__currency(amount, opts?:Opts__default|string) {
	const num__amount = parseFloat(amount)
	return (
		Number.isNaN(num__amount)
		? ((opts && (opts as Opts__default).default) || '')
		: `${_symbol__currency(opts)}${format__money(num__amount, opts as Opts__default)}`
	)
}
export function _format__currency(opts = {}) {
	return amount=>format__currency(amount, opts)
}
/**
 * Remove currency delimiter & commas from string representing amount.
 * @param {string|number} amount
 * @param opts
 * @returns {string}
 */
export function unformat__currency(amount, opts?:Opts__default) {
	return (
		amount == null
		? ((opts && opts.default) || amount)
		: (
			unformat__commas(
				amount
					.toString()
					.replace(_symbol__currency(opts), ''))
		)
	)
}
/**
 * Formats money value with commas (no currency type)
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [digits=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted money without currency type
 */
export function format__money(amount, opts?:Opts__format__currency) {
	const digits =
		isNumber(opts && opts.digits)
		? (opts && opts.digits)
		: 2
	return (
		amount
		&& format__commas(amount.toFixed(digits))
	)
}
export const currencies = {
	ALL: 'L',
	AFN: '؋',
	ARS: '$',
	AWG: 'ƒ',
	AUD: '$',
	AZN: '₼',
	BSD: '$',
	BBD: '$',
	BYR: 'p.',
	BZD: 'BZ$',
	BMD: '$',
	BOB: 'Bs.',
	BAM: 'KM',
	BWP: 'P',
	BGN: 'лв',
	BRL: 'R$',
	BND: '$',
	KHR: '៛',
	CAD: '$',
	KYD: '$',
	CLP: '$',
	CNY: '¥',
	COP: '$',
	CRC: '₡',
	HRK: 'kn',
	CUP: '₱',
	CZK: 'Kč',
	DKK: 'kr',
	DOP: 'RD$',
	XCD: '$',
	EGP: '£',
	SVC: '$',
	EEK: 'kr',
	EUR: '€',
	FKP: '£',
	FJD: '$',
	GHC: '₵',
	GIP: '£',
	GTQ: 'Q',
	GGP: '£',
	GYD: '$',
	HNL: 'L',
	HKD: '$',
	HUF: 'Ft',
	ISK: 'kr',
	INR: '₹',
	IDR: 'Rp',
	IRR: '﷼',
	IMP: '£',
	ILS: '₪',
	JMD: 'J$',
	JPY: '¥',
	JEP: '£',
	KES: 'KSh',
	KPW: '₩',
	KRW: '₩',
	KGS: 'лв',
	LAK: '₭',
	LVL: 'Ls',
	LBP: '£',
	LRD: '$',
	LTL: 'Lt',
	MKD: 'ден',
	MYR: 'RM',
	MUR: '₨',
	MXN: '$',
	MNT: '₮',
	MZN: 'MT',
	NAD: '$',
	NPR: '₨',
	ANG: 'ƒ',
	NZD: '$',
	NIO: 'C$',
	NGN: '₦',
	NOK: 'kr',
	OMR: '﷼',
	PKR: '₨',
	PAB: 'B/.',
	PYG: 'Gs',
	PEN: 'S/.',
	PHP: '₱',
	PLN: 'zł',
	QAR: '﷼',
	RON: 'lei',
	RUB: '₽',
	RMB: '￥',
	SHP: '£',
	SAR: '﷼',
	RSD: 'Дин.',
	SCR: '₨',
	SGD: '$',
	SBD: '$',
	SOS: 'S',
	ZAR: 'R',
	LKR: '₨',
	SEK: 'kr',
	CHF: 'CHF',
	SRD: '$',
	SYP: '£',
	TZS: 'TSh',
	TWD: 'NT$',
	THB: '฿',
	TTD: 'TT$',
	TRY: '₺',
	TRL: '₤',
	TVD: '$',
	UGX: 'USh',
	UAH: '₴',
	GBP: '£',
	USD: '$',
	UYU: '$U',
	UZS: 'лв',
	VEF: 'Bs',
	VND: '₫',
	YER: '﷼',
	ZWD: 'Z$',
	GEL: '₾',
	KZT: '₸'
}
/**
 * Returns the symbol for the given `__currency_code.currency`. Defaults to `$`
 * @param {*|string}__currency_code
 * @param {string=}__currency_code.currency_code
 * @param {string=}__currency_code.currency
 * @returns {string} The currency symbol
 * @See {@link https://github.com/bengourley/currency-symbol-map}
 * @See {@link https://raw.githubusercontent.com/bengourley/currency-symbol-map/master/map.js}
 */
export function _symbol__currency(__currency_code?:Ctx__currency_code|string) {
	const currency_code =
		(
			__currency_code
			&& (
				(__currency_code as Ctx__currency_code).currency_code
				|| (__currency_code as Ctx__currency_code).currency)
		)
		|| __currency_code
	const symbol__currency =
		currencies[currency_code as string]
		|| '$'
	return symbol__currency
}

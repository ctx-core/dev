/** @module ctx-core/currency/lib */
/**
 * Formats currency to USD ($) with commas
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [digits=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted currency with as USD
 * @example
 * $format__currency({amount: 1000000}) // $1,000,000.00
 * @example
 * $format__currency({amount: 1000000, digits: 0}) // $1,000,000
 */
export function $format__currency(ctx) {
  const {amount} = ctx
      , amount$ = parseFloat(amount)
  return  Number.isNaN(amount$)
          ? ''
          : `${$symbol__currency(ctx)}${format__money(ctx)}`
}
/**
 * Formats money value with commas (no currency type)
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [digits=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted money without currency type
 */
export function format__money(ctx) {
  const { amount
        , digits=2} = ctx
      , $ =
          amount
          && amount
              .toFixed(digits)
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  return $
}
export const currencies = {
  ALL: 'L'
, AFN: '؋'
, ARS: '$'
, AWG: 'ƒ'
, AUD: '$'
, AZN: '₼'
, BSD: '$'
, BBD: '$'
, BYR: 'p.'
, BZD: 'BZ$'
, BMD: '$'
, BOB: 'Bs.'
, BAM: 'KM'
, BWP: 'P'
, BGN: 'лв'
, BRL: 'R$'
, BND: '$'
, KHR: '៛'
, CAD: '$'
, KYD: '$'
, CLP: '$'
, CNY: '¥'
, COP: '$'
, CRC: '₡'
, HRK: 'kn'
, CUP: '₱'
, CZK: 'Kč'
, DKK: 'kr'
, DOP: 'RD$'
, XCD: '$'
, EGP: '£'
, SVC: '$'
, EEK: 'kr'
, EUR: '€'
, FKP: '£'
, FJD: '$'
, GHC: '₵'
, GIP: '£'
, GTQ: 'Q'
, GGP: '£'
, GYD: '$'
, HNL: 'L'
, HKD: '$'
, HUF: 'Ft'
, ISK: 'kr'
, INR: '₹'
, IDR: 'Rp'
, IRR: '﷼'
, IMP: '£'
, ILS: '₪'
, JMD: 'J$'
, JPY: '¥'
, JEP: '£'
, KES: 'KSh'
, KZT: 'лв'
, KPW: '₩'
, KRW: '₩'
, KGS: 'лв'
, LAK: '₭'
, LVL: 'Ls'
, LBP: '£'
, LRD: '$'
, LTL: 'Lt'
, MKD: 'ден'
, MYR: 'RM'
, MUR: '₨'
, MXN: '$'
, MNT: '₮'
, MZN: 'MT'
, NAD: '$'
, NPR: '₨'
, ANG: 'ƒ'
, NZD: '$'
, NIO: 'C$'
, NGN: '₦'
, NOK: 'kr'
, OMR: '﷼'
, PKR: '₨'
, PAB: 'B/.'
, PYG: 'Gs'
, PEN: 'S/.'
, PHP: '₱'
, PLN: 'zł'
, QAR: '﷼'
, RON: 'lei'
, RUB: '₽'
, RMB: '￥'
, SHP: '£'
, SAR: '﷼'
, RSD: 'Дин.'
, SCR: '₨'
, SGD: '$'
, SBD: '$'
, SOS: 'S'
, ZAR: 'R'
, LKR: '₨'
, SEK: 'kr'
, CHF: 'CHF'
, SRD: '$'
, SYP: '£'
, TZS: 'TSh'
, TWD: 'NT$'
, THB: '฿'
, TTD: 'TT$'
, TRY: '₺'
, TRL: '₤'
, TVD: '$'
, UGX: 'USh'
, UAH: '₴'
, GBP: '£'
, USD: '$'
, UYU: '$U'
, UZS: 'лв'
, VEF: 'Bs'
, VND: '₫'
, YER: '﷼'
, ZWD: 'Z$'
, GEL: '₾'
, KZT: '₸'
}
/**
 * `ctx.summary__company.currency`
 * @returns {string} The symbol for the `ctx.summary__company.currency`
 * @See {@link https://github.com/bengourley/currency-symbol-map}
 * @See {@link https://raw.githubusercontent.com/bengourley/currency-symbol-map/master/map.js}
 */
export function $symbol__currency(ctx) {
  const {summary__company} = ctx
      , currency = ctx.currency
      , $ = currencies[currency] || '$'
  return $
}
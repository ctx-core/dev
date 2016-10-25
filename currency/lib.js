/** @module ctx-core/currency/lib */
export const currencies = $currencies()
/**
 * Formats currency to USD ($) with commas
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [digits=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted currency with as USD
 * @example
 * format__currency({amount: 1000000}) // $1,000,000.00
 * @example
 * format__currency({amount: 1000000, digits: 0}) // $1,000,000
 */
export function format__currency(ctx) {
  const { amount
        , currency='USD'} = ctx
      , symbol__currency = currencies[currency]
  return  Number.isNaN(amount)
          ? ''
          : `${symbol__currency}${format__money(ctx)}`
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
  return  amount
          .toFixed(digits)
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
/**
 *
 * @returns {{ALL: string, AFN: string, ARS: string, AWG: string, AUD: string, AZN: string, BSD: string, BBD: string, BYR: string, BZD: string, BMD: string, BOB: string, BAM: string, BWP: string, BGN: string, BRL: string, BND: string, KHR: string, CAD: string, KYD: string, CLP: string, CNY: string, COP: string, CRC: string, HRK: string, CUP: string, CZK: string, DKK: string, DOP: string, XCD: string, EGP: string, SVC: string, EEK: string, EUR: string, FKP: string, FJD: string, GHC: string, GIP: string, GTQ: string, GGP: string, GYD: string, HNL: string, HKD: string, HUF: string, ISK: string, INR: string, IDR: string, IRR: string, IMP: string, ILS: string, JMD: string, JPY: string, JEP: string, KES: string, KZT: string, KPW: string, KRW: string, KGS: string, LAK: string, LVL: string, LBP: string, LRD: string, LTL: string, MKD: string, MYR: string, MUR: string, MXN: string, MNT: string, MZN: string, NAD: string, NPR: string, ANG: string, NZD: string, NIO: string, NGN: string, NOK: string, OMR: string, PKR: string, PAB: string, PYG: string, PEN: string, PHP: string, PLN: string, QAR: string, RON: string, RUB: string, RMB: string, SHP: string, SAR: string, RSD: string, SCR: string, SGD: string, SBD: string, SOS: string, ZAR: string, LKR: string, SEK: string, CHF: string, SRD: string, SYP: string, TZS: string, TWD: string, THB: string, TTD: string, TRY: string, TRL: string, TVD: string, UGX: string, UAH: string, GBP: string, USD: string, UYU: string, UZS: string, VEF: string, VND: string, YER: string, ZWD: string, GEL: string, KZT: string}}
 * @See {@link https://github.com/bengourley/currency-symbol-map}
 * @See {@link https://raw.githubusercontent.com/bengourley/currency-symbol-map/master/map.js}
 */
function $currencies() {
  return  { "ALL": "L"
          , "AFN": "؋"
          , "ARS": "$"
          , "AWG": "ƒ"
          , "AUD": "$"
          , "AZN": "₼"
          , "BSD": "$"
          , "BBD": "$"
          , "BYR": "p."
          , "BZD": "BZ$"
          , "BMD": "$"
          , "BOB": "Bs."
          , "BAM": "KM"
          , "BWP": "P"
          , "BGN": "лв"
          , "BRL": "R$"
          , "BND": "$"
          , "KHR": "៛"
          , "CAD": "$"
          , "KYD": "$"
          , "CLP": "$"
          , "CNY": "¥"
          , "COP": "$"
          , "CRC": "₡"
          , "HRK": "kn"
          , "CUP": "₱"
          , "CZK": "Kč"
          , "DKK": "kr"
          , "DOP": "RD$"
          , "XCD": "$"
          , "EGP": "£"
          , "SVC": "$"
          , "EEK": "kr"
          , "EUR": "€"
          , "FKP": "£"
          , "FJD": "$"
          , "GHC": "₵"
          , "GIP": "£"
          , "GTQ": "Q"
          , "GGP": "£"
          , "GYD": "$"
          , "HNL": "L"
          , "HKD": "$"
          , "HUF": "Ft"
          , "ISK": "kr"
          , "INR": "₹"
          , "IDR": "Rp"
          , "IRR": "﷼"
          , "IMP": "£"
          , "ILS": "₪"
          , "JMD": "J$"
          , "JPY": "¥"
          , "JEP": "£"
          , "KES": "KSh"
          , "KZT": "лв"
          , "KPW": "₩"
          , "KRW": "₩"
          , "KGS": "лв"
          , "LAK": "₭"
          , "LVL": "Ls"
          , "LBP": "£"
          , "LRD": "$"
          , "LTL": "Lt"
          , "MKD": "ден"
          , "MYR": "RM"
          , "MUR": "₨"
          , "MXN": "$"
          , "MNT": "₮"
          , "MZN": "MT"
          , "NAD": "$"
          , "NPR": "₨"
          , "ANG": "ƒ"
          , "NZD": "$"
          , "NIO": "C$"
          , "NGN": "₦"
          , "NOK": "kr"
          , "OMR": "﷼"
          , "PKR": "₨"
          , "PAB": "B/."
          , "PYG": "Gs"
          , "PEN": "S/."
          , "PHP": "₱"
          , "PLN": "zł"
          , "QAR": "﷼"
          , "RON": "lei"
          , "RUB": "₽"
          , "RMB": "￥"
          , "SHP": "£"
          , "SAR": "﷼"
          , "RSD": "Дин."
          , "SCR": "₨"
          , "SGD": "$"
          , "SBD": "$"
          , "SOS": "S"
          , "ZAR": "R"
          , "LKR": "₨"
          , "SEK": "kr"
          , "CHF": "CHF"
          , "SRD": "$"
          , "SYP": "£"
          , "TZS": "TSh"
          , "TWD": "NT$"
          , "THB": "฿"
          , "TTD": "TT$"
          , "TRY": "₺"
          , "TRL": "₤"
          , "TVD": "$"
          , "UGX": "USh"
          , "UAH": "₴"
          , "GBP": "£"
          , "USD": "$"
          , "UYU": "$U"
          , "UZS": "лв"
          , "VEF": "Bs"
          , "VND": "₫"
          , "YER": "﷼"
          , "ZWD": "Z$"
          , "GEL": "₾"
          , "KZT": "₸"
          }
}
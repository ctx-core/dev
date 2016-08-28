/** @module ctx-core/currency/lib */
/**
 * Formats currency to USD ($) with commas
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [decimal_places=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted currency with as USD
 * @example
 * format__currency(1000000) // $1,000,000.00
 * @example
 * format__currency(1000000, 0) // $1,000,000
 */
export function format__currency(amount, decimal_places=2) {
  const usd$amount = Math.round(parseFloat(amount))
  return isNaN(usd$amount) ? '' : `$${format__money(usd$amount, decimal_places)}`
}
/**
 * Formats money value with commas (no currency type)
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [decimal_places=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted money without currency type
 */
export function format__money(amount, decimal_places=2) {
  return amount
    .toFixed(decimal_places)
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
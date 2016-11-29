import {$int__hex} from 'ctx-core/number/lib'
/**
 * Convert hex to a comma-delimited rgb string
 * @param hex
 * @returns {string}
 * @example
 * $rgb__hex('ABC') // '170,187,204'
 * $rgb__hex('123456') // '18,52,86'
 */
export function $rgb__hex(hex) {
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, ($0, $1) => $1+$1)
  }
  const hex$$ = hex.match(/.{1,2}/g)
  let $$ = []
  for (let i=0; i < hex$$.length; i++) {
    $$.push($int__hex(hex$$[i]))
  }
  return $$.join(',')
}
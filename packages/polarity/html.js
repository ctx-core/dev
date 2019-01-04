import { _class } from '@ctx-core/html/lib.js'
import { isNumber } from '@ctx-core/number/lib.js'
/**
 * Class list returning one in set {positive, negative, neutral}
 * @param number
 * @returns {string}
 * @see [@link https://www.wikiwand.com/en/Sentiment_analysis]
 */
export function _class__polarity(number) {
	return _class({
		positive: number > 0,
		neutral: !isNumber(number) || number == 0,
		negative: number < 0,
		polarity: true
	})
}
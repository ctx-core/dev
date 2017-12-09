import {$class} from 'ctx-core/html/lib.mjs'

/**
 * Class list returning one in set {positive, negative, neutral}
 * @param number
 * @returns {string}
 * @see [@link https://www.wikiwand.com/en/Sentiment_analysis]
 */
export function $class__contextual_polarity(number) {
  return $class({
    positive: number > 0,
    neutral: number == 0,
    negative: number < 0
  })
}
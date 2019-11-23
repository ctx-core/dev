import { isNumber } from '@ctx-core/number'
export function _text__polarity(value) {
	if (!isNumber(value) && !value) return ''
	const float__value = parseFloat(value)
	const text__abs__float__value = float__value.toFixed(2)
	return (
		float__value > 0
		? `+${text__abs__float__value}`
		: text__abs__float__value
	)
}
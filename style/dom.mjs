export function _px__rem(rem = 1) {
	return rem * parseFloat(
		getComputedStyle(
			document.documentElement)
			.fontSize
	)
}
export function _rem__px(px = 16) {
	return px / _px__rem(1)
}
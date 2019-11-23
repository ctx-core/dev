export function _is__visible(el) {
	const { top, bottom } = el.getBoundingClientRect()
	const { innerHeight } = window
	return _is__visible__(top, bottom, innerHeight)
}
export function _is__visible__(top, bottom, innerHeight) {
	return (top > 0 && top < innerHeight)
		|| _is__active__(top, bottom)
}
export function _is__active(el) {
	const { top, bottom } = el.getBoundingClientRect()
	return _is__active__(top, bottom)
}
export function _is__active__(top, bottom) {
	return top <= 0 && bottom >= 0
}
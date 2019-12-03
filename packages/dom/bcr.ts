export function _BoundingClientRect(el) {
	const {
		top,
		bottom,
		left,
		right,
		height,
		width,
		length
	} = el.getBoundingClientRect()
	return { top, bottom, left, right, height, width, length }
}
export function _bcr__scroll(node, scroll_node = document.documentElement) {
	if (!scroll_node) return
	const bcr = node.getBoundingClientRect()
	const { scrollLeft, scrollTop } = scroll_node
	return {
		top: bcr.top + scrollTop,
		right: bcr.right - scrollLeft,
		bottom: bcr.bottom - scrollTop,
		left: bcr.left + scrollLeft,
		height: bcr.height,
		width: bcr.width,
		x: bcr.x,
		y: bcr.y,
	}
}
export function _bcr__offset(node) {
	const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = node
	return {
		top: offsetTop,
		right: offsetLeft + offsetWidth,
		bottom: offsetTop + offsetHeight,
		left: offsetLeft,
		height: offsetHeight,
		width: offsetWidth,
		x: offsetLeft,
		y: offsetTop,
	}
}

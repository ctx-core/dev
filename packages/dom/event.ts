export function addEvent(el, type, fn) {
	if (el.addEventListener)
		el.addEventListener(type, fn, false)
	else
		el.attachEvent(`on${type}`, fn)
}
export function trigger__native_event(node, event_name, bubbles = true, cancelable = false) {
	const event = document.createEvent('HTMLEvents')
	event.initEvent(event_name, bubbles, cancelable)
	node.dispatchEvent(event)
	return event
}
export function trigger__custom_event(node, event_name, detail = {}) {
	let event
	if (window.CustomEvent) {
		event = new CustomEvent(event_name, { detail })
	} else {
		event = document.createEvent('CustomEvent')
		event.initCustomEvent(event_name, true, true, detail)
	}
	node.dispatchEvent(event)
	return event
}

export function contains__class(el, class_name) {
	return el.classList.contains(class_name)
}
export const has__class = contains__class
export function set__class(el, class_name, value) {
	let op = value ? 'add' : 'remove'
	return el.classList[op](class_name)
}
export function add__class(el, class_name) {
	return el.classList.add(class_name)
}
export function toggle__class(el, class_name) {
	return el.classList.toggle(class_name)
}
export function remove__class(el, class_name) {
	return el.classList.remove(class_name)
}

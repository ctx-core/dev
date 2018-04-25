import {$dom2} from 'ctx-core/dom/lib.mjs'
export function value__input() {
	const dom = $dom2(...arguments)
	return dom && dom.value
}
export function value__radio(name) {
	const elements = document.getElementsByName(name)
	for (let i=0, l=elements.length; i < l; i++) {
		if (elements[i].checked) {
			return elements[i].value
		}
	}
}
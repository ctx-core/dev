import { _dom2 } from '@ctx-core/dom'
export function value__input(selector, parent?) {
	const dom = _dom2(selector, parent)
	return dom && dom.value
}
export function value__radio(name) {
	const element_a1:NodeList = document.getElementsByName(name)
	for (let i = 0, l = element_a1.length; i < l; i++) {
		const element = element_a1[i] as HTMLInputElement
		if (element.checked) {
			return element.value
		}
	}
}

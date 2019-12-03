import { assign } from '@ctx-core/object'
export function copy(value) {
	const input:HTMLInputElement = document.createElement('input')
	assign(input.style, {
		position: 'absolute',
		left: '-1000px',
		top: '-1000px',
	})
	input.value = value
	document.body.appendChild(input)
	input.select()
	document.execCommand('copy')
	document.body.removeChild(input)
}

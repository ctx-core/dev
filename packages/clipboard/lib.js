export function copy(value) {
	const input = document.createElement('input')
	input.style = 'position: absolute; left: -1000px; top: -1000px;'
	input.value = value
	document.body.appendChild(input)
	input.select()
	document.execCommand('copy')
	document.body.removeChild(input)
}
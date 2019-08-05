import { elasticOut } from 'svelte/easing'
export function spin(_, { duration }) {
	return {
		duration,
		css: t=>{
			const eased = elasticOut(t)
			return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
		}
	}
}
export function typewriter(node, { speed = 50 }) {
	const valid = (
		node.childNodes.length === 1 &&
		node.childNodes[0].nodeType === 3
	)
	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`)
	}
	const text = node.textContent
	const duration = text.length * speed
	return {
		duration,
		tick: t=>{
			const i = ~~(text.length * t)
			node.textContent = text.slice(0, i)
		}
	}
}
export function whoosh(node, params) {
	const existingTransform =
		window.getComputedStyle(node).transform.replace('none', '')
	return {
		delay: params.delay || 0,
		duration: params.duration || 400,
		easing: params.easing || elasticOut,
		css: (t, _)=>`transform: ${existingTransform} scale(${t})`
	}
}

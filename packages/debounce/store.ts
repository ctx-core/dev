import { get, writable } from 'svelte/store'
export const __table__debounce = writable({})
export async function debounce(opts) {
	const { key, no, yes } = opts
	const table__debounce = get(__table__debounce)
	if (table__debounce[key]) {
		return await no()
	}
	try {
		table__debounce[key] = () => table__debounce[key] = null
		return await yes()
	} finally {
		table__debounce[key]()
	}
}

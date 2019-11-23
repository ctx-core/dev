export function _hostname() {
	const hostname =
		(typeof window === 'object'
			&& window.location.hostname)
		|| ''
	return hostname
}
export function _pathname() {
	const pathname =
		(typeof window === 'object'
			&& window.location.pathname)
		|| ''
	return pathname
}

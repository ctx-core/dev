export function _hostname(ctx) {
	const hostname =
		(typeof window === 'object'
			&& window.location.hostname)
		|| ''
	return hostname
}
export function _pathname(ctx) {
	const pathname =
		(typeof window === 'object'
			&& window.location.pathname)
		|| ''
	return pathname
}
export function _number__fibonacci(n) {
	return (
		n < 1
		? 0
		: n <= 2
			? 1
			: _number__fibonacci(n - 1) + _number__fibonacci(n - 2)
	)
}
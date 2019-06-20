export function _queue(max) {
	if (max === 0) max = 4
	const a1__item = []
	let pending = 0
	let closed = false
	let fulfil__closed
	function dequeue() {
		if (pending === 0 && a1__item.length === 0) {
			if (fulfil__closed)
				fulfil__closed()
		}
		if (pending >= max) return
		if (a1__item.length === 0) return
		pending += 1
		const item = a1__item.shift()
		const { fn, fulfil, reject } = item
		const promise = fn()
		try {
			promise.then(fulfil, reject).then(() => {
				pending -= 1
				dequeue()
			})
		} catch (err) {
			reject(err)
			pending -= 1
			dequeue()
		}
		dequeue()
	}
	return {
		add(fn) {
			if (closed) {
				throw new Error('Cannot add to a closed queue')
			}
			return new Promise((fulfil, reject) => {
				a1__item.push({ fn, fulfil, reject })
				dequeue()
			})
		},
		close() {
			closed = true
			return new Promise((fulfil, reject) => {
				if (pending === 0) {
					fulfil()
				} else {
					fulfil__closed = fulfil
				}
			})
		}
	}
}

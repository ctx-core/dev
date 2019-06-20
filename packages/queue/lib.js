function _queue(max) {
	if (max === 0) max = 4
	const items = []
	let pending = 0
	let closed = false
	let fulfil__closed
	function dequeue() {
		if (pending === 0 && items.length === 0) {
			if (fulfil__closed)
				fulfil__closed()
		}
		if (pending >= max) return
		if (items.length === 0) return
		pending += 1
		const a1 = items.shift()
		const { fn, fulfil, reject } = a1
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
				items.push({ fn, fulfil, reject })
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

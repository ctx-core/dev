export function _queue(max=4) {
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
		const { fn, fulfil, reject } = a1__item.shift()
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
			return new Promise(fulfil => {
				if (pending === 0) {
					fulfil()
				} else {
					fulfil__closed = fulfil
				}
			})
		}
	}
}
/**
 * Rate limit function factory.
 * @param {number}max__ops - Maximum number of ops per inverval
 * @param {number}interval - The time to count ops
 * @param {boolean}allow__bursts - Allow bursts of ops or space ops along interval
 * @returns {function(*=): Promise<unknown>}
 * @link {@see https://www.matteoagosti.com/blog/2013/01/22/rate-limiting-function-calls-in-javascript/}
 */
export function _rate_limit(max__ops, interval, allow__bursts = false) {
	const max__rate = allow__bursts ? max__ops : max__ops / interval
	let num__ops = 0
	let start = new Date().getTime()
	const queue = []
	function rate_limit(fn) {
		let rate = 0
		const now = new Date().getTime()
		const elapsed = now - start
		if (elapsed > interval) {
			num__ops = 0
			start = now
		}
		rate = num__ops / (allow__bursts ? 1 : elapsed)
		return new Promise(async (resolve, reject) => {
			try {
				if (rate < max__rate) {
					if (queue.length === 0) {
						num__ops += 1
						resolve(await fn())
					} else {
						if (fn) queue.push(async() => resolve(await fn()))
						num__ops += 1
						queue.shift()()
					}
				} else {
					if (fn) queue.push(async() => resolve(await fn()))
					setTimeout(rate_limit, 1 / max__rate)
				}
			} catch (err) {
				reject(err)
			}
		})
	}
	return rate_limit
}

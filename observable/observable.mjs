// From riot.js
function observable(el) {
	/**
	 * Extend the original object or create a new empty one
	 * @type { Object }
	 */
	el = el || {}
	/**
	 * Private variables
	 */
	let callbacks = {}
	const { slice } = Array.prototype
	/**
	 * Public Api
	 */
	// extend the el object adding the observable methods
	Object.defineProperties(el, {
		/**
		 * Listen to the given `event` ands
		 * execute the `callback` each time an event is triggered.
		 * @param	 { String } event - event id
		 * @param	 { Function } fn - callback function
		 * @returns { Object } el
		 */
		on: {
			value(event, fn) {
				if (typeof fn == 'function')
					(callbacks[event] = callbacks[event] || []).push(fn)
				return el
			},
			enumerable: false,
			writable: false,
			configurable: false
		},
		/**
		 * Removes the given `event` listeners
		 * @param		{ String } event - event id
		 * @param		{ Function } fn - callback function
		 * @returns { Object } el
		 */
		off: {
			value(event, fn) {
				if (event == '*' && !fn) callbacks = {}
				else {
					if (fn) {
						const arr = callbacks[event]
						for (let i = 0, cb; cb = arr && arr[i]; ++i) {
							if (cb == fn) arr.splice(i--, 1)
						}
					} else delete callbacks[event]
				}
				return el
			},
			enumerable: false,
			writable: false,
			configurable: false
		},

		/**
		 * Listen to the given `event` and
		 * execute the `callback` at most once
		 * @param		{ String } event - event id
		 * @param		{ Function } fn - callback function
		 * @returns { Object } el
		 */
		one: {
			value(event, fn) {
				function on() {
					el.off(event, on)
					fn.apply(el, arguments)
				}
				return el.on(event, on)
			},
			enumerable: false,
			writable: false,
			configurable: false
		},
		/**
		 * Execute all callback functions that listen to
		 * the given `event`
		 * @param		{ String } event - event id
		 * @returns { Object } el
		 */
		trigger: {
			value(event) {
				// getting the arguments
				const arglen = arguments.length - 1
						, args = new Array(arglen)
				let fns, fn, i
				for (i = 0; i < arglen; i++) {
					args[i] = arguments[i + 1] // skip first argument
				}
				fns = slice.call(callbacks[event] || [], 0)
				for (i = 0; fn = fns[i]; ++i) {
					fn.apply(el, args)
				}
				if (callbacks['*'] && event != '*')
					el.trigger.apply(el, ['*', event].concat(args))
				return el
			},
			fire: {
				value() {
					return this.trigger.apply(this, ...arguments)
				}
			},
			enumerable: false,
			writable: false,
			configurable: false
		}
	})
	return el
}
export default observable
export function waitfor(observable__, scope__, timeout=1000) {
	return new Promise((accept, reject) => {
		const id__timeout = setTimeout(() => reject(), timeout)
		observable__.one(scope__, (...args) => {
			clearTimeout(id__timeout)
			accept(...args)
		})
	})
}
/**
 * Browser Route functions
 * @module @ctx-core/route/lib
 * @see {@link http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url}
 */
import { assign } from '@ctx-core/object/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/route/lib.js'
/**
 * Router
 * @typedef router
 * @see {@link http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url}
 */
/**
 * Navigates using router
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...args__route}
 * @returns {module:ctx-core/route/lib~router}
 */
export function navigate(ctx, ...args__route) {
	log(`${logPrefix}|navigate`)
	return ensure__router(ctx).navigate(...args__route)
}
export function ensure__router(ctx, ...options) {
	if (!ctx.router) assign__router(ctx, ...options)
	return ctx.router
}
export function assign__router(ctx, ...options) {
	log(`${logPrefix}|assign__router`)
	ctx.router = _router(...options)
	return ctx
}
/**
 * @see {@link http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url}
 */
export function _router(...options) {
	log(`${logPrefix}|_router`)
	const router = {
		routes: [],
		mode: null,
		root: '/',
		config,
		getFragment,
		clearSlashes,
		add,
		remove,
		flush,
		check,
		listen,
		stop,
		navigate
	}
	return router.config(assign({ mode: 'history' }, ...options))
	function config(options) {
		this.mode =
			options
			&& options.mode
			&& options.mode == 'history'
			&& !!(history.pushState)
			? 'history'
			: 'hash'
		this.root =
			options && options.root
			? `/${this.clearSlashes(options.root)}/`
			: '/'
		return this
	}
	function getFragment() {
		let fragment = ''
		if (this.mode === 'history') {
			fragment =
				this.clearSlashes(decodeURI(location.pathname + location.search))
			fragment =
				fragment.replace(/\?(.*)$/, '')
			fragment =
				this.root != '/'
				? fragment.replace(this.root, '')
				: fragment
		} else {
			const match = window.location.href.match(/#(.*)$/)
			fragment = match ? match[1] : ''
		}
		return this.clearSlashes(fragment)
	}
	function clearSlashes(path) {
		return path.toString().replace(/\/$/, '').replace(/^\//, '')
	}
	function add(re, handler) {
		if (typeof re == 'function') {
			handler = re
			re = ''
		}
		this.routes.push({ re, handler })
		return this
	}
	function remove(param) {
		for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
			if (
				r.handler === param
				|| r.re.toString() === param.toString()
			) {
				this.routes.splice(i, 1)
				return this
			}
		}
		return this
	}
	function flush() {
		this.routes = []
		this.mode = null
		this.root = '/'
		return this
	}
	function check(f) {
		const fragment = f || this.getFragment()
		for (let i = 0; i < this.routes.length; i++) {
			const match = fragment.match(this.routes[i].re)
			if (match) {
				match.shift()
				this.routes[i].handler.apply({}, match)
				return this
			}
		}
		return this
	}
	function listen() {
		let current = this.getFragment()
		this.check(current)
		this.stop()
		this.interval = setInterval(() => {
			if (current !== this.getFragment()) {
				current = this.getFragment()
				this.check(current)
			}
		}, 50)
		return this
	}
	function stop() {
		clearInterval(this.interval)
	}
	function navigate(path, title, shouldReplace) {
		path = path ? path : ''
		if (this.mode === 'history') {
			const args__state =
				[null,
					title,
					this.root + this.clearSlashes(path)]
			if (shouldReplace) {
				history.replaceState(...args__state)
			} else {
				history.pushState(...args__state)
			}
		} else {
			window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`
		}
		return this
	}
}
function _query(string__query) {
	if (!string__query) return {}
	const statements = string__query.replace('?', '&').split('&')
	let query = {}
	for (let i = 0; i < statements.length; i++) {
		const statement = statements[i]
		if (!statement) continue
		const [key, value] = statement.split('=')
		query[decodeURIComponent(key)] = decodeURIComponent(value)
	}
	return query
}
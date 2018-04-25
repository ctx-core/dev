const { _browser__rollup
			, _node__rollup
			, _plugins__node
			, _plugins__browser
			} = require('ctx-core/rollup/lib.js')
		, svelte__plugin = require('rollup-plugin-svelte')
module.exports = {
	_browser__rollup__svelte,
	_plugins__browser__svelte,
	_node__rollup__svelte,
	_plugins__node__svelte
}
function _browser__rollup__svelte() {
	const browser__rollup =
					_browser__rollup({
						plugins: _plugins__browser__svelte()
					}, ...arguments)
	browser__rollup.output.globals = {
		global: 'window'
	}
	return browser__rollup
}
function _plugins__browser__svelte() {
	return [..._plugins__browser(svelte__plugin__browser),
					...arguments]
}
function _node__rollup__svelte() {
	const node__rollup =
					_node__rollup({
						plugins: _plugins__node__svelte()
					}, ...arguments)
	node__rollup.output.sourcemap = true
	return node__rollup
}
function _plugins__node__svelte() {
	return [..._plugins__node(svelte__plugin__ssr),
					...arguments]
}
function svelte__plugin__browser() {
	return svelte__plugin({
		store: true,
		parser: 'v2'
	})
}
function svelte__plugin__ssr() {
	return svelte__plugin({
		generate: 'ssr',
		css: false,
		store: true,
		parser: 'v2'
	})
}
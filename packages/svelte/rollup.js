const {
	_config__rollup__browser,
	_config__rollup__node,
	_plugins__rollup__node,
	_plugins__rollup__browser
} = require('@ctx-core/rollup/lib.js')
const svelte__plugin = require('rollup-plugin-svelte')
module.exports = {
	_config__rollup__browser__svelte,
	_plugins__browser__svelte,
	_config__rollup__node__svelte,
	_plugins__node__svelte
}
function _config__rollup__browser__svelte() {
	const config__rollup__browser =
		_config__rollup__browser({
			plugins: _plugins__browser__svelte()
		}, ...arguments)
	config__rollup__browser.output.globals = {
		global: 'window'
	}
	return config__rollup__browser
}
function _plugins__browser__svelte() {
	return [
		..._plugins__rollup__browser(svelte__plugin__browser),
		...arguments
	]
}
function _config__rollup__node__svelte() {
	const config__rollup__node =
		_config__rollup__node({
			plugins: _plugins__node__svelte()
		}, ...arguments)
	config__rollup__node.output.sourcemap = true
	return config__rollup__node
}
function _plugins__node__svelte() {
	return [
		..._plugins__rollup__node(svelte__plugin__ssr),
		...arguments
	]
}
function svelte__plugin__browser() {
	return svelte__plugin({
		// v3 behavior. See https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md#260
		skipIntroByDefault: true,
		// TODO: Set to true when https://github.com/sveltejs/svelte/issues/1660 is fixed
		nestedTransitions: false
	})
}
function svelte__plugin__ssr() {
	return svelte__plugin({
		generate: 'ssr',
		css: false,
		// v3 behavior. See https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md#260
		skipIntroByDefault: true,
		// TODO: Set to true when https://github.com/sveltejs/svelte/issues/1660 is fixed
		nestedTransitions: false
	})
}
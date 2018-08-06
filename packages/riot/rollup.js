const {
	_config__rollup__browser,
	_config__rollup__node,
	_plugins__rollup__node,
	_plugins__rollup__browser
} = require('@ctx-core/rollup/lib.js')
const riot__plugin = require('rollup-plugin-riot')
module.exports = {
	_browser__rollup__riot,
	_plugins__browser__riot,
	_node__rollup__riot,
	_plugins__node__riot
}
function _browser__rollup__riot() {
	const config__rollup__browser =
		_config__rollup__browser({
			plugins: _plugins__browser__riot()
		}, ...arguments)
	config__rollup__browser.output.globals = {
		global: 'window',
		riot: 'riot'
	}
	return config__rollup__browser
}
function _plugins__browser__riot() {
	return [..._plugins__rollup__browser(riot__plugin), ...arguments]
}
function _node__rollup__riot() {
	return _config__rollup__node({
		plugins: _plugins__node__riot()
	}, ...arguments)
}
function _plugins__node__riot() {
	return [riot__plugin(), ..._plugins__rollup__node(), ...arguments]
}
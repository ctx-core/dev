const { _browser__rollup
      , _node__rollup
      , _plugins__node
      , _plugins__browser} = require('ctx-core/rollup/lib.js')
    , riot__plugin = require('rollup-plugin-riot')
module.exports = {
  _browser__rollup__riot,
  _plugins__browser__riot,
  _node__rollup__riot,
  _plugins__node__riot
}
function _browser__rollup__riot() {
  const browser__rollup =
          _browser__rollup({
            plugins: _plugins__browser__riot()
          }, ...arguments)
  browser__rollup.output.globals = {
    global: 'window',
    riot: 'riot'
  }
  return browser__rollup
}
function _plugins__browser__riot() {
  return [..._plugins__browser(riot__plugin), ...arguments]
}
function _node__rollup__riot() {
  return _node__rollup({
    plugins: _plugins__node__riot()
  }, ...arguments)
}
function _plugins__node__riot() {
  return [riot__plugin(), ..._plugins__node(), ...arguments]
}
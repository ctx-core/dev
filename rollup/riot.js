var $plugins__node = require('ctx-core/rollup/lib').$plugins__node
  , $plugins__browser = require('ctx-core/rollup/lib').$plugins__browser
  , riot__rollup = require('rollup-plugin-riot')
module.exports = {
  $plugins__browser__riot,
  $plugins__node__riot
}
function $plugins__browser__riot() {
  return [riot__rollup(), ...$plugins__browser(), ...arguments]
}
function $plugins__node__riot() {
  return [riot__rollup(), ...$plugins__node(), ...arguments]
}
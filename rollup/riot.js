const { $browser__rollup
      , $node__rollup
      , $plugins__node
      , $plugins__browser} = require('ctx-core/rollup/lib')
    , riot__rollup = require('rollup-plugin-riot')
require('ctx-core/riot/ecmascript-6')
module.exports = {
  $browser__rollup__riot,
  $plugins__browser__riot,
  $node__rollup__riot,
  $plugins__node__riot
}
function $browser__rollup__riot() {
  return $browser__rollup({
    globals: {
      global: 'window',
      riot: 'riot'
    },
    plugins: $plugins__browser__riot()
  }, ...arguments)
}
function $plugins__browser__riot() {
  return [riot__rollup(), ...$plugins__browser(), ...arguments]
}
function $node__rollup__riot() {
  return $node__rollup({
    plugins: $plugins__node__riot()
  }, ...arguments)
}
function $plugins__node__riot() {
  return [riot__rollup(), ...$plugins__node(), ...arguments]
}
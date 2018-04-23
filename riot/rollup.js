const { $browser__rollup
      , $node__rollup
      , $plugins__node
      , $plugins__browser} = require('ctx-core/rollup/lib.js')
    , riot__plugin = require('rollup-plugin-riot')
module.exports = {
  $browser__rollup__riot,
  $plugins__browser__riot,
  $node__rollup__riot,
  $plugins__node__riot
}
function $browser__rollup__riot() {
  const browser__rollup =
          $browser__rollup({
            plugins: $plugins__browser__riot()
          }, ...arguments)
  browser__rollup.output.globals = {
    global: 'window',
    riot: 'riot'
  }
  return browser__rollup
}
function $plugins__browser__riot() {
  return [...$plugins__browser(riot__plugin), ...arguments]
}
function $node__rollup__riot() {
  return $node__rollup({
    plugins: $plugins__node__riot()
  }, ...arguments)
}
function $plugins__node__riot() {
  return [riot__plugin(), ...$plugins__node(), ...arguments]
}
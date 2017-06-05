const { $browser__rollup
      , $node__rollup
      , $plugins__node
      , $plugins__browser} = require('ctx-core/rollup/lib')
    , svelte__plugin = require('rollup-plugin-svelte')
module.exports = {
  $browser__rollup__svelte,
  $plugins__browser__svelte,
  $node__rollup__svelte,
  $plugins__node__svelte
}
function $browser__rollup__svelte() {
  return $browser__rollup({
    globals: {
      global: 'window'
    },
    plugins: $plugins__browser__svelte()
  }, ...arguments)
}
function $plugins__browser__svelte() {
  return [svelte__plugin(), ...$plugins__browser(), ...arguments]
}
function $node__rollup__svelte() {
  return $node__rollup({
    sourceMap: true,
    plugins: $plugins__node__svelte()
  }, ...arguments)
}
function $plugins__node__svelte() {
  return  [
            svelte__plugin({
              generate: 'ssr',
              css: false
            }),
            ...$plugins__node(),
            ...arguments]
}
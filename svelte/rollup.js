const { $browser__rollup
      , $node__rollup
      , $plugins__node
      , $plugins__browser
      } = require('ctx-core/rollup/lib.js')
    , svelte__plugin = require('rollup-plugin-svelte')
module.exports = {
  $browser__rollup__svelte,
  $plugins__browser__svelte,
  $node__rollup__svelte,
  $plugins__node__svelte
}
function $browser__rollup__svelte() {
  const browser__rollup =
          $browser__rollup({
            plugins: $plugins__browser__svelte()
          }, ...arguments)
  browser__rollup.output.globals = {
    global: 'window'
  }
  return browser__rollup
}
function $plugins__browser__svelte() {
  return [...$plugins__browser(svelte__plugin__browser),
          ...arguments]
}
function $node__rollup__svelte() {
  const node__rollup =
          $node__rollup({
            plugins: $plugins__node__svelte()
          }, ...arguments)
  node__rollup.output.sourcemap = true
  return node__rollup
}
function $plugins__node__svelte() {
  return [...$plugins__node(svelte__plugin__ssr),
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
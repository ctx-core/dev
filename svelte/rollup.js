const {$node__rollup} = require('ctx-core/rollup/lib')
    , json__plugin = require('rollup-plugin-json')
    , buble__plugin = require('rollup-plugin-buble')
    , svelte__plugin = require('rollup-plugin-svelte')
    , resolve__plugin = require('rollup-plugin-node-resolve')
    , nodent__plugin = require('ctx-core/nodent/rollup')
module.exports = {
  $svelte__rollup
}
function $svelte__rollup() {
  return $node__rollup({
    sourceMap: true,
    plugins: [
      svelte__plugin({
        generate: 'ssr',
        css: false
      }),
      resolve__plugin(),
      json__plugin(),
      nodent__plugin(),
      buble__plugin()
    ]
  }, ...arguments)
}
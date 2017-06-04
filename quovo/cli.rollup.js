const {$node__rollup} = require('ctx-core/rollup/lib')
module.exports = $node__rollup({
  entry: 'quovo/cli.js',
  dest: 'private/dist/quovo-cli.js',
  banner: '#!/usr/bin/env node',
  sourceMap: true
})
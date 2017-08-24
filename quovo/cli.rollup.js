const {$node__rollup} = require('ctx-core/rollup/lib')
module.exports = $node__rollup({
  input: 'quovo/cli.js',
  output: {
    file: 'private/dist/quovo-cli.js'
  },
  banner: '#!/usr/bin/env node',
  sourcemap: true
})
const {$node__rollup} = require('ctx-core/rollup/lib.js')
module.exports = $node__rollup({
  input: 'ctx-core/quovo/cli.mjs',
  output: {
    file: 'private/dist/quovo-cli.js',
    banner: '#!/usr/bin/env node',
    sourcemap: true
  },
})
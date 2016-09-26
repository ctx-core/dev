var $node__rollup = require('ctx-core/rollup/lib').$node__rollup
module.exports = $node__rollup({
  entry: 'quovo/cli.js',
  dest: 'private/dist/quovo-cli.js',
  banner: '#!/usr/bin/env node',
  sourceMap: true
})
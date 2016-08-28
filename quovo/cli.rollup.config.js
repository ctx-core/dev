var new__node__config__rollup = require('ctx-core/rollup/lib').new__node__config__rollup
module.exports = new__node__config__rollup({
  entry: 'quovo/cli.js',
  dest: 'private/dist/quovo-cli.js',
  banner: '#!/usr/bin/env node',
  sourceMap: true
})
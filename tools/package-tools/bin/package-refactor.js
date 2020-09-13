#!/usr/bin/env node
require = require('esm')(module);
const { package_refactor } = require('../package_refactor');
package_refactor().then();

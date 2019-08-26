'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('svelte/store');
var store$1 = require('@ctx-core/store');

const __ctx__store__global = store.writable(typeof window === 'undefined' ? null : window);
store$1.subscribe(__ctx__store__global, __ => exports.ctx__store__global = __);

exports.__ctx__store__global = __ctx__store__global;

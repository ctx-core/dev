'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('svelte/store');
var object = require('@ctx-core/object');
var _function = require('@ctx-core/function');
var uuid = require('@ctx-core/uuid');

const __page__sapper = store.writable(null);
const __preloading__sapper = store.writable(null);
const __session__sapper = store.writable(null);
const __path__sapper = store.derived(__page__sapper, _function._andand('path'));
function touch__session(session) {
    session.update($session => $session ? object.clone($session) : uuid._uuid());
}

exports.__page__sapper = __page__sapper;
exports.__path__sapper = __path__sapper;
exports.__preloading__sapper = __preloading__sapper;
exports.__session__sapper = __session__sapper;
exports.touch__session = touch__session;

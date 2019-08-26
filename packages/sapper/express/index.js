'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var util = require('util');
var array = require('@ctx-core/array');
var fs = _interopDefault(require('fs'));

const resolve = util.promisify(require('resolve'));
const readFile = util.promisify(fs.readFile);
function _get__asset(opts = {}) {
    const { key__asset, dir__root } = opts;
    return get__asset;
    async function get__asset(_, res) {
        const dir__build = process.env.NODE_ENV === 'development'
            ? `${dir__root}/__sapper__/dev`
            : `${dir__root}/__sapper__/build`;
        const path__build = await resolve(`${dir__build}/build.json`);
        const build = JSON.parse((await readFile(path__build)).toString());
        const { assets } = build;
        const str__path__relative = assets[key__asset];
        const a1__path__relative = array.flatten([str__path__relative]);
        res.writeHead(200, {
            'Content-Type': 'application/javascript',
        });
        const body = await _body();
        res.end(body);
        async function _body() {
            const a1__body__asset = await Promise.all(_a1__promise__body__asset());
            return a1__body__asset.join('\n');
        }
        function _a1__promise__body__asset() {
            const a1__promise = [];
            for (let i = 0; i < a1__path__relative.length; i++) {
                a1__promise.push(_body__asset(a1__path__relative[i]));
            }
            return a1__promise;
        }
        async function _body__asset(path__relative) {
            const path__resolved = await resolve(`${dir__build}/client/${path__relative}`);
            return readFile(path__resolved);
        }
    }
}

exports._get__asset = _get__asset;

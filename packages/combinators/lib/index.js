'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @see {@link https://gist.github.com/Avaq/1f0636ec5c8d6aed2e45}
 */
const I = x => x;
const K = x => _ => x;
const A = f => x => f(x);
const T = x => f => f(x);
const W = f => x => f(x)(x);
const C = f => y => x => f(x)(y);
const B = f => g => x => f(g(x));
const S = f => g => x => f(x)(g(x));
const P = f => g => x => y => f(g(x))(g(y));
const Y = f => (g => g(g))(g => f(x => g(g)(x)));
function I__(x, ..._) {
    return x;
}

exports.A = A;
exports.B = B;
exports.C = C;
exports.I = I;
exports.I__ = I__;
exports.K = K;
exports.P = P;
exports.S = S;
exports.T = T;
exports.W = W;
exports.Y = Y;

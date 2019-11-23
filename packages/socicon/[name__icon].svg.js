import { _get as _get__svg } from '@ctx-core/svg/[name__icon].svg';
import { join } from 'path';
import { promisify } from 'util';
const resolve = promisify(require('resolve'));
export function _get(opts = {}) {
    const { fn } = opts;
    return _get__svg({
        fn,
        resolve: opts.resolve
            || (name__icon => resolve(join('@ctx-core/socicon/ui', `Socicon-${name__icon}.html`)))
    });
}
export const get = _get();

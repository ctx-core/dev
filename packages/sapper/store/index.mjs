import { writable, derived } from 'svelte/store';
import { clone } from '@ctx-core/object';
import { _andand } from '@ctx-core/function';
import { _uuid } from '@ctx-core/uuid';

const __page__sapper = writable(null);
const __preloading__sapper = writable(null);
const __session__sapper = writable(null);
const __path__sapper = derived(__page__sapper, _andand('path'));
function touch__session(session) {
    session.update($session => $session ? clone($session) : _uuid());
}

export { __page__sapper, __path__sapper, __preloading__sapper, __session__sapper, touch__session };

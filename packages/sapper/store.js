import { writable, derived, get } from 'svelte/store'
import { clone } from '@ctx-core/object'
import { _andand } from '@ctx-core/function'
import { _uuid } from '@ctx-core/uuid'
export const __page__sapper = writable()
export const __preloading__sapper = writable()
export const __session__sapper = writable()
export const __path__sapper =
	derived(__page__sapper,
		_andand('path'))
export function touch__session(session) {
	const $session = get(session)
	session.update($session => $session ? clone($session) : _uuid())
}
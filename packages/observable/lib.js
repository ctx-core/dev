import { assign, keys } from '@ctx-core/object'
import { log, debug } from '@ctx-core/logger'
export function _assign__offs(obj, key = '_') {
	if (!obj.offs) obj.offs = {}
	const { offs } = obj
	if (!offs[key]) offs[key] = []
	return {
		push,
		on,
		bind,
		change,
		set,
		observe,
		subject
	}
	function push() {
		offs[key].push(...arguments)
		return this
	}
	function on() {
		offs[key].push(call__on__return__$off(...arguments))
		return this
	}
	function bind(observable, fn) {
		fn(observable.ctx || observable)
		return this.change(observable, fn)
	}
	function change(observable, fn) {
		offs[key].push(call__on__return__$off(observable, 'change', fn))
		return this
	}
	function set(observable, fn) {
		offs[key].push(call__on__return__$off(observable, 'set', fn))
		return this
	}
	function observe(observable, name__property, fn) {
		offs[key].push(call__observe__return__$off(observable, name__property, fn))
		return this
	}
	function subject(observable, fn) {
		const assign__offs =
			assign(
				_assign__offs(obj),
				{
					on: on__,
					bind: bind__,
					change: change__,
					set: set__
				})
		fn(assign__offs)
		return this
		function on__() {
			offs[key].push(call__on__return__$off(observable, ...arguments))
			return this
		}
		function bind__(fn) {
			bind(observable, fn)
			return this
		}
		function change__(fn) {
			change(observable, fn)
			return this
		}
		function set__(fn) {
			set(observable, fn)
			return this
		}
	}
}
export function call__offs(obj, ...a1__key) {
	if (!obj.offs) obj.offs = {}
	const { offs } = obj
	if (!a1__key.length) {
		a1__key = keys(offs)
	}
	for (let i = 0; i < a1__key.length; i++) {
		const key = a1__key[i]
			, offs__ = offs[key]
		for (let i = 0; i < offs__.length; i++) {
			const off = offs__[i]
			off()
		}
		delete offs[key]
	}
	return offs
}
export function call__on__return__$off(obj, name__event, fn) {
	const observation = obj.on(name__event, fn)
	return () => {
		if (observation && observation.cancel) return observation.cancel()
		if (obj.off) return obj.off(name__event, fn)
	}
}
export function call__observe__return__$off(obj, name__property, fn) {
	const observer = obj.observe(name__property, fn)
	return () => {
		observer.cancel()
	}
}
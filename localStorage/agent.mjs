import {log,warn,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/localStorage/agent.mjs'
export function _ctx__set__json__from__localStorage(scope__) {
	log(`${logPrefix}|_ctx__set__json__from__localStorage`)
	const json = localStorage.getItem(scope__)
			, ctx__set = {}
	if (json) {
		try {
			ctx__set[scope__] = JSON.parse(json)
		} catch(e) {
			warn(`${logPrefix}|_ctx__set__json__from__localStorage|error|JSON.parse`)
			warn(e)
		}
	}
	return ctx__set
}
export function store__json__localStorage(ctx, scope__) {
	log(`${logPrefix}|store__json__localStorage`, scope__)
	const value = ctx[scope__]
	if (value == null) {
		localStorage.removeItem(scope__)
	} else {
		localStorage.setItem(scope__, JSON.stringify(value))
	}
	return ctx
}
export function _ctx__set__from__localStorage(scope__) {
	log(`${logPrefix}|_ctx__set__from__localStorage`, scope__)
	const text = localStorage.getItem(scope__)
			, ctx__set = {}
	if (text) {
		ctx__set[scope__] = text
	}
	return ctx__set
}
export function store__localStorage(ctx, scope__) {
	log(`${logPrefix}|store__localStorage`, scope__)
	const value = ctx[scope__]
	if (value == null) {
		localStorage.removeItem(scope__)
	} else {
		localStorage.setItem(scope__, value)
	}
	return ctx
}
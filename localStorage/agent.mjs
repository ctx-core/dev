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
export function sync__json__localStorage(key, value) {
	log(`${logPrefix}|sync__json__localStorage`, key)
	if (value == null) {
		localStorage.removeItem(key)
	} else {
		localStorage.setItem(key, JSON.stringify(value))
	}
	return value
}
export const store__json__localStorage = sync__json__localStorage
export function _ctx__set__from__localStorage(scope__) {
	log(`${logPrefix}|_ctx__set__from__localStorage`, scope__)
	const text = localStorage.getItem(scope__)
			, ctx__set = {}
	if (text) {
		ctx__set[scope__] = text
	}
	return ctx__set
}
export function sync__localStorage(key, value) {
	log(`${logPrefix}|sync__localStorage`, key)
	if (value == null) {
		localStorage.removeItem(key)
	} else {
		localStorage.setItem(key, value)
	}
	return value
}
export const store__localStorage = sync__localStorage
import {get__cookie
			, set__cookie
			, remove__cookie} from 'ctx-core/cookie/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/cookie/agent.mjs'
export function init__cookie__agent(agent, scope__) {
	log(`${logPrefix}|init__cookie__agent`, scope__)
	const json = get__cookie(scope__)
	if (json) {
		let value = {}
		value[scope__] = JSON.parse(json)
		agent.set(value)
	}
	return agent
}
export function store__cookie__agent(agent, scope__, opts={}) {
	log(`${logPrefix}|store__cookie__agent`, scope__)
	const { ctx } = agent
			, { store } = ctx
			, value = store.get()[scope__]
	if (value) {
		set__cookie(scope__, JSON.stringify(value), opts)
	} else {
		remove__cookie(scope__, opts)
	}
	return agent
}
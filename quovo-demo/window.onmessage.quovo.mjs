const logPrefix = 'ctx-core/quovo-demo/window.onmessage.quovo.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
let onmessage2
if (window.onmessage) {
	onmessage2 = window.onmessage
} else {
	onmessage2 = e => e
}
window.onmessage = function (e) {
	log(`${logPrefix}|onmessage`, e)
	return onmessage2(e)
}
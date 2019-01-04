import { assign } from '@ctx-core/object/lib.js'
import env from '@ctx-core/fetch/env.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/fetch/polyfill.html.js'
export function polyfill__fetch() {
	log(`${logPrefix}|polyfill__fetch`)
	const ctx__ =
		assign({
			js: [],
			indentation: '',
			FETCH_URL: env.FETCH_URL
		}, ...arguments)
	return `<script type="text/javascript" src="${ctx__.FETCH_URL}"></script>`
}
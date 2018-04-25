import env from 'ctx-core/quovo/env.mjs'
import {assign,keys} from 'ctx-core/object/lib.mjs'
import _html__layout from 'ctx-core/layout/html.mjs'
import {_indentation,_regexp__indentation} from 'ctx-core/string/indendation.mjs'
import {_html__js} from 'ctx-core/html/lib.mjs'
import {_versioned
			, _versioned__js
			, _ctx__html__core} from 'ctx-core/html/node.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo-demo/html.mjs'
export function quovo_demo__html(ctx, ...ctx$rest$$) {
	return _html__layout(ctx, {
		title: 'quovo demo',
		body: _body__quovo_demo(ctx),
		css: [_versioned('/dist/quovo-demo.css')]
	}, ...ctx$rest$$)
}
export function _body__quovo_demo(ctx) {
	const ctx__ = assign({
					js: _js__html__files(ctx)
				}, ...arguments)
			, _ctx__html = ctx__._ctx__html || _ctx__html__core
			, ctx__html = _ctx__html(ctx__, {
					CENSIBLE_API_URL: env.CENSIBLE_API_URL
				})
	log(`${logPrefix}|$body__quovo_demo`, ctx__.user_id__quovo, keys(ctx__))
	return `
		<body>
			<quovo-demo-page ctx="{opts.ctx}"></quovo-demo-page>
			${_html__js(ctx__, {indentation: _indentation(6), indentFirstLine: false})}
			<script>
				(function() {
					$ctx.mount({
						ctx: ${JSON.stringify(ctx__html)},
						mount: [document.querySelector('quovo-demo-page')]
					})
				})()
			</script>
		</body>`.trim().replace(_regexp__indentation(4), '')
}
export function _js__html__files(opts) {
	const rest = opts.rest || []
	return [
		env.URL__SHIM__CORE_JS,
		env.RIOT_URL,
		_versioned__js('/dist/quovo-demo', opts)
	].concat(...rest)
}
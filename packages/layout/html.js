import { clone } from '@ctx-core/object/lib.js'
import { _indentation, _regexp__indentation } from '@ctx-core/string/indendation.js'
import { _attrs, _html__links } from '@ctx-core/html/lib.js'
import { polyfill__fetch } from '@ctx-core/fetch/polyfill.html.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/layout/html.js'
/**
 * Returns the html layout & content
 * @returns {string} html layout & content
 * @deprecated Use svelte components instead
 */
export default function _html__layout() {
	log(`${logPrefix}|$html__layout`)
	const ctx = clone(...arguments)
	const { attrs__html = {} } = ctx
	const _prefix__head =
		ctx._prefix__head
		|| (() => {})
	const _meta__head =
		ctx._meta__head
		|| (() => {})
	const _suffix__head =
		ctx._suffix__head
		|| (() => {})
	const _head =
		ctx._head
		|| _head__
	const body =
		ctx.body
		|| ctx._body && ctx._body(ctx)
		|| ''
	if (!attrs__html.lang) attrs__html.lang = 'en'
	return `
		<!DOCTYPE html>
		<html ${_attrs(attrs__html)}>
			${_head(ctx)}
			${body}
		</html>`.replace(_regexp__indentation(4), '')
	function _head__() {
		return `
			<head>
				${_prefix__head(ctx) || ''}
				<title>${$title}</title>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				${_meta__head(ctx) || ''}
				${_html__links(ctx, { indentation: _indentation(4), indentFirstLine: false })}
				${polyfill__fetch(ctx)}
				${_suffix__head(ctx) || ''}
			</head>`.trim().replace(_regexp__indentation(4), '')
	}
}
/**
 *
 * @type {_html__layout}
 * @deprecated
 */
export const html_layout = _html__layout
export function _html__script__load(ctx__load, components__load) {
	return `
		<script>
			(function() {
				var ctx = window.ctx || {}
				window.ctx = ctx
				Object.assign(ctx, ${JSON.stringify(ctx__load || {})})
				$ctx.mount({
					ctx: ctx,
					components: ${JSON.stringify(components__load)}
				})
			})()
		</script>
	`.trim().replace(_regexp__indentation(4), '')
}
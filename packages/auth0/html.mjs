import { _regexp__indentation } from '@ctx-core/string/indendation.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/html.mjs'
export function _html__script__auth(ctx) {
	return `
		<script>
			(function() {
				var location = window.location
					, search = location.search
					, values__search = _values(search.substr(1))
					, hash = location.hash
					, token__auth0 = _values(hash.substr(1))
					, json__token__auth0 = JSON.stringify(token__auth0)
					, url__redirect =
							values__search
							&& values__search.url__redirect
				localStorage.setItem('json__token__auth0', json__token__auth0)
				if (url__redirect) {
					location.href = url__redirect
				}
				function _values(string) {
					var segments = string.split('&')
						, values = {}
					for (var i=0; i < segments.length; i++) {
						var pair = segments[i].split('=')
							, key = decodeURIComponent(pair[0])
							, value = decodeURIComponent(pair[1])
						values[key] = value
					}
					return values
				}
			})()
		</script>
	`.trim().replace(_regexp__indentation(4), '')
}
export function _html__script__auth() {
	return `
<script>
	(function() {
		var location = window.location
		var search = location.search
		var values__search = _values(search.substr(1))
		var hash = location.hash
		var token__auth0 = _values(hash.substr(1))
		var json__token__auth0 = JSON.stringify(token__auth0)
		var url__redirect =
					values__search
					&& values__search.url__redirect
		localStorage.setItem('json__token__auth0', json__token__auth0)
		if (url__redirect) {
			location.href = url__redirect
		}
		function _values(string) {
			var segments = string.split('&')
			var values = {}
			for (var i=0; i < segments.length; i++) {
				var pair = segments[i].split('=')
				var key = decodeURIComponent(pair[0])
				var value = decodeURIComponent(pair[1])
				values[key] = value
			}
			return values
		}
	})()
</script>
	`.trim()
}
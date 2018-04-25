<quovo-user-details class="{loading: !ctx.user__quovo}">
	<quovo-user-id>
		<label>id</label>
		<x-value>{$ctx('user__quovo.id')}</x-value>
	</quovo-user-id>
	<quovo-user-username>
		<label>username</label>
		<x-value>{$ctx('user__quovo.username')}</x-value>
	</quovo-user-username>
	<quovo-user-email>
		<label>email</label>
		<x-value><a href="mailto:${$ctx('user__quovo.email')}">{$ctx('user__quovo.email')}</a></x-value>
	</quovo-user-email>
	<quovo-user-value>
		<label>value</label>
		<x-value>{format__currency($ctx('user__quovo.value'))}</x-value>
	</quovo-user-value>
	<script>
		import {init} from 'ctx-core/quovo/quovo-user-details.mjs'
		init(this)
	</script>
</quovo-user-details>
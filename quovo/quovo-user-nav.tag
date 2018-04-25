<quovo-user-nav class="quovo-nav">
	<title>User</title>
	<div class="{loading: !ctx.user__quovo}">
		<a
			href="{path__user__quovo(ctx)}"
			class="dashboard selected-maybe {selected: ctx.route === 'user__quovo'}"
			onclick="{__click__navigate}">
			<quovo-user>
				<quovo-user-id>{$ctx('user__quovo.id')}</quovo-user-id>
				<quovo-user-username>{$ctx('user__quovo.username')}</quovo-user-username>
				<quovo-user-email>{$ctx('user__quovo.email')}</quovo-user-email>
				<quovo-user-value>{format__currency($ctx('user__quovo.value'))}</quovo-user-value>
			</quovo-user>
		</a>
		<a
			href="{path__sync__user__quovo(ctx)}"
			class="sync {
				selected-maybe: true,
				selected: ctx.route === 'sync__user__quovo'}"
			onclick="{__click__navigate}">Sync Account(s)</a>
		<quovo-user-accounts ctx="{opts.ctx}"></quovo-user-accounts>
	</div>
	<script>
		import {init} from 'ctx-core/quovo/quovo-user-nav.mjs'
		init(this)
	</script>
</quovo-user-nav>
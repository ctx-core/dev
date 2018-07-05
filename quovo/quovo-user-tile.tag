<quovo-user-tile
	class="quovo-tile {
		present: ctx.user__quovo && ctx.tile__route__user__quovo,
		quovo-user-details: ctx.route === 'user__quovo' === ',
		quovo-sync-iframe: ctx.route === 'sync__user__quovo',
		quovo-user-account-tile: ctx.tile__route__quovo__account
	}"
>
	<quovo-user-nav class="quovo-nav" ctx="{opts.ctx}"></quovo-user-nav>
	<div>
		<quovo-user-details ctx="{opts.ctx}"></quovo-user-details>
		<quovo-sync-iframe ctx="{opts.ctx}"></quovo-sync-iframe>
		<quovo-user-account-tile ctx="{opts.ctx}"></quovo-user-account-tile>
	</div>
	<script>
		import { init } from 'ctx-core/quovo/quovo-user-tile.mjs'
		init(this)
	</script>
</quovo-user-tile>
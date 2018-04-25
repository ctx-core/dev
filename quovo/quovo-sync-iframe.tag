<quovo-sync-iframe class="{loading: !ctx.url__iframe__quovo}">
	<iframe src="{ctx.url__iframe__quovo}" if="{ctx.url__iframe__quovo}"></iframe>
	<script>
		import {init} from 'ctx-core/quovo/quovo-sync-iframe.mjs'
		init(this)
	</script>
</quovo-sync-iframe>
<quovo-portfolio-tile
	class="quovo-tile {
		quovo-positions: ctx.route === 'portfolio__account__user__quovo',
		quovo-portfolio-history: ctx.route === 'portfolio_history__account__user__quovo'
	}"
>
	<quovo-portfolio-nav class="quovo-nav" ctx="{opts.ctx}"></quovo-portfolio-nav>
	<section>
		<quovo-positions ctx="{opts.ctx}"></quovo-positions>
		<quovo-portfolio-history ctx="{opts.ctx}"></quovo-portfolio-history>
	</section>
	<script>
		import { init } from 'ctx-core/quovo/quovo-portfolio-tile.mjs'
		init(this)
	</script>
</quovo-portfolio-tile>
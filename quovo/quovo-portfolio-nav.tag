<quovo-portfolio-nav class="quovo-nav">
	<title>Portfolio</title>
	<div>
		<a
			href="{path__portfolio__account__user__quovo(ctx)}"
			class="selected-maybe {
				selected: ctx.route === 'portfolio__account__user__quovo'}"
			onclick="{__click__navigate}">Positions</a>
		<a
			href="{path__portfolio_history__account__user__quovo(ctx)}"
			class="selected-maybe {
				selected: ctx.route === 'portfolio_history__account__user__quovo'}"
			onclick="{__click__navigate}"
		>Transaction History</a>
	</div>
	<script></script>
</quovo-portfolio-nav>
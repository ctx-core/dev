<quovo-positions class="{
	loading: !ctx.positions__quovo,
	empty: ctx.positions__quovo && !ctx.positions__quovo.length}"
>
	<x-headers class="{present: $ctx('positions__quovo.length')}">
		<x-market-code>&nbsp;</x-market-code>
		<x-ticker>Ticker</x-ticker>
		<x-ticker-name>Name</x-ticker-name>
		<quovo-position-quantity>Quantity</quovo-position-quantity>
		<quovo-position-value>Value</quovo-position-value>
		<quovo-security-type>Security Type</quovo-security-type>
		<quovo-asset-class>Asset Class</quovo-asset-class>
	</x-headers>
	<quovo-position
		each="{position__quovo in (ctx.portfolio__positions__quovo || ctx.positions__quovo)}"
	>
		<x-market-code title="{position__quovo.market_code}">{position__quovo.market_code || ' '}</x-market-code>
		<x-ticker title="{position__quovo.ticker}">{position__quovo.ticker}</x-ticker>
		<x-ticker-name title="{position__quovo.ticker_name}">{position__quovo.ticker_name}</x-ticker-name>
		<quovo-position-quantity title="{position__quovo.quantity}">{position__quovo.quantity}</quovo-position-quantity>
		<quovo-position-value title="{format__currency(position__quovo.value)}">
			{format__currency(position__quovo.value)}
		</quovo-position-value>
		<quovo-security-type title="{position__quovo.security_type}">{position__quovo.security_type}</quovo-security-type>
		<quovo-asset-class title="{position__quovo.asset_class}">{position__quovo.asset_class}</quovo-asset-class>
	</quovo-position>
	<script>
		import {init} from 'ctx-core/quovo/quovo-positions.mjs'
		init(this)
	</script>
</quovo-positions>
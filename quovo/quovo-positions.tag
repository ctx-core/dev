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
    each="{quovo$position in (ctx.portfolio__positions__quovo || ctx.positions__quovo)}"
  >
    <x-market-code title="{quovo$position.market_code}">{quovo$position.market_code || ' '}</x-market-code>
    <x-ticker title="{quovo$position.ticker}">{quovo$position.ticker}</x-ticker>
    <x-ticker-name title="{quovo$position.ticker_name}">{quovo$position.ticker_name}</x-ticker-name>
    <quovo-position-quantity title="{quovo$position.quantity}">{quovo$position.quantity}</quovo-position-quantity>
    <quovo-position-value title="{$format__currency({amount: quovo$position.value})}">
      {$format__currency({amount: quovo$position.value})}
    </quovo-position-value>
    <quovo-security-type title="{quovo$position.security_type}">{quovo$position.security_type}</quovo-security-type>
    <quovo-asset-class title="{quovo$position.asset_class}">{quovo$position.asset_class}</quovo-asset-class>
  </quovo-position>
  <script type="text/ecmascript-6">
    import {init} from 'ctx-core/quovo/quovo-positions'
    init(this)
  </script>
</quovo-positions>
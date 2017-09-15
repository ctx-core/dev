<quovo-portfolio-history class="{
  loading: !ctx.portfolio_history__quovo,
  empty:
    ctx.portfolio_history__quovo
    && !ctx.portfolio_history__quovo.length}"
>
  <x-headers class="{present: $ctx('portfolio_history__quovo.length')}">
    <x-date>Date</x-date>
    <quovo-tran-type>Tran Type</quovo-tran-type>
    <x-market-code></x-market-code>
    <x-ticker>Ticker</x-ticker>
    <x-ticker-name>Name</x-ticker-name>
    <quovo-portfolio-history-quantity>Quantity</quovo-portfolio-history-quantity>
    <quovo-portfolio-history-value>Value</quovo-portfolio-history-value>
  </x-headers>
  <quovo-position
    each="{quovo$position in ctx.portfolio_history__quovo}">
    <x-date title="{quovo$position.date}">{quovo$position.date}</x-date>
    <quovo-tran-type title="{tran_type$map[quovo$position.tran_type]}">{tran_type$map[quovo$position.tran_type]}</quovo-tran-type>
    <x-market-code title="{quovo$position.market_code}">{quovo$position.market_code}</x-market-code>
    <x-ticker title="{quovo$position.ticker}">{quovo$position.ticker}</x-ticker>
    <x-ticker-name title="{quovo$position.ticker_name}">{quovo$position.ticker_name}</x-ticker-name>
    <quovo-portfolio-history-quantity title="{quovo$position.quantity}">{quovo$position.quantity}</quovo-portfolio-history-quantity>
    <quovo-portfolio-history-value title="{format__currency(quovo$position.value)}">
      {format__currency(quovo$position.value)}
    </quovo-portfolio-history-value>
  </quovo-position>
  <script type="buble">
    import {init} from 'ctx-core/quovo/quovo-portfolio-history.mjs'
    init(this)
  </script>
</quovo-portfolio-history>
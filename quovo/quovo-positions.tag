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
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {positions__quovo__agent
          , portfolio__positions__quovo__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {$format__currency})
        , logPrefix = 'ctx-core/quovo/quovo-positions.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    positions__quovo__agent(ctx)
    portfolio__positions__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.positions__quovo__agent.pick__on({on$change__positions__quovo})
      ctx.portfolio__positions__quovo__agent.pick__on({on$change__portfolio__positions__quovo})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.positions__quovo__agent.pick__off({on$change__positions__quovo})
      ctx.portfolio__positions__quovo__agent.pick__off({on$change__portfolio__positions__quovo})
    }
    function on$change__positions__quovo() {
      log(`${logPrefix}|on$change__positions__quovo`)
      tag.update__ctx()
    }
    function on$change__portfolio__positions__quovo() {
      log(`${logPrefix}|on$change__portfolio__positions__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-positions>
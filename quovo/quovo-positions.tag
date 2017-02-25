<quovo-positions class="{
  loading: !ctx.quovo__positions,
  empty: ctx.quovo__positions && !ctx.quovo__positions.length}"
>
  <x-headers class="{present: $ctx('quovo__positions.length')}">
    <x-market-code>&nbsp;</x-market-code>
    <x-ticker>Ticker</x-ticker>
    <x-ticker-name>Name</x-ticker-name>
    <quovo-position-quantity>Quantity</quovo-position-quantity>
    <quovo-position-value>Value</quovo-position-value>
    <quovo-security-type>Security Type</quovo-security-type>
    <quovo-asset-class>Asset Class</quovo-asset-class>
  </x-headers>
  <quovo-position
    each="{quovo$position in (ctx.quovo__portfolio__positions || ctx.quovo__positions)}"
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
    import {quovo__positions__agent
          , quovo__portfolio__positions__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {$format__currency})
        , logPrefix = 'ctx-core/quovo/quovo-positions.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    quovo__positions__agent(ctx)
    quovo__portfolio__positions__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__positions__agent.pick__on({on$change__quovo__positions})
      ctx.quovo__portfolio__positions__agent.pick__on({on$change__quovo__portfolio__positions})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__positions__agent.pick__off({on$change__quovo__positions})
      ctx.quovo__portfolio__positions__agent.pick__off({on$change__quovo__portfolio__positions})
    }
    function on$change__quovo__positions() {
      log(`${logPrefix}|on$change__quovo__positions`)
      tag.update__ctx()
    }
    function on$change__quovo__portfolio__positions() {
      log(`${logPrefix}|on$change__quovo__portfolio__positions`)
      tag.update__ctx()
    }
  </script>
</quovo-positions>
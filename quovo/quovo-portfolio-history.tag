<quovo-portfolio-history class="{
  loading: !ctx.quovo__portfolio__history,
  empty:
    ctx.quovo__portfolio__history
    && !ctx.quovo__portfolio__history.length}"
>
  <x-headers class="{present: $ctx('quovo__portfolio__history.length')}">
    <x-date>Date</x-date>
    <quovo-tran-type>Tran Type</quovo-tran-type>
    <x-market-code></x-market-code>
    <x-ticker>Ticker</x-ticker>
    <x-ticker-name>Name</x-ticker-name>
    <quovo-portfolio-history-quantity>Quantity</quovo-portfolio-history-quantity>
    <quovo-portfolio-history-value>Value</quovo-portfolio-history-value>
  </x-headers>
  <quovo-position
    each="{quovo$position in ctx.quovo__portfolio__history}">
    <x-date title="{quovo$position.date}">{quovo$position.date}</x-date>
    <quovo-tran-type title="{tran_type$map[quovo$position.tran_type]}">{tran_type$map[quovo$position.tran_type]}</quovo-tran-type>
    <x-market-code title="{quovo$position.market_code}">{quovo$position.market_code}</x-market-code>
    <x-ticker title="{quovo$position.ticker}">{quovo$position.ticker}</x-ticker>
    <x-ticker-name title="{quovo$position.ticker_name}">{quovo$position.ticker_name}</x-ticker-name>
    <quovo-portfolio-history-quantity title="{quovo$position.quantity}">{quovo$position.quantity}</quovo-portfolio-history-quantity>
    <quovo-portfolio-history-value title="{$format__currency({amount: quovo$position.value})}">
      {$format__currency({amount: quovo$position.value})}
    </quovo-portfolio-history-value>
  </quovo-position>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {tran_type$map} from 'ctx-core/quovo/lib'
    import {quovo__portfolio__history__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            tran_type$map: tran_type$map,
            registerElement: [
              'x-headers',
              'x-date',
              'quovo-tran-type',
              'x-market-code',
              'x-ticker',
              'x-ticker-name',
              'quovo-portfolio-history-quantity',
              'quovo-portfolio-history-value'
            ]
          })
        , logPrefix = 'ctx-core/quovo/quovo-portfolio-history.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    quovo__portfolio__history__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__portfolio__history__agent.pick__on({on$change__quovo__portfolio__history})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__portfolio__history__agent.pick__off({on$change__quovo__portfolio__history})
    }
    function on$change__quovo__portfolio__history() {
      log(`${logPrefix}|on$change__quovo__portfolio__history`)
      tag.update__ctx()
    }
  </script>
</quovo-portfolio-history>
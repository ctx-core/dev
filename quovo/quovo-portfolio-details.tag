<quovo-portfolio-details class="{loading: !ctx.quovo__portfolio}">
  <section
    class="quovo-portfolio-name"
    title="{ctx.quovo__portfolio.portfolio_name}"
  >{ctx.quovo__portfolio.portfolio_name}</section>
  <section
    class="quovo-portfolio-type"
    title="{ctx.quovo__portfolio.portfolio_type}"
  >{ctx.quovo__portfolio.portfolio_type}</section>
  <section
    class="quovo-portfolio-category"
    title="{ctx.quovo__portfolio.portfolio_category}"
  >{ctx.quovo__portfolio.portfolio_category}</section>
  <section
    class="quovo-portfolio-value"
    title="{format__currency(ctx.quovo__portfolio.value)}"
  >{format__currency(ctx.quovo__portfolio.value)}</section>
  <style>
    quovo-portfolio-details {
      display: block;
      padding: 10px;
    }
    quovo-portfolio-details > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {
      quovo__portfolio__positions__agent,
      quovo__portfolio__agent} from 'ctx-core/quovo/agent'
    import {format__currency} from 'currency/lib'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            format__currency
          })
        , logPrefix = 'ctx-core/quovo/quovo-portfolio-details.tag'
    log(logPrefix)
    let ctx = tag.ctx
    mount__currency(tag)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      quovo__portfolio__positions__agent(ctx)
      quovo__portfolio__agent(ctx)
      ctx.quovo__portfolio__agent.pick__on({on$change__quovo__portfolio})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__portfolio__agent.pick__off({on$change__quovo__portfolio})
    }
    function on$change__quovo__portfolio() {
      log(`${logPrefix}|on$change__quovo__portfolio`)
      tag.update__ctx()
    }
  </script>
</quovo-portfolio-details>
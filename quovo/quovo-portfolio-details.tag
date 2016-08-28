<quovo-portfolio-details class="{loading: !ctx.quovo__portfolio}">
  <quovo-portfolio-name title="{ctx.quovo__portfolio.portfolio_name}">{ctx.quovo__portfolio.portfolio_name}</quovo-portfolio-name>
  <quovo-portfolio-type title="{ctx.quovo__portfolio.portfolio_type}">{ctx.quovo__portfolio.portfolio_type}</quovo-portfolio-type>
  <quovo-portfolio-category title="{ctx.quovo__portfolio.portfolio_category}">{ctx.quovo__portfolio.portfolio_category}</quovo-portfolio-category>
  <quovo-portfolio-value title="{format__currency(ctx.quovo__portfolio.value)}">{format__currency(ctx.quovo__portfolio.value)}</quovo-portfolio-value>
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
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            registerElement: [
              'quovo-portfolio-name',
              'quovo-portfolio-type',
              'quovo-portfolio-category',
              'quovo-portfolio-value'
            ]})
        , logPrefix = 'ctx-core/quovo/quovo-portfolio.tag'
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
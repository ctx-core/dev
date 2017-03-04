<quovo-portfolio-details class="{loading: !ctx.portfolio__quovo}">
  <section
    class="quovo-portfolio-name"
    title="{$ctx('portfolio__quovo.portfolio_name')}"
  >{$ctx('portfolio__quovo.portfolio_name')}</section>
  <section
    class="quovo-portfolio-type"
    title="{$ctx('portfolio__quovo.portfolio_type')}"
  >{$ctx('portfolio__quovo.portfolio_type')}</section>
  <section
    class="quovo-portfolio-category"
    title="{$ctx('portfolio__quovo.portfolio_category')}"
  >{$ctx('portfolio__quovo.portfolio_category')}</section>
  <section
    class="quovo-portfolio-value"
    title="{$format__currency({amount: $ctx('portfolio__quovo.value')})}"
  >{$format__currency({amount: $ctx('portfolio__quovo.value')})}</section>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {
      portfolio__positions__quovo__agent,
      portfolio__quovo__agent} from 'ctx-core/quovo/agent'
    import {$format__currency} from 'currency/lib'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency
          })
        , logPrefix = 'ctx-core/quovo/quovo-portfolio-details.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    portfolio__positions__quovo__agent(ctx)
    portfolio__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.portfolio__quovo__agent.pick__on({on$change__portfolio__quovo})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.portfolio__quovo__agent.pick__off({on$change__portfolio__quovo})
    }
    function on$change__portfolio__quovo() {
      log(`${logPrefix}|on$change__portfolio__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-portfolio-details>
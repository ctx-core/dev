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
    import {init} from 'ctx-core/quovo/quovo-portfolio-details'
    init(this)
  </script>
</quovo-portfolio-details>
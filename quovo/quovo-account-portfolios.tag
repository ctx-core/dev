<quovo-account-portfolios class="quovo-nav">
  <title>Portfolios</title>
  <div class="{loading: !ctx.quovo__account__portfolios}">
    <a
      each="{portfolio__quovo in ctx.quovo__account__portfolios}"
      href="{path__portfolio__account__user__quovo(ctx, portfolio__quovo)}"
      class="selected-maybe {
        selected: portfolio__quovo.id === ctx.portfolio_id__quovo}"
      onclick="{__click__navigate}">
      <quovo-portfolio>
        <quovo-portfolio-name title="{portfolio__quovo.portfolio_name}">{portfolio__quovo.portfolio_name}</quovo-portfolio-name>
        <quovo-portfolio-type title="{portfolio__quovo.portfolio_type}">{portfolio__quovo.portfolio_type}</quovo-portfolio-type>
        <quovo-portfolio-category title="{portfolio__quovo.portfolio_category}">{portfolio__quovo.portfolio_category}</quovo-portfolio-category>
        <quovo-portfolio-value title="{format__currency(portfolio__quovo.value)}">
          {format__currency(portfolio__quovo.value)}
        </quovo-portfolio-value>
      </quovo-portfolio>
    </a>
  </div>
  <script>
    import {init} from 'ctx-core/quovo/quovo-account-portfolios.mjs'
    init(this)
  </script>
</quovo-account-portfolios>
<quovo-user-account-nav class="quovo-nav">
  <title>Account</title>
  <div class="{loading: !ctx.account__user__quovo}">
    <a
      href="{path__account__user__quovo(ctx)}"
      onclick="{__click__navigate}"
      class="selected-maybe {selected: ctx.route === 'account__user__quovo'}">
      <quovo-account>
        <brokerage-name>{$ctx('account__user__quovo.brokerage_name')}</brokerage-name>
        <value>{format__currency($ctx('account__user__quovo.value'))}</value>
      </quovo-account>
    </a>
    <quovo-account-portfolios ctx="{opts.ctx}"></quovo-account-portfolios>
  </div>
  <script>
    import {init} from 'ctx-core/quovo/quovo-user-account-nav.mjs'
    init(this)
  </script>
</quovo-user-account-nav>
<quovo-user-accounts
  class="quovo-nav">
  <title>Accounts</title>
  <section class="{
    loading: !ctx.account__user__quovos,
    empty: ctx.account__user__quovos && !ctx.account__user__quovos.length}">
    <a
      each="{account__user__quovo in ctx.account__user__quovos}"
      href="{path__account__user__quovo(ctx, account__user__quovo)}"
      class="{
        selected-maybe: true,
        selected: account__user__quovo.id == ctx.account_id__quovo}"
      onclick="{__click__navigate}">
      <quovo-account>
        <x-brokerage-name>{account__user__quovo.brokerage_name}</x-brokerage-name>
        <quovo-account-value>{format__currency(account__user__quovo.value)}</quovo-account-value>
      </quovo-account>
    </a>
  </section>
  <script type="buble">
    import {init} from 'ctx-core/quovo/quovo-user-accounts.mjs'
    init(this)
  </script>
</quovo-user-accounts>
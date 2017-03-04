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
      onclick="{onclick__navigate}">
      <quovo-account>
        <x-brokerage-name>{account__user__quovo.brokerage_name}</x-brokerage-name>
        <quovo-account-value>{$format__currency({amount: account__user__quovo.value})}</quovo-account-value>
      </quovo-account>
    </a>
  </section>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {
      account__user__quovos__agent,
      account_id__quovo__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {path__account__user__quovo} from 'ctx-core/quovo/path'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            path__account__user__quovo,
            registerElement: [
              'quovo-account',
              'x-brokerage-name',
              'quovo-account-value']
          })
        , logPrefix = 'ctx-core/quovo/quovo-user-accounts.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    account__user__quovos__agent(ctx)
    account_id__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.account__user__quovos__agent.pick__on({on$change__account__user__quovos})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.account__user__quovos__agent.pick__off({on$change__account__user__quovos})
    }
    function on$change__account__user__quovos() {
      log(`${logPrefix}|on$change__account__user__quovos`)
      tag.update__ctx(...arguments)
    }
  </script>
</quovo-user-accounts>
<quovo-user-accounts
  class="quovo-nav">
  <title>Accounts</title>
  <section class="{
    loading: !ctx.quovo__user__accounts,
    empty: ctx.quovo__user__accounts && !ctx.quovo__user__accounts.length}">
    <a
      each="{quovo__user__account in ctx.quovo__user__accounts}"
      href="{path__quovo__user__account(ctx, quovo__user__account)}"
      class="{
        selected-maybe: true,
        selected: quovo__user__account.id == ctx.quovo__account_id}"
      onclick="{onclick__navigate}">
      <quovo-account>
        <x-brokerage-name>{quovo__user__account.brokerage_name}</x-brokerage-name>
        <quovo-account-value>{$format__currency({amount: quovo__user__account.value})}</quovo-account-value>
      </quovo-account>
    </a>
  </section>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {
      quovo__user__accounts__agent,
      quovo__account_id__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {path__quovo__user__account} from 'ctx-core/quovo/path'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            path__quovo__user__account,
            registerElement: [
              'quovo-account',
              'x-brokerage-name',
              'quovo-account-value']
          })
        , logPrefix = 'ctx-core/quovo/quovo-user-accounts.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    quovo__user__accounts__agent(ctx)
    quovo__account_id__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__user__accounts__agent.pick__on({on$change__quovo__user__accounts})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__user__accounts__agent.pick__off({on$change__quovo__user__accounts})
    }
    function on$change__quovo__user__accounts() {
      log(`${logPrefix}|on$change__quovo__user__accounts`)
      tag.update__ctx(...arguments)
    }
  </script>
</quovo-user-accounts>
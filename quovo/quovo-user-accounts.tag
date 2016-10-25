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
        <quovo-account-value>{format__currency({amount: quovo__user__account.value})}</quovo-account-value>
      </quovo-account>
    </a>
  </section>
  <style>
    quovo-user-accounts {
      display: -webkit-box;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
    }
    quovo-user-accounts > section {
      -webkit-flex: auto;
      flex: auto;
      display: block;
      overflow-x: hidden;
      overflow-y: auto;
    }
    quovo-user-accounts > section.loading:before, quovo-user-accounts > section.empty:before {
      padding: 10px 0;
    }
    quovo-user-accounts > section.empty:before {
      content: "No Accounts";
      background: #dddddd;
    }
    quovo-user-accounts > section > a {
      display: block;
      padding: 10px;
      border: 1px dotted gray;
      color: #333333;
      text-decoration: none;
    }
    quovo-user-accounts > section > a > * {
      display: block;
    }
    quovo-user-accounts > section > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {
      quovo__user__accounts__agent,
      quovo__account_id__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {path__quovo__user__account} from 'ctx-core/quovo/path'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            path__quovo__user__account,
            registerElement: [
              'quovo-account',
              'x-brokerage-name',
              'quovo-account-value']
          })
        , logPrefix = 'ctx-core/quovo/quovo-user-accounts.tag'
    log(logPrefix)
    let ctx = tag.ctx
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
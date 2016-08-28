<quovo-user-account-nav class="quovo-nav">
  <title>Account</title>
  <div class="{loading: !ctx.quovo__user__account}">
    <a
      href="{path__quovo__user__account(ctx)}"
      onclick="{onclick__navigate}"
      class="selected-maybe {selected: ctx.route$name__quovo__user__account}">
      <quovo-account>
        <brokerage-name>{ctx.quovo__user__account.brokerage_name}</brokerage-name>
        <value>{format__currency(ctx.quovo__user__account.value)}</value>
      </quovo-account>
    </a>
    <quovo-account-portfolios ctx="{opts.ctx}"></quovo-account-portfolios>
  </div>
  <style>
    quovo-user-account-nav {
      display: block;
    }
    quovo-user-account-nav > div > * {
      display: block;
      border: 1px dotted gray;
      color: #000000;
      text-decoration: none;
      overflow: hidden;
    }
    quovo-user-account-nav > div.loading > * {
      display: none;
    }
    quovo-user-account-nav > div > a {
      padding: 10px;
    }
    quovo-user-account-nav > div > a > * {
      display: block;
    }
    quovo-user-account-nav > div > a > * > * {
      display: block;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {quovo__user__account__agent} from 'ctx-core/quovo/agent'
    import {path__quovo__user__account} from 'ctx-core/quovo/path'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            path__quovo__user__account
          })
        , logPrefix = 'ctx-core/quovo/quovo-user-account-nav.tag'
      let ctx = tag.ctx
    log(logPrefix)
    mount__currency(tag)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      quovo__user__account__agent(ctx)
      ctx.quovo__user__account__agent.pick__on({on$change__quovo__user__account})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__user__account__agent.pick__off({on$change__quovo__user__account})
    }
    function on$change__quovo__user__account() {
      log(`${logPrefix}|on$change__quovo__user__account`)
      tag.update__ctx()
    }
  </script>
</quovo-user-account-nav>
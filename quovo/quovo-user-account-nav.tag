<quovo-user-account-nav class="quovo-nav">
  <title>Account</title>
  <div class="{loading: !ctx.quovo__user__account}">
    <a
      href="{path__quovo__user__account(ctx)}"
      onclick="{onclick__navigate}"
      class="selected-maybe {selected: ctx.route__quovo__user__account}">
      <quovo-account>
        <brokerage-name>{$ctx('quovo__user__account.brokerage_name')}</brokerage-name>
        <value>{$format__currency({amount: $ctx('quovo__user__account.value')})}</value>
      </quovo-account>
    </a>
    <quovo-account-portfolios ctx="{opts.ctx}"></quovo-account-portfolios>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {quovo__user__account__agent} from 'ctx-core/quovo/agent'
    import {path__quovo__user__account} from 'ctx-core/quovo/path'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            path__quovo__user__account
          })
        , logPrefix = 'ctx-core/quovo/quovo-user-account-nav.tag'
      let {ctx} = tag
    log(logPrefix)
    mount__currency(tag)
    quovo__user__account__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
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
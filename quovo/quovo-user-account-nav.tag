<quovo-user-account-nav class="quovo-nav">
  <title>Account</title>
  <div class="{loading: !ctx.account__user__quovo}">
    <a
      href="{path__account__user__quovo(ctx)}"
      onclick="{onclick__navigate}"
      class="selected-maybe {selected: ctx.route__account__user__quovo}">
      <quovo-account>
        <brokerage-name>{$ctx('account__user__quovo.brokerage_name')}</brokerage-name>
        <value>{$format__currency({amount: $ctx('account__user__quovo.value')})}</value>
      </quovo-account>
    </a>
    <quovo-account-portfolios ctx="{opts.ctx}"></quovo-account-portfolios>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {account__user__quovo__agent} from 'ctx-core/quovo/agent'
    import {path__account__user__quovo} from 'ctx-core/quovo/path'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            path__account__user__quovo
          })
        , logPrefix = 'ctx-core/quovo/quovo-user-account-nav.tag'
      let {ctx} = tag
    log(logPrefix)
    mount__currency(tag)
    account__user__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.account__user__quovo__agent.pick__on({on$change__account__user__quovo})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.account__user__quovo__agent.pick__off({on$change__account__user__quovo})
    }
    function on$change__account__user__quovo() {
      log(`${logPrefix}|on$change__account__user__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-user-account-nav>
<quovo-user-account-details class="{loading: !ctx.account__user__quovo}">
  <x-brokerage-name>
    <label>Brokerage Name</label>
    <x-value>{$ctx('account__user__quovo.brokerage_name')}</x-value>
  </x-brokerage-name>
  <quovo-account-value>
    <label>value</label>
    <x-value>{
      $format__currency({
        amount: $ctx('account__user__quovo.value')}
      )
    }</x-value>
  </quovo-account-value>
  <quovo-account-nickname>
    <label>nickname</label>
    <x-value>{$ctx('account__user__quovo.brokerage_name')}</x-value>
  </quovo-account-nickname>
  <quovo-account-opened>
    <label>opened</label>
    <x-value>{$ctx('account__user__quovo.opened')}</x-value>
  </quovo-account-opened>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {account__user__quovo__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            registerElement: [
              'x-brokerage-name',
              'quovo-account-value',
              'quovo-account-nickname',
              'quovo-account-opened',
              'x-value'
            ]})
        , logPrefix = 'ctx-core/quovo/quovo-user-account-details.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    account__user__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.account__user__quovo__agent.pick__on({on$change__account__user__quovo})
      tag.update__ctx()
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
</quovo-user-account-details>
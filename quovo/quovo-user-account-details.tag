<quovo-user-account-details class="{loading: !ctx.quovo__user__account}">
  <x-brokerage-name>
    <label>Brokerage Name</label>
    <x-value>{$ctx('quovo__user__account.brokerage_name')}</x-value>
  </x-brokerage-name>
  <quovo-account-value>
    <label>value</label>
    <x-value>{
      $format__currency({
        amount: $ctx('quovo__user__account.value')}
      )
    }</x-value>
  </quovo-account-value>
  <quovo-account-nickname>
    <label>nickname</label>
    <x-value>{$ctx('quovo__user__account.brokerage_name')}</x-value>
  </quovo-account-nickname>
  <quovo-account-opened>
    <label>opened</label>
    <x-value>{$ctx('quovo__user__account.opened')}</x-value>
  </quovo-account-opened>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {quovo__user__account__agent} from 'ctx-core/quovo/agent'
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
    quovo__user__account__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__user__account__agent.pick__on({on$change__quovo__user__account})
      tag.update__ctx()
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
</quovo-user-account-details>
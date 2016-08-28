<quovo-user-account-details class="{loading: !ctx.quovo__user__account}">
  <x-brokerage-name>
    <label>Brokerage Name</label>
    <x-value>{ctx.quovo__user__account.brokerage_name}</x-value>
  </x-brokerage-name>
  <quovo-account-value>
    <label>value</label>
    <x-value>{format__currency(ctx.quovo__user__account.value)}</x-value>
  </quovo-account-value>
  <quovo-account-nickname>
    <label>nickname</label>
    <x-value>{ctx.quovo__user__account.brokerage_name}</x-value>
  </quovo-account-nickname>
  <quovo-account-opened>
    <label>opened</label>
    <x-value>{ctx.quovo__user__account.opened}</x-value>
  </quovo-account-opened>
  <style>
    quovo-user-account-details {
      display: block;
      padding: 10px;
    }
    quovo-user-account-details.loading > * {
      display: none;
    }
    quovo-user-account-details > * {
      display: block;
      overflow: hidden;
      padding-bottom: 10px;
    }
    quovo-user-account-details > * > * {
      float: left;
    }
    quovo-user-account-details > * > label {
      width: 120px;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {quovo__user__account__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            registerElement: [
              'x-brokerage-name',
              'quovo-account-value',
              'quovo-account-nickname',
              'quovo-account-opened',
              'x-value'
            ]})
        , logPrefix = 'ctx-core/quovo/quovo-account.tag'
    log(logPrefix)
    let ctx = tag.ctx
    mount__currency(tag)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      quovo__user__account__agent(ctx)
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
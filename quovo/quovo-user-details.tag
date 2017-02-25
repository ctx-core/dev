<quovo-user-details class="{loading: !ctx.quovo__user}">
  <quovo-user-id>
    <label>id</label>
    <x-value>{$ctx('quovo__user.id')}</x-value>
  </quovo-user-id>
  <quovo-user-username>
    <label>username</label>
    <x-value>{$ctx('quovo__user.username')}</x-value>
  </quovo-user-username>
  <quovo-user-email>
    <label>email</label>
    <x-value><a href="mailto:${$ctx('quovo__user.email')}">{$ctx('quovo__user.email')}</a></x-value>
  </quovo-user-email>
  <quovo-user-value>
    <label>value</label>
    <x-value>{$format__currency({amount: $ctx('quovo__user.value')})}</x-value>
  </quovo-user-value>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {quovo__user__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            registerElement: [
              'quovo-user-id',
              'quovo-user-username',
              'quovo-user-email',
              'quovo-user-value',
              'x-value'] })
      , logPrefix = 'ctx-core/quovo/quovo-user-details.tag'
    log(logPrefix)
    let {ctx} = tag
    quovo__user__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__user__agent.pick__on({on$change__quovo__user})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__user__agent.pick__off({on$change__quovo__user})
    }
    function on$change__quovo__user() {
      log(`${logPrefix}|on$change__quovo__user`)
      tag.update__ctx()
    }
  </script>
</quovo-user-details>
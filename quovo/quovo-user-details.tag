<quovo-user-details class="{loading: !ctx.user__quovo}">
  <quovo-user-id>
    <label>id</label>
    <x-value>{$ctx('user__quovo.id')}</x-value>
  </quovo-user-id>
  <quovo-user-username>
    <label>username</label>
    <x-value>{$ctx('user__quovo.username')}</x-value>
  </quovo-user-username>
  <quovo-user-email>
    <label>email</label>
    <x-value><a href="mailto:${$ctx('user__quovo.email')}">{$ctx('user__quovo.email')}</a></x-value>
  </quovo-user-email>
  <quovo-user-value>
    <label>value</label>
    <x-value>{$format__currency({amount: $ctx('user__quovo.value')})}</x-value>
  </quovo-user-value>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {user__quovo__agent} from 'ctx-core/quovo/agent'
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
    user__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.user__quovo__agent.pick__on({on$change__user__quovo})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.user__quovo__agent.pick__off({on$change__user__quovo})
    }
    function on$change__user__quovo() {
      log(`${logPrefix}|on$change__user__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-user-details>
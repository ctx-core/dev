<quovo-users class="{loading: !ctx.quovo__users}">
  <a href="quovo/users/{id}"
     class="{
      selected-maybe: true,
      selected: id == ctx.quovo__user_id}"
     each="{ctx.quovo__users}"
     onclick="{onclick__navigate}">
    <quovo-user>
      <quovo-user-id>{id}</quovo-user-id>
      <quovo-user-username>{username}</quovo-user-username>
      <quovo-user-email>{email}</quovo-user-email>
      <quovo-user-value>{$value(value)}</quovo-user-value>
    </quovo-user>
  </a>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {
      quovo__users__agent,
      quovo__user_id__agent} from 'ctx-core/quovo/agent'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $value,
            $format__currency,
            registerElement: [
              'quovo-user',
              'quovo-user-id',
              'quovo-user-username',
              'quovo-user-email',
              'quovo-user-value']})
        , logPrefix = 'ctx-core/quovo/quovo-users.tag'
    log(logPrefix)
    let ctx = tag.ctx
    mount__currency(tag)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      quovo__users__agent(ctx)
      quovo__user_id__agent(ctx)
      ctx.quovo__users__agent.pick__on({on$change__quovo__users})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__users__agent.pick__off({on$change__quovo__users})
    }
    function $value(value) {
      log(`${logPrefix}|$value`)
      return $format__currency({amount: value || 0})
    }
    function on$change__quovo__users() {
      log(`${logPrefix}|on$change__quovo__users`)
      tag.update__ctx(...arguments)
    }
  </script>
</quovo-users>
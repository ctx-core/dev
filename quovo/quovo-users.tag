<quovo-users class="{loading: !ctx.users__quovo}">
  <a href="quovo/users/{id}"
     class="{
      selected-maybe: true,
      selected: id == ctx.user_id__quovo}"
     each="{ctx.users__quovo}"
     onclick="{onclick__navigate}">
    <quovo-user>
      <quovo-user-id>{id}</quovo-user-id>
      <quovo-user-username>{username}</quovo-user-username>
      <quovo-user-email>{email}</quovo-user-email>
      <quovo-user-value>{$value(value)}</quovo-user-value>
    </quovo-user>
  </a>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {
      users__quovo__agent,
      user_id__quovo__agent} from 'ctx-core/quovo/agent'
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
      users__quovo__agent(ctx)
      user_id__quovo__agent(ctx)
      ctx.users__quovo__agent.pick__on({on$change__users__quovo})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.users__quovo__agent.pick__off({on$change__users__quovo})
    }
    function $value(value) {
      log(`${logPrefix}|$value`)
      return $format__currency({amount: value || 0})
    }
    function on$change__users__quovo() {
      log(`${logPrefix}|on$change__users__quovo`)
      tag.update__ctx(...arguments)
    }
  </script>
</quovo-users>
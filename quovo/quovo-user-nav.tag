<quovo-user-nav class="quovo-nav">
  <title>User</title>
  <div class="{loading: !ctx.user__quovo}">
    <a
      href="{path__user__quovo(ctx)}"
      class="dashboard selected-maybe {selected: ctx.route__user__quovo}"
      onclick="{onclick__navigate}">
      <quovo-user>
        <quovo-user-id>{$ctx('user__quovo.id')}</quovo-user-id>
        <quovo-user-username>{$ctx('user__quovo.username')}</quovo-user-username>
        <quovo-user-email>{$ctx('user__quovo.email')}</quovo-user-email>
        <quovo-user-value>{$format__currency({amount: $ctx('user__quovo.value')})}</quovo-user-value>
      </quovo-user>
    </a>
    <a
      href="{path__sync__user__quovo(ctx)}"
      class="sync {
        selected-maybe: true,
        selected: ctx.route__sync__user__quovo}"
      onclick="{onclick__navigate}">Sync Account(s)</a>
    <quovo-user-accounts ctx="{opts.ctx}"></quovo-user-accounts>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {$format__currency} from 'ctx-core/currency/lib'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {mount__route} from 'ctx-core/route/tag'
    import {user__quovo__agent} from 'ctx-core/quovo/agent'
    import {
      path__user__quovo,
      path__sync__user__quovo} from 'ctx-core/quovo/path'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            $format__currency,
            path__user__quovo,
            path__sync__user__quovo,
            registerElement: [
              'quovo-user',
              'quovo-user-id',
              'quovo-user-username',
              'quovo-user-email',
              'quovo-user-value']})
        , logPrefix = 'ctx-core/quovo/quovo-user-nav.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    mount__route(tag, {
      on$change__route: on$change__route
    })
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      user__quovo__agent(ctx)
      ctx.user__quovo__agent.pick__on({on$change__user__quovo})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.user__quovo__agent.pick__off({on$change__user__quovo})
    }
    function on$change__route() {
      log(`${logPrefix}|on$change__route`)
      tag.update__ctx()
    }
    function on$change__user__quovo() {
      log(`${logPrefix}|on$change__user__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-user-nav>
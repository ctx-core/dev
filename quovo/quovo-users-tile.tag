<quovo-users-tile
  class="quovo-tile {
    present: ctx.users__quovo,
    'quovo-user-tile': ctx.users__quovo
  }"
>
  <quovo-users-nav ctx="{opts.ctx}"></quovo-users-nav>
  <div>
    <quovo-user-tile ctx="{opts.ctx}"></quovo-user-tile>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {mount__route} from 'ctx-core/route/tag'
    import {user__quovo__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const logPrefix = 'ctx-core/quovo/quovo-users-tile.tag'
    log(logPrefix)
    const tag = tag__assign(this)
        , {ctx} = tag
    user__quovo__agent(ctx)
    mount__route(tag, {
      on$change__route
    })
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.user__quovo__agent.pick__on(on$change__user__quovo)
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.user__quovo__agent.pick__off(on$change__user__quovo)
    }
    function on$change__user__quovo() {
      log(`${logPrefix}|on$change__user__quovo`)
      tag.update__ctx()
    }
    function on$change__route() {
      log(`${logPrefix}|on$change__route`)
      tag.update__ctx()
    }
  </script>
</quovo-users-tile>
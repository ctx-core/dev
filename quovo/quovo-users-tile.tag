<quovo-users-tile
  class="quovo-tile {
    present: ctx.quovo__users,
    'quovo-user-tile': ctx.quovo__users
  }"
>
  <quovo-users-nav ctx="{opts.ctx}"></quovo-users-nav>
  <div>
    <quovo-user-tile ctx="{opts.ctx}"></quovo-user-tile>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {mount__route} from 'ctx-core/route/tag'
    import {quovo__user__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const logPrefix = 'ctx-core/quovo/quovo-users-tile.tag'
    log(logPrefix)
    const tag = tag__assign(this)
        , {ctx} = tag
    quovo__user__agent(ctx)
    mount__route(tag, {
      on$change__route
    })
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__user__agent.pick__on(on$change__quovo__user)
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__user__agent.pick__off(on$change__quovo__user)
    }
    function on$change__quovo__user() {
      log(`${logPrefix}|on$change__quovo__user`)
      tag.update__ctx()
    }
    function on$change__route() {
      log(`${logPrefix}|on$change__route`)
      tag.update__ctx()
    }
  </script>
</quovo-users-tile>
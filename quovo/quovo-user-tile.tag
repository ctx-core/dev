<quovo-user-tile
  class="quovo-tile {
    present: ctx.user__quovo && ctx.tile__route__user__quovo,
    quovo-user-details: ctx.route__user__quovo,
    quovo-sync-iframe: ctx.route__sync__user__quovo,
    quovo-user-account-tile: ctx.tile__route__quovo__account
  }"
>
  <quovo-user-nav class="quovo-nav" ctx="{opts.ctx}"></quovo-user-nav>
  <div>
    <quovo-user-details ctx="{opts.ctx}"></quovo-user-details>
    <quovo-sync-iframe ctx="{opts.ctx}"></quovo-sync-iframe>
    <quovo-user-account-tile ctx="{opts.ctx}"></quovo-user-account-tile>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {mount__route} from 'ctx-core/route/tag'
    import {user__quovo__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-user-tile.tag'
    log(logPrefix)
    let {ctx} = tag
    user__quovo__agent(ctx)
    mount__route(tag, {
      on$change__route
    })
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
    function on$change__route() {
      log(`${logPrefix}|on$change__route`)
      tag.update__ctx()
    }
    function on$change__user__quovo() {
      log(`${logPrefix}|on$change__user__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-user-tile>
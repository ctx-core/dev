<quovo-user-tile class="quovo-tile" show="{ctx.quovo__user && ctx.route__quovo__user$tile}">
  <quovo-user-nav class="quovo-nav" ctx="{opts.ctx}"></quovo-user-nav>
  <div>
    <quovo-user-details ctx="{opts.ctx}" show="{ctx.route$name__quovo__user}"></quovo-user-details>
    <quovo-sync-iframe ctx="{opts.ctx}" show="{ctx.route$name__quovo__user$sync}"></quovo-sync-iframe>
    <quovo-user-account-tile ctx="{opts.ctx}" show="{ctx.route__quovo__account$tile}"></quovo-user-account-tile>
  </div>
  <style>
    quovo-user-tile > div {
      display: -webkit-box;
      display: flex;
    }
    quovo-user-tile > div > * {
      -webkit-flex: auto;
      flex: auto;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {mount__route} from 'ctx-core/route/tag'
    import {quovo__user__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-user-tile.tag'
    log(logPrefix)
    let ctx = tag.ctx
    quovo__user__agent(ctx)
    mount__route(tag, {
      on$change__route$name
    })
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
    function on$change__route$name() {
      log(`${logPrefix}|on$change__route$name`)
      tag.update__ctx()
    }
    function on$change__quovo__user() {
      log(`${logPrefix}|on$change__quovo__user`)
      tag.update__ctx()
    }
  </script>
</quovo-user-tile>
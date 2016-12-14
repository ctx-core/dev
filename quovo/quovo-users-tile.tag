<quovo-users-tile class="quovo-tile">
  <quovo-users-nav
    class="quovo-nav {
      present: ctx.quovo__users
    }"
    ctx="{opts.ctx}"></quovo-users-nav>
  <div>
    <quovo-user-tile ctx="{opts.ctx}"></quovo-user-tile>
  </div>
  <style type="text/css">
    quovo-users-tile quovo-users-nav {
      display: none;
    }
    quovo-users-tile quovo-users-nav.present {
      display: block;
    }
  </style>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {mount__route} from 'ctx-core/route/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-users-tile.tag'
    log(logPrefix)
    mount__route(tag, {
      on$change__route$name
    })
    function on$change__route$name() {
      log(`${logPrefix}|on$change__route$name`)
      tag.update__ctx()
    }
  </script>
</quovo-users-tile>
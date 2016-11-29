<quovo-user-account-tile class="quovo-tile">
  <quovo-user-account-nav ctx="{opts.ctx}"></quovo-user-account-nav>
  <div>
    <quovo-user-account-details show="{ctx.route$name__quovo__user__account}" ctx="{opts.ctx}"></quovo-user-account-details>
    <quovo-portfolio-tile show="{ctx.route__quovo__portfolio$tile}" ctx="{opts.ctx}"></quovo-portfolio-tile>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {mount__route} from 'ctx-core/route/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-user-tile.tag'
    log(logPrefix)
    mount__route(tag, {
      on$change__route$name
    })
    function on$change__route$name() {
      log(`${logPrefix}|on$change__route$name`)
      tag.update__ctx()
    }
  </script>
</quovo-user-account-tile>
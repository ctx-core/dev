<quovo-portfolio-tile class="quovo-tile">
  <quovo-portfolio-nav class="quovo-nav" ctx="{opts.ctx}"></quovo-portfolio-nav>
  <section>
    <quovo-positions show="{ctx.route$name__quovo__user__account$portfolio}" ctx="{opts.ctx}"></quovo-positions>
    <quovo-portfolio-history show="{ctx.route$name__quovo__user__account$portfolio$history}" ctx="{opts.ctx}"></quovo-portfolio-history>
  </section>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {mount__route} from 'ctx-core/route/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-portfolio-tile.tag'
    log(logPrefix)
    mount__route(tag, {
      on$change__route$name
    })
    function on$change__route$name() {
      log(`${logPrefix}|on$change__route$name`)
      tag.update__ctx()
    }
  </script>
</quovo-portfolio-tile>
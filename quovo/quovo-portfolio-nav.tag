<quovo-portfolio-nav class="quovo-nav">
  <title>Portfolio</title>
  <div>
    <a
      href="{path__quovo__user__account$portfolio(ctx)}"
      class="selected-maybe {
        selected: ctx.route__quovo__user__account$portfolio}"
      onclick="{onclick__navigate}">Positions</a>
    <a
      href="{path__quovo__user__account$portfolio$history(ctx)}"
      class="selected-maybe {
        selected: ctx.route__quovo__user__account$portfolio$history}"
      onclick="{onclick__navigate}"
    >Transaction History</a>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {quovo__portfolio__agent} from 'ctx-core/quovo/agent'
    import {path__quovo__user__account$portfolio
          , path__quovo__user__account$portfolio$history} from 'ctx-core/quovo/path'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            path__quovo__user__account$portfolio,
            path__quovo__user__account$portfolio$history
          })
        , logPrefix = 'ctx-core/quovo/quovo-portfolio-nav.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    quovo__portfolio__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__portfolio__agent.pick__on({on$change__quovo__portfolio})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__portfolio__agent.pick__off({on$change__quovo__portfolio})
    }
    function on$change__quovo__portfolio() {
      log(`${logPrefix}|on$change__quovo__portfolio`)
      tag.update__ctx()
    }
  </script>
</quovo-portfolio-nav>
<quovo-portfolio-nav class="quovo-nav">
  <title>Portfolio</title>
  <div>
    <a
      href="{path__portfolio__account__user__quovo(ctx)}"
      class="selected-maybe {
        selected: ctx.route__portfolio__account__user__quovo}"
      onclick="{onclick__navigate}">Positions</a>
    <a
      href="{path__portfolio_history__account__user__quovo(ctx)}"
      class="selected-maybe {
        selected: ctx.route__portfolio_history__account__user__quovo}"
      onclick="{onclick__navigate}"
    >Transaction History</a>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {portfolio__quovo__agent} from 'ctx-core/quovo/agent'
    import {path__portfolio__account__user__quovo
          , path__portfolio_history__account__user__quovo} from 'ctx-core/quovo/path'
    import {mount__currency} from 'ctx-core/currency/tag'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            path__portfolio__account__user__quovo,
            path__portfolio_history__account__user__quovo
          })
        , logPrefix = 'ctx-core/quovo/quovo-portfolio-nav.tag'
    log(logPrefix)
    let {ctx} = tag
    mount__currency(tag)
    portfolio__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.portfolio__quovo__agent.pick__on({on$change__portfolio__quovo})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.portfolio__quovo__agent.pick__off({on$change__portfolio__quovo})
    }
    function on$change__portfolio__quovo() {
      log(`${logPrefix}|on$change__portfolio__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-portfolio-nav>
<quovo-sync-iframe class="{loading: !ctx.quovo__iframe$url}">
  <iframe src="{ctx.quovo__iframe$url}" if="{ctx.quovo__iframe$url}"></iframe>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {quovo__iframe__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-sync-iframe.tag'
    log(logPrefix)
    let {ctx} = tag
    quovo__iframe__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__iframe__agent.pick__on({on$change__quovo__iframe})
      tag.update__ctx()
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__iframe__agent.pick__off({on$change__quovo__iframe})
    }
    function on$change__quovo__iframe() {
      log(`${logPrefix}|on$change__quovo__iframe`)
      tag.update__ctx()
    }
  </script>
</quovo-sync-iframe>
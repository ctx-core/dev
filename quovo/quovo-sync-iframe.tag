<quovo-sync-iframe class="{loading: !ctx.quovo__iframe$url}">
  <iframe src="{ctx.quovo__iframe$url}" if="{ctx.quovo__iframe$url}"></iframe>
  <style type="text/css">
    quovo-sync-iframe {
      display: -webkit-box;
      display: flex;
    }
    quovo-sync-iframe.loading:before {
      height: 200px;
      width: 100%;
      padding: 10px 0 0;
    }
    quovo-sync-iframe > * {
      -webkit-flex: auto;
      flex: auto;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {quovo__iframe__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this)
        , logPrefix = 'ctx-core/quovo/quovo-sync-iframe.tag'
    log(logPrefix)
    let ctx = tag.ctx
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      quovo__iframe__agent(ctx)
      ctx.quovo__iframe__agent.pick__on({on$change__quovo__iframe})
      on$change__quovo__iframe()
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
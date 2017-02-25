<quovo-users-nav class="quovo-nav">
  <title>Users</title>
  <div>
    <quovo-users ctx="{opts.ctx}"></quovo-users>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {quovo__users__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const logPrefix = 'ctx-core/quovo/quovo-users-nav.tag'
    log(logPrefix)
    const tag = tag__assign(this)
    let {ctx} = tag
    quovo__users__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.quovo__users__agent.pick__on({on$change__quovo__users})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__users__agent.pick__off({on$change__quovo__users})
    }
    function on$change__quovo__users() {
      log(`${logPrefix}|on$change__quovo__users`)
      tag.update__ctx()
    }
  </script>
</quovo-users-nav>
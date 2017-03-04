<quovo-users-nav class="quovo-nav">
  <title>Users</title>
  <div>
    <quovo-users ctx="{opts.ctx}"></quovo-users>
  </div>
  <script type="text/ecmascript-6">
    import {tag__assign} from 'ctx-core/riot/tag'
    import {users__quovo__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const logPrefix = 'ctx-core/quovo/quovo-users-nav.tag'
    log(logPrefix)
    const tag = tag__assign(this)
    let {ctx} = tag
    users__quovo__agent(ctx)
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      ctx.users__quovo__agent.pick__on({on$change__users__quovo})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.users__quovo__agent.pick__off({on$change__users__quovo})
    }
    function on$change__users__quovo() {
      log(`${logPrefix}|on$change__users__quovo`)
      tag.update__ctx()
    }
  </script>
</quovo-users-nav>
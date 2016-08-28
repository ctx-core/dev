<quovo-user-details class="{loading: !ctx.quovo__user}">
  <quovo-user-id>
    <label>id</label>
    <x-value>{ctx.quovo__user.id}</x-value>
  </quovo-user-id>
  <quovo-user-username>
    <label>username</label>
    <x-value>{ctx.quovo__user.username}</x-value>
  </quovo-user-username>
  <quovo-user-email>
    <label>email</label>
    <x-value><a href="mailto:${ctx.quovo__user.email}">{ctx.quovo__user.email}</a></x-value>
  </quovo-user-email>
  <quovo-user-value>
    <label>value</label>
    <x-value>{format__currency(ctx.quovo__user.value)}</x-value>
  </quovo-user-value>
  <style>
    quovo-user-details {
      display: block;
      padding: 10px;
    }
    quovo-user-details.loading > * {
      display: none;
    }
    quovo-user-details > * {
      display: block;
      overflow: hidden;
      padding-bottom: 10px;
    }
    quovo-user-details > * > * {
      float: left;
    }
    quovo-user-details > * > label {
      width: 120px;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from 'ctx-core/tag/lib'
    import {quovo__user__agent} from 'ctx-core/quovo/agent'
    import {log,debug} from 'ctx-core/logger/lib'
    const tag = tag__assign(this, {
            registerElement: [
              'quovo-user-id',
              'quovo-user-username',
              'quovo-user-email',
              'quovo-user-value',
              'x-value'] })
      , logPrefix = 'ctx-core/quovo/quovo-user-details.tag'
    log(logPrefix)
    let ctx = tag.ctx
    tag.on('mount', on$mount)
    tag.on('unmount', on$unmount)
    function on$mount() {
      log(`${logPrefix}|on$mount`)
      quovo__user__agent(ctx)
      ctx.quovo__user__agent.pick__on({on$change__quovo__user})
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`)
      ctx.quovo__user__agent.pick__off({on$change__quovo__user})
    }
    function on$change__quovo__user() {
      log(`${logPrefix}|on$change__quovo__user`)
      tag.update__ctx()
    }
  </script>
</quovo-user-details>
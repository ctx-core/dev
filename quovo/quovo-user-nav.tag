<quovo-user-nav class="quovo-nav">
  <title>User</title>
  <div class="{loading: !ctx.user__quovo}">
    <a
      href="{path__user__quovo(ctx)}"
      class="dashboard selected-maybe {selected: ctx.route__user__quovo}"
      onclick="{onclick__navigate}">
      <quovo-user>
        <quovo-user-id>{$ctx('user__quovo.id')}</quovo-user-id>
        <quovo-user-username>{$ctx('user__quovo.username')}</quovo-user-username>
        <quovo-user-email>{$ctx('user__quovo.email')}</quovo-user-email>
        <quovo-user-value>{$format__currency({amount: $ctx('user__quovo.value')})}</quovo-user-value>
      </quovo-user>
    </a>
    <a
      href="{path__sync__user__quovo(ctx)}"
      class="sync {
        selected-maybe: true,
        selected: ctx.route__sync__user__quovo}"
      onclick="{onclick__navigate}">Sync Account(s)</a>
    <quovo-user-accounts ctx="{opts.ctx}"></quovo-user-accounts>
  </div>
  <script type="text/ecmascript-6">
    import {init} from 'ctx-core/quovo/quovo-user-nav'
    init(this)
  </script>
</quovo-user-nav>
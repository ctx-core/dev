<quovo-users-tile
  class="quovo-tile {
    present: ctx.users__quovo,
    'quovo-user-tile': ctx.users__quovo
  }"
>
  <quovo-users-nav ctx="{opts.ctx}"></quovo-users-nav>
  <div>
    <quovo-user-tile ctx="{opts.ctx}"></quovo-user-tile>
  </div>
  <script type="buble">
    import {init} from 'ctx-core/quovo/quovo-users-tile'
    init(this)
  </script>
</quovo-users-tile>
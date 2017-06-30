<quovo-user-account-tile
  class="quovo-tile {
    quovo-user-account-details: ctx.route === 'account__user__quovo',
    quovo-portfolio-tile: ctx.tile__route__portfolio__quovo
  }"
>
  <quovo-user-account-nav ctx="{opts.ctx}"></quovo-user-account-nav>
  <div>
    <quovo-user-account-details ctx="{opts.ctx}"></quovo-user-account-details>
    <quovo-portfolio-tile ctx="{opts.ctx}"></quovo-portfolio-tile>
  </div>
  <script type="buble">
    import {init} from 'ctx-core/quovo/quovo-user-account-tile'
    init(this)
  </script>
</quovo-user-account-tile>
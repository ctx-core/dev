<quovo-user-tile class="quovo-tile">
  <quovo-user-navigation class="quovo-navigation" ctx="{opts.ctx}"></quovo-user-navigation>
  <content>
    <quovo-user-details ctx="{opts.ctx}" show="{ctx.route$name__quovo$user}"></quovo-user-details>
    <quovo-sync-iframe ctx="{opts.ctx}" show="{ctx.route$name__quovo$user$sync}"></quovo-sync-iframe>
    <quovo-user-account-tile ctx="{opts.ctx}" show="{ctx.route__quovo$account$tile}"></quovo-user-account-tile>
  </content>
  <style>
    quovo-user-tile > content {
      display: flex;
    }
    quovo-user-tile > content > * {
      flex: auto;
    }
  </style>
</quovo-user-tile>
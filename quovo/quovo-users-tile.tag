<quovo-users-tile class="quovo-tile">
  <quovo-users-navigation class="quovo-navigation" ctx="{opts.ctx}"></quovo-users-navigation>
  <content>
    <quovo-user-tile show="{ctx.route__quovo$user$tile}" ctx="{opts.ctx}"></quovo-user-tile>
  </content>
  <style>
    .quovo-tile {
      display: flex;
      flex: auto;
      height: 100%;
    }
    .quovo-tile > .quovo-navigation {
      display: flex;
      flex-direction: column;
      width: 200px;
      border: 1px #111111 dotted;
    }
    .quovo-tile > content {
      flex: auto;
    }
    .quovo-navigation > title {
      display: block;
      min-height: 1.8em;
      padding: 5px 10px;
      background: #eeeeee;
      border: 1px dotted gray;
    }
    .quovo-navigation > content {
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  </style>
</quovo-users-tile>
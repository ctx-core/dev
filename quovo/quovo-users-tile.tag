<quovo-users-tile class="quovo-tile">
  <quovo-users-navigation
    class="quovo-navigation"
    ctx="{opts.ctx}"
    show="{ctx.quovo$user$$}"></quovo-users-navigation>
  <x-content>
    <quovo-user-tile ctx="{opts.ctx}"></quovo-user-tile>
  </x-content>
  <style>
    .quovo-tile {
      display: -webkit-box;
      display: flex;
      -webkit-flex: auto;
      flex: auto;
    }
    .quovo-tile > .quovo-navigation {
      display: -webkit-box;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      -webkit-flex: inherit auto;
      flex: inherit auto;
      width: 200px;
      border: 1px #111111 dotted;
    }
    .quovo-tile > x-content {
      display: -webkit-box;
      display: flex;
      -webkit-flex: auto;
      flex: auto;
      overflow-y: auto;
    }
    .quovo-tile > x-content > .quovo-navigation {
      -webkit-flex: auto;
      flex: auto;
    }
    .quovo-navigation > title {
      display: block;
      min-height: 1.8em;
      padding: 5px 10px;
      background: #eeeeee;
      border: 1px dotted gray;
    }
    .quovo-navigation > x-content {
      -webkit-flex: auto;
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-users-tile.tag";
    log(logPrefix);
  </script>
</quovo-users-tile>
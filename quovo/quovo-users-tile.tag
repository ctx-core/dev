<quovo-users-tile class="quovo-tile">
  <quovo-users-nav
    class="quovo-nav"
    ctx="{opts.ctx}"
    show="{ctx.quovo__users}"></quovo-users-nav>
  <div>
    <quovo-user-tile ctx="{opts.ctx}"></quovo-user-tile>
  </div>
  <style>
    .quovo-tile {
      display: -webkit-box;
      display: flex;
      -webkit-flex: auto;
      flex: auto;
    }
    .quovo-tile > .quovo-nav {
      display: -webkit-box;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      -webkit-flex: inherit auto;
      flex: inherit auto;
      width: 200px;
      border: 1px #111111 dotted;
    }
    .quovo-tile > div {
      display: -webkit-box;
      display: flex;
      -webkit-flex: auto;
      flex: auto;
      overflow-y: auto;
    }
    .quovo-tile > div > .quovo-nav {
      -webkit-flex: auto;
      flex: auto;
    }
    .quovo-nav > title {
      display: block;
      min-height: 1.8em;
      padding: 5px 10px;
      background: #eeeeee;
      border: 1px dotted gray;
    }
    .quovo-nav > div {
      -webkit-flex: auto;
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {mount__route} from "ctx-core/route/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-users-tile.tag";
    log(logPrefix);
    mount__route(tag, {
      on$change__route$name: on$change__route$name
    });
    function on$change__route$name() {
      log(`${logPrefix}|on$change__route$name`);
      tag.update__ctx();
    }
  </script>
</quovo-users-tile>
<quovo-users-tile class="quovo-tile">
  <quovo-users-navigation
    class="quovo-navigation"
    ctx="{opts.ctx}"
    show="{ctx.authentication}"></quovo-users-navigation>
  <content>
    <quovo-user-tile
      show="{ctx.authentication && ctx.route__quovo$user$tile}"
      ctx="{opts.ctx}"></quovo-user-tile>
  </content>
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
    .quovo-tile > content {
      display: -webkit-box;
      display: flex;
      -webkit-flex: auto;
      flex: auto;
    }
    .quovo-tile > content > .quovo-navigation {
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
    .quovo-navigation > content {
      -webkit-flex: auto;
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign} from "ctx-core/object/lib";
    import {assign__authentication_agent} from "ctx-core/authentication/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/quovo/quovo-users-tile.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      assign__authentication_agent(ctx);
      ctx.authentication_agent.on("change", authentication_agent$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.authentication_agent.off("change", authentication_agent$on$change);
    }
    function authentication_agent$on$change() {
      log(`${logPrefix}|authentication_agent$on$change`);
      tag.assign__ctx$update();
    }
  </script>
</quovo-users-tile>
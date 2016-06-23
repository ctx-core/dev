<quovo-user-tile class="quovo-tile" show="{ctx.quovo$user && ctx.route__quovo$user$tile}">
  <quovo-user-navigation class="quovo-navigation" ctx="{opts.ctx}"></quovo-user-navigation>
  <content>
    <quovo-user-details ctx="{opts.ctx}" show="{ctx.route$name__quovo$user}"></quovo-user-details>
    <quovo-sync-iframe ctx="{opts.ctx}" show="{ctx.route$name__quovo$user$sync}"></quovo-sync-iframe>
    <quovo-user-account-tile ctx="{opts.ctx}" show="{ctx.route__quovo$account$tile}"></quovo-user-account-tile>
  </content>
  <style>
    quovo-user-tile > content {
      display: -webkit-box;
      display: flex;
    }
    quovo-user-tile > content > * {
      -webkit-flex: auto;
      flex: auto;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign__quovo$user_agent} from "ctx-core/quovo/agent";
    import {route$name__tag$mount} from "ctx-core/route/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/quovo/quovo-user-tile.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    assign__quovo$user_agent(ctx);
    route$name__tag$mount(tag);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      ctx.quovo$user_agent.on("change", quovo$user$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$user_agent.off("change", quovo$user$on$change);
    }
    function quovo$user$on$change() {
      log(`${logPrefix}|quovo$user$on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-user-tile>
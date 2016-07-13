<quovo-user-tile class="quovo-tile" show="{ctx.quovo$user && ctx.route__quovo$user$tile}">
  <quovo-user-navigation class="quovo-navigation" ctx="{opts.ctx}"></quovo-user-navigation>
  <x-content>
    <quovo-user-details ctx="{opts.ctx}" show="{ctx.route$name__quovo$user}"></quovo-user-details>
    <quovo-sync-iframe ctx="{opts.ctx}" show="{ctx.route$name__quovo$user$sync}"></quovo-sync-iframe>
    <quovo-user-account-tile ctx="{opts.ctx}" show="{ctx.route__quovo$account$tile}"></quovo-user-account-tile>
  </x-content>
  <style>
    quovo-user-tile > x-content {
      display: -webkit-box;
      display: flex;
    }
    quovo-user-tile > x-content > * {
      -webkit-flex: auto;
      flex: auto;
    }
  </style>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__quovo$user} from "ctx-core/quovo/agent";
    import {mount__route$name} from "ctx-core/route/tag";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-user-tile.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    assign__agent__quovo$user(ctx);
    mount__route$name(tag);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      ctx.agent__quovo$user.on("change", quovo$user__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo$user.off("change", quovo$user__on$change);
    }
    function quovo$user__on$change() {
      log(`${logPrefix}|quovo$user__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-user-tile>
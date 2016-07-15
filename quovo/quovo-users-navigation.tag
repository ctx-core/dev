<quovo-users-navigation class="quovo-navigation">
  <title>Users</title>
  <x-content>
    <quovo-users ctx="{opts.ctx}"></quovo-users>
  </x-content>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__quovo__users} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            registerElement: ["x-content"]})
        , logPrefix = "ctx-core/quovo/quovo-users-navigation.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    assign__agent__quovo__users(ctx);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      ctx.agent__quovo__users.on("change", quovo__users__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo__users.off("change", quovo__users__on$change);
    }
    function quovo__users__on$change() {
      log(`${logPrefix}|quovo__users__on$change`);
      tag.update__ctx();
    }
  </script>
</quovo-users-navigation>
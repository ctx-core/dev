<quovo-users-nav class="quovo-nav">
  <title>Users</title>
  <div>
    <quovo-users ctx="{opts.ctx}"></quovo-users>
  </div>
  <script type="text/babel">
    import {tag__assign} from "ctx-core/tag/lib";
    import {quovo__users__agent} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this)
        , logPrefix = "ctx-core/quovo/quovo-users-nav.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    quovo__users__agent(ctx);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      ctx.quovo__users__agent.on("change", on$change__quovo__users);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo__users__agent.off("change", on$change__quovo__users);
    }
    function on$change__quovo__users() {
      log(`${logPrefix}|on$change__quovo__users`);
      tag.update__ctx();
    }
  </script>
</quovo-users-nav>
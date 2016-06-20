<quovo-users-navigation class="quovo-navigation">
  <title>Users</title>
  <content>
    <quovo-users ctx="{opts.ctx}"></quovo-users>
  </content>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign__quovo$user$$_agent} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/quovo/quovo-users-navigation.tag";
    let ctx = tag.ctx;
    log(logPrefix);
    assign__quovo$user$$_agent(ctx);
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      ctx.quovo$user$$_agent.on("change", quovo$user$$$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$user$$_agent.off("change", quovo$user$$$on$change);
    }
    function quovo$user$$$on$change() {
      log(`${logPrefix}|quovo$user$$$on$change`);
      tag.assign__ctx$update();
    }
  </script>
</quovo-users-navigation>
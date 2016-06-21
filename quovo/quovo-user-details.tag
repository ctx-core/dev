<quovo-user-details class="{loading: !ctx.quovo$user}">
  <id>
    <label>id</label>
    <value>{ctx.quovo$user.id}</value>
  </id>
  <username>
    <label>username</label>
    <value>{ctx.quovo$user.username}</value>
  </username>
  <email>
    <label>email</label>
    <value><a href="mailto:${ctx.quovo$user.email}">{ctx.quovo$user.email}</a></value>
  </email>
  <value>
    <label>value</label>
    <value>{currency$format(ctx.quovo$user)}</value>
  </value>
  <style>
    quovo-user-details {
      display: block;
      padding: 10px;
    }
    quovo-user-details.loading > * {
      display: none;
    }
    quovo-user-details > * {
      display: block;
      overflow: hidden;
      padding-bottom: 10px;
    }
    quovo-user-details > * > * {
      float: left;
    }
    quovo-user-details > * > label {
      width: 120px;
    }
  </style>
  <script type="text/babel">
    import {fn$tag} from "ctx-core/tag/lib";
    import {assign__quovo$user_agent} from "./agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = fn$tag(this)
        , logPrefix = "ctx-core/quovo/quovo-user-details.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__quovo$user_agent(ctx);
      ctx.quovo$user_agent.on("change", quovo$user$on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.quovo$user_agent.off("change", quovo$user$on$change);
    }
    function quovo$user$on$change() {
      log(`${logPrefix}|quovo$user$on$change`);
      tag.assign__ctx$update();
    }
  </script>
</quovo-user-details>
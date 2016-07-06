<quovo-user-details class="{loading: !ctx.quovo$user}">
  <quovo-user-id>
    <label>id</label>
    <x-value>{ctx.quovo$user.id}</x-value>
  </quovo-user-id>
  <quovo-user-username>
    <label>username</label>
    <x-value>{ctx.quovo$user.username}</x-value>
  </quovo-user-username>
  <quovo-user-email>
    <label>email</label>
    <x-value><a href="mailto:${ctx.quovo$user.email}">{ctx.quovo$user.email}</a></x-value>
  </quovo-user-email>
  <quovo-user-value>
    <label>value</label>
    <x-value>{currency$format(ctx.quovo$user)}</x-value>
  </quovo-user-value>
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
    import {tag__assign} from "ctx-core/tag/lib";
    import {assign__agent__quovo$user} from "ctx-core/quovo/agent";
    import {log,debug} from "ctx-core/logger/lib";
    const tag = tag__assign(this, {
            registerElement: [
              "quovo-user-id",
              "quovo-user-username",
              "quovo-user-email",
              "quovo-user-value",
              "x-value"] })
      , logPrefix = "ctx-core/quovo/quovo-user-details.tag";
    tag.on("mount", on$mount);
    tag.on("unmount", on$unmount);
    log(logPrefix);
    function on$mount() {
      log(`${logPrefix}|on$mount`);
      let ctx = tag.ctx;
      assign__agent__quovo$user(ctx);
      ctx.agent__quovo$user.on("change", quovo$user__on$change);
    }
    function on$unmount() {
      log(`${logPrefix}|on$unmount`);
      ctx.agent__quovo$user.off("change", quovo$user__on$change);
    }
    function quovo$user__on$change() {
      log(`${logPrefix}|quovo$user__on$change`);
      tag.ctx$update();
    }
  </script>
</quovo-user-details>